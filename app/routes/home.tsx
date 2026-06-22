import { useState } from "react";
import type { Route } from "../+types/root";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Basic Social Media App" },
    { name: "description", content: "Connect with people in a simple social media app." },
  ];
}

export default function Home() {
  const [user, setUser] = useState("");
  return (
    <>
      <div className="max-w-4xl w-full mx-auto p-2 flex-1 flex flex-col justify-center items-center">
        <h1 className="text-center text-3xl sm:text-5xl mb-15">
          Welcome to SocMed Basic, where you can connect with people in the simplest manner possible
        </h1>
        <div className="flex flex-col-2 mx-auto gap-3 w-2xl max-w-11/12">
          <Link
            to="auth?mode=signup"
            className="border sm:p-2 p-2 rounded-md w-full sm:text-2xl text-lg text-center font-bold"
            style={{ background: "var(--accent)" }}
          >
            Sign Up
          </Link>
          <Link
            to="auth?mode=signin"
            className="border sm:p-2 p-2 rounded-md w-full sm:text-2xl text-lg text-center font-bold"
            style={{ background: "var(--foreground)", color: "var(--foreground-dark)" }}
          >
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
}
