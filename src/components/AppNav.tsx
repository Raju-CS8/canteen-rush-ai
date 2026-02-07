import { NavLink } from "react-router-dom";
import { Home, ShoppingBag, ClipboardList, LayoutDashboard, Zap } from "lucide-react";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/pre-order", label: "Pre-Order", icon: ShoppingBag },
  { to: "/order-status", label: "Order Status", icon: ClipboardList },
  { to: "/vendor", label: "Vendor", icon: LayoutDashboard },
];

export function AppNav() {
  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <Zap className="h-5 w-5 text-primary" />
          <span>Canteen Rush<span className="text-primary"> AI</span></span>
        </div>
        <nav className="flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
                }`
              }
            >
              <l.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{l.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
