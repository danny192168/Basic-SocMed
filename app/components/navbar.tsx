// WE CAN MAKE DIFFERENT NAVBARS FOR OTHER SITES LIKE ON THE FEEDS AND PROFILE PAGE

import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

import { supabase } from "~/lib/supabase";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut, LogOutIcon, SettingsIcon, User, UserIcon } from "lucide-react";

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
    <div className="border-b p-2 sticky top-0 z-10 w-screen overflow-hidden bg-background/95 backdrop-blur-xs ">
      <div>
        <div className="flex max-w-4xl mx-auto p-3">
          <NavLink className="grid place-items-center" to="/">
            <span
              className="font-fredoka font-bold text-xl sm:text-3xl"
              style={{ color: "var(--primary)" }}
            >
              SocMed
            </span>
          </NavLink>
          <nav className="flex items-center gap-5 ml-auto text-md">
            <NavLink to="/feeds">
              <Button className="text-foreground" variant="link">
                Feeds
              </Button>
            </NavLink>

            {/* <NavLink to="profile">Profile</NavLink> */}
          </nav>

          {loading ? (
            <div className="ml-4 grid place-items-center">Loading...</div>
          ) : user ? (
            // User is logged in - show username + sign out button
            <div className="ml-4 flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      className={"text-gray-100 bg-gray-500 hover:border-gray-500"}
                      variant="ghost"
                    >
                      <User /> {user.user_metadata.display_name}
                    </Button>
                  }
                />
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <UserIcon />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SettingsIcon />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} variant="destructive">
                    <LogOut
                      className="text-red-400"
                      style={{ color: "oklch(70.4% 0.191 22.216)" }}
                    />
                    <span className="text-red-400">Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
