import { Eye, EyeOff, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { useNavigate } from "react-router";

import { supabase } from "~/lib/supabase";

export default function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const isSignIn = mode == "signin";
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorText, setErrorText] = useState<any>("");

  // ---Sign Up---
  async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "https://danny192168.github.io/Basic-SocMed/feeds",
        data: { display_name: username },
      },
    });
    if (error) {
      console.log("sigup error: " + error.message);
      // console.log(error);
      setErrorText(error.message);
    }
    console.log(data);
    navigate("/feeds");
  }

  // ---Sign In---
  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log("sigin error: " + error.message);
      // console.log(error);
      setErrorText(error.message);
    }
    console.log(data);
    navigate("/feeds");
  }

  return (
    <div className="max-w-6xl w-full mx-auto flex-1 p-3 grid place-items-center">
      <div className="bg-card p-7 rounded-xl border max-w-md w-full">
        <h1 className="text-2xl text-center mb-4">
          {isSignIn ? "Sign In Account" : "Sign Up for new account"}
        </h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              if (isSignIn) {
                await signInWithEmail();
              } else {
                await signUpNewUser();
              }
            } catch (error: any) {
              console.error("Auth error:", error);
              // Show error to user
              setErrorText(error.message);
            }
          }}
        >
          <div className="flex flex-col gap-4">
            {!isSignIn && (
              <div>
                <label className="block mb-1.5 text-sm" htmlFor="username">
                  Username
                </label>
                <div className="relative">
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    placeholder="Your name"
                    className="px-3 p-2 rounded-lg outline-none text-md w-full"
                    style={{
                      backgroundColor: "var(--input-background)",
                      color: "var(--foreground-dark)",
                    }}
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block mb-1.5 text-sm" htmlFor="email">
                Email Adress
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="you@example.com"
                  className="pr-10 px-3 p-2 rounded-lg outline-none text-md w-full"
                  style={{
                    backgroundColor: "var(--input-background)",
                    color: "var(--foreground-dark)",
                  }}
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="block text-sm" htmlFor="password">
                  Password
                </label>
                {isSignIn && (
                  <a
                    href="#"
                    className="text-xs transition-colors"
                    style={{ color: "var(--primary)" }}
                  >
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="••••••••"
                  required
                  className="pr-10 px-3 py-2 rounded-lg outline-none text-md w-full"
                  style={{
                    backgroundColor: "var(--input-background)",
                    color: "var(--foreground-dark)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gray-300 transition-colors"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              className="font font-fredoka font-semibold px-3 py-2 rounded-md outline-none text-md w-full"
              style={{ backgroundColor: "var(--primary)" }}
              type="submit"
            >
              {isSignIn ? "Sign in" : "Create Account"}
            </button>
          </div>
        </form>
        <p className="text-red-400 mt-2 text-center">{errorText}</p>
        <p className="text-center text-sm mt-4">
          {isSignIn ? (
            <>
              Don't have an account?{" "}
              <Link
                to="?mode=signup"
                className="transition-colors font-medium"
                style={{ color: "var(--primary)" }}
              >
                Sign up free
              </Link>
            </>
          ) : (
            <>
              {" "}
              Already have an account?{" "}
              <Link
                to="?mode=signin"
                className="transition-colors font-medium"
                style={{ color: "var(--primary)" }}
              >
                Sign in
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
