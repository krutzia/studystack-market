import { Link } from "react-router-dom";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Messages = () => {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="mb-6 flex items-center gap-3">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="font-heading text-2xl font-bold text-foreground">Messages</h1>
      </div>

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <MessageCircle className="h-12 w-12 text-muted-foreground/40 mb-4" />
        <p className="text-lg font-medium text-muted-foreground">Messaging is disabled in this demo</p>
        <p className="text-sm text-muted-foreground/70 mt-1">You can contact sellers via the listing details outside the demo.</p>
        <Link to="/marketplace" className="mt-4">
          <Button>Browse Marketplace</Button>
        </Link>
      </div>
    </div>
  );
};

export default Messages;
