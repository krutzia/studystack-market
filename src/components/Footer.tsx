import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <ShoppingBag className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-heading text-lg font-bold text-foreground">
            Campus<span className="text-primary">Kart</span>
          </span>
        </Link>
        <p className="text-sm text-muted-foreground">
          © 2026 CampusKart — JSS Academy of Technical Education, Noida
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
