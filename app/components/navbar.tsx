import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

import { supabase } from "~/lib/supabase";

export function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getUser().then(({ data, error }) => {
      if (error) {
        console.error("Auth error:", error);
        setUser(null);
      } else {
        setUser(data.user);
      }
      setLoading(false);
    });

    // Listen for auth changes (sign in/out)
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="border-b p-2 sticky top-0 w-full bg-background/95 backdrop-blur-xs">
      <div>
        <div className="flex max-w-4xl mx-auto p-3">
          <NavLink to="/">
            <span className="font-fredoka font-bold text-3xl" style={{ color: "var(--primary)" }}>
              SocMed
            </span>
          </NavLink>
          <nav className="flex items-center gap-3 ml-auto text-xl">
            <NavLink to="/feeds">Feeds</NavLink>
            <NavLink to="profile">Profile</NavLink>
          </nav>

          {loading ? (
            <div className="ml-4">Loading...</div>
          ) : user ? (
            // User is logged in - show username + sign out button
            <div className="ml-4 flex items-center gap-2">
              <span className="text-sm">{user.email}</span>
              <Button onClick={handleSignOut} className="bg-accent hover:bg-accent/75">
                Sign Out
              </Button>
            </div>
          ) : (
            // User is not logged in - show sign in button
            <NavLink to="auth?mode=signin" className="ml-4">
              <Button className="bg-accent hover:bg-accent/75">Sign In</Button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}
