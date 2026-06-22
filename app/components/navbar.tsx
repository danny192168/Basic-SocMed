import { NavLink } from "react-router";

export function Navbar() {
  return (
    <div className="border-b p-2">
      <div>
        <div className="flex max-w-6xl mx-auto p-3">
          <NavLink to="/">
            <span className="font-fredoka font-bold text-3xl" style={{ color: "var(--primary)" }}>
              SocMed
            </span>
          </NavLink>
          <nav className="flex items-center gap-3 ml-auto text-xl">
            <NavLink to="/">Feeds</NavLink>
            <NavLink to="profile">Profile</NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
}
