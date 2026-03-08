// ─── Authentication Context ───
// Provides user session state (user, session, loading) to the entire app.
// Listens for auth state changes (login, logout, token refresh) via the backend client.
// Exposes a signOut function for logging the user out.

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client"; // Backend client instance
import { useNavigate } from "react-router-dom";

// Shape of the auth context value
interface AuthContextType {
  session: Session | null; // Current session object (contains tokens)
  user: User | null; // Currently authenticated user (or null if logged out)
  loading: boolean; // True while checking initial auth state
  signOut: () => Promise<void>; // Sign out the current user
}

// Default context value (used if consumed outside provider — shouldn't happen)
const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  signOut: async () => {},
});

// Custom hook for consuming auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to real-time auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Also fetch the current session on mount (handles page refresh)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Cleanup: unsubscribe from auth state changes when provider unmounts
    return () => subscription.unsubscribe();
  }, []);

  // Sign the user out via the backend auth service
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
