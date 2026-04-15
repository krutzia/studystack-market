import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
  { to: "/marketplace", label: "Marketplace" },
  { to: "/sell", label: "Sell Item" },
  { to: "/notes", label: "Topper Notes" },
  { to: "/profile", label: "Profile" },
];

const Footer = () => (
  <footer className="border-t border-border/80 bg-card">
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <ShoppingBag className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-heading text-lg font-bold text-foreground">
              Campus<span className="text-primary">Kart</span>
            </span>
          </Link>
          <p className="max-w-md text-sm text-muted-foreground">
            A focused campus marketplace for books, gadgets, notes, and essentials shared by students.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
          {footerLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-border/60 pt-4 text-sm text-muted-foreground">
        <p>&copy; 2026 MyBrand</p>
      </div>
    </div>
  </footer>
);

export default Footer;
