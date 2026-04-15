import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: { full_name: string | null; verified: boolean | null; college_email: string | null } | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null, user: null, profile: null, loading: true, signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AuthContextType["profile"]>(null);
  const [loading, setLoading] = useState(true);

  const createProfileIfMissing = async (currentUser: User) => {
    const fallbackProfile = {
      user_id: currentUser.id,
      full_name: (currentUser.user_metadata?.full_name as string | undefined) ?? null,
      college_email: currentUser.email ?? null,
      verified: currentUser.email?.endsWith("@jssaten.ac.in") ?? false,
    };

    const { data, error } = await supabase
      .from("profiles")
      .upsert(fallbackProfile, { onConflict: "user_id" })
      .select("full_name, verified, college_email")
      .single();

    if (!error) {
      setProfile(data);
    }
  };

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, verified, college_email")
      .eq("user_id", userId)
      .single();

    if (error) {
      const currentUser = supabase.auth.getUser ? (await supabase.auth.getUser()).data.user : null;
      if (error.code === "PGRST116" && currentUser?.id === userId) {
        await createProfileIfMissing(currentUser);
        return;
      }

      setProfile(null);
      return;
    }

    setProfile(data);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        setTimeout(() => fetchProfile(session.user.id), 0);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
