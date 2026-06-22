import { NavLink } from "react-router";

export function Footer() {
  return (
    <div className="bg-card border-t p-3 w-full ">
      <div className="max-w-6xl mx-auto my-auto p-3 flex flex-col ">
        <div className="flex flex-wrap">
          <NavLink to="/">
            <span className="font-fredoka font-bold text-xl sm:text-2xl">SocMed</span>
          </NavLink>
          <nav className="flex items-center gap-3 ml-auto text-xl ">
            <h5 className="font-bold">Quick Links</h5>
            <NavLink className="text-muted-foreground" to="/">
              Feeds
            </NavLink>
            <NavLink className="text-muted-foreground" to="profile">
              Profile
            </NavLink>
          </nav>
        </div>
        <p className="text-muted-foreground mt-auto">© {new Date().getFullYear()} SocMed</p>
      </div>
    </div>
  );
}
