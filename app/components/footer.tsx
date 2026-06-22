import { NavLink } from "react-router";

export function Footer() {
  return (
    <div className="bg-card border-t p-3 w-full ">
      <div className="max-w-4xl mx-auto my-auto p-3 flex flex-col ">
        <div className="flex flex-col justify-between sm:flex-row">
          <NavLink to="/">
            <span className="font-fredoka opacity-50 font-bold text-xl text-xl sm:text-2xl">
              SocMed
            </span>
          </NavLink>
          <nav className="flex flex-col  gap-1 text-md">
            <h5 className="font-bold">Quick Links</h5>
            <NavLink className="text-muted-foreground" to="/">
              Feeds
            </NavLink>
            <NavLink className="text-muted-foreground" to="profile">
              Profile
            </NavLink>
          </nav>
        </div>
        <p className="text-muted-foreground mt-auto pt-4">© {new Date().getFullYear()} SocMed</p>
      </div>
    </div>
  );
}
