import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MessageCircle, ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import ChatDialog from "@/components/ChatDialog";

interface Conversation {
  partnerId: string;
  partnerName: string;
  productId: string;
  productName: string;
  productImage: string | null;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  iAmSender: boolean;
}

const Messages = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeConvo, setActiveConvo] = useState<Conversation | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchConversations();

    // Real-time updates
    const channel = supabase
      .channel("inbox-updates")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const msg = payload.new as any;
          if (msg.sender_id === user.id || msg.receiver_id === user.id) {
            fetchConversations();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, authLoading]);

  const fetchConversations = async () => {
    if (!user) return;

    const { data: messages } = await supabase
      .from("messages")
      .select("*")
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
      .order("created_at", { ascending: false });

    if (!messages || messages.length === 0) {
      setConversations([]);
      setLoading(false);
      return;
    }

    // Group by product + partner
    const convoMap = new Map<string, {
      partnerId: string;
      productId: string;
      lastMessage: string;
      lastMessageAt: string;
      unreadCount: number;
      iAmSender: boolean;
    }>();

    for (const msg of messages) {
      const partnerId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id;
      const key = `${msg.product_id}-${partnerId}`;
      if (!convoMap.has(key)) {
        convoMap.set(key, {
          partnerId,
          productId: msg.product_id,
          lastMessage: msg.message_text,
          lastMessageAt: msg.created_at,
          unreadCount: 0,
          iAmSender: msg.sender_id === user.id,
        });
      }
      // Count unread (received messages without read_at)
      if (msg.receiver_id === user.id && !(msg as any).read_at) {
        const existing = convoMap.get(key)!;
        existing.unreadCount++;
      }
    }

    // Fetch partner profiles and product info
    const partnerIds = [...new Set([...convoMap.values()].map((c) => c.partnerId))];
    const productIds = [...new Set([...convoMap.values()].map((c) => c.productId))];

    const [profilesRes, productsRes] = await Promise.all([
      supabase.from("profiles").select("user_id, full_name").in("user_id", partnerIds),
      supabase.from("products").select("id, name, image_url").in("id", productIds),
    ]);

    const profileMap = new Map((profilesRes.data || []).map((p) => [p.user_id, p.full_name || "Anonymous"]));
    const productMap = new Map((productsRes.data || []).map((p) => [p.id, { name: p.name, image: p.image_url }]));

    const convos: Conversation[] = [...convoMap.entries()].map(([, c]) => ({
      partnerId: c.partnerId,
      partnerName: profileMap.get(c.partnerId) || "Anonymous",
      productId: c.productId,
      productName: productMap.get(c.productId)?.name || "Unknown Product",
      productImage: productMap.get(c.productId)?.image || null,
      lastMessage: c.lastMessage,
      lastMessageAt: c.lastMessageAt,
      unreadCount: c.unreadCount,
      iAmSender: c.iAmSender,
    }));

    convos.sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
    setConversations(convos);
    setLoading(false);
  };

  const openChat = (convo: Conversation) => {
    setActiveConvo(convo);
    setChatOpen(true);
    // Mark messages as read
    if (convo.unreadCount > 0 && user) {
      supabase
        .from("messages")
        .update({ read_at: new Date().toISOString() } as any)
        .eq("product_id", convo.productId)
        .eq("sender_id", convo.partnerId)
        .eq("receiver_id", user.id)
        .is("read_at", null)
        .then(() => fetchConversations());
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = diffMs / (1000 * 60 * 60);
    if (diffHrs < 1) return `${Math.max(1, Math.round(diffMs / 60000))}m ago`;
    if (diffHrs < 24) return `${Math.round(diffHrs)}h ago`;
    return date.toLocaleDateString();
  };

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="font-heading text-2xl font-bold text-foreground">Messages</h1>
      </div>

      {conversations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <MessageCircle className="h-12 w-12 text-muted-foreground/40 mb-4" />
          <p className="text-lg font-medium text-muted-foreground">No messages yet</p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Start a conversation by messaging a seller on any product
          </p>
          <Link to="/marketplace" className="mt-4">
            <Button>Browse Marketplace</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {conversations.map((convo) => (
            <button
              key={`${convo.productId}-${convo.partnerId}`}
              onClick={() => openChat(convo)}
              className="w-full flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-all hover:shadow-md hover:border-primary/20"
            >
              {/* Product thumbnail */}
              <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                {convo.productImage ? (
                  <img src={convo.productImage} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Package className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className={`font-heading text-sm font-semibold truncate ${convo.unreadCount > 0 ? "text-foreground" : "text-foreground/80"}`}>
                    {convo.partnerName}
                  </span>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {formatTime(convo.lastMessageAt)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{convo.productName}</p>
                <p className={`text-sm truncate mt-0.5 ${convo.unreadCount > 0 ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                  {convo.iAmSender ? "You: " : ""}{convo.lastMessage}
                </p>
              </div>

              {convo.unreadCount > 0 && (
                <Badge className="bg-primary text-primary-foreground text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full px-1.5">
                  {convo.unreadCount}
                </Badge>
              )}
            </button>
          ))}
        </div>
      )}

      {activeConvo && user && (
        <ChatDialog
          open={chatOpen}
          onOpenChange={setChatOpen}
          productId={activeConvo.productId}
          productName={activeConvo.productName}
          sellerId={activeConvo.partnerId}
          sellerName={activeConvo.partnerName}
        />
      )}
    </div>
  );
};

export default Messages;
