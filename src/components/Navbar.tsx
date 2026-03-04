import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Plus, User, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/marketplace", label: "Marketplace" },
    { to: "/sell", label: "Sell Item", icon: Plus },
    { to: "/notes", label: "Topper Notes" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <ShoppingBag className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold text-foreground">
            Campus<span className="text-primary">Kart</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to}>
              <Button
                variant={isActive(l.to) ? "default" : "ghost"}
                size="sm"
                className="gap-1.5"
              >
                {l.icon && <l.icon className="h-4 w-4" />}
                {l.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link to="/profile">
            <Button variant="outline" size="sm" className="gap-1.5">
              <User className="h-4 w-4" /> Profile
            </Button>
          </Link>
          <Button size="sm" className="bg-gradient-accent gap-1.5 border-0 text-secondary-foreground">
            Sign In
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-card p-4 md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}>
                <Button variant={isActive(l.to) ? "default" : "ghost"} className="w-full justify-start gap-2">
                  {l.icon && <l.icon className="h-4 w-4" />}
                  {l.label}
                </Button>
              </Link>
            ))}
            <Link to="/profile" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className="w-full justify-start gap-2">
                <User className="h-4 w-4" /> Profile
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
