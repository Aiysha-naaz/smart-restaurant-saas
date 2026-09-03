// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   LayoutDashboard,
//   ShoppingCart,
//   Package,
//   UtensilsCrossed,
//   Grid3X3,
//   Users,
//   Brain,
//   BarChart3,
//   CreditCard,
//   Settings,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// // const navItems = [
// //   { title: "Dashboard", icon: LayoutDashboard, path: "/" },
// //   { title: "Orders", icon: ShoppingCart, path: "/orders" },
// //   { title: "Inventory", icon: Package, path: "/inventory" },
// //   { title: "Menu", icon: UtensilsCrossed, path: "/menu" },
// //   { title: "Tables", icon: Grid3X3, path: "/tables" },
// //   { title: "Staff", icon: Users, path: "/staff" },
// //   { title: "AI Insights", icon: Brain, path: "/ai-insights" },
// //   { title: "Analytics", icon: BarChart3, path: "/analytics" },
// //   { title: "Subscription", icon: CreditCard, path: "/subscription" },
// //   { title: "Settings", icon: Settings, path: "/settings" },
// // ];


// const navItems = [
//   { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
//   { title: "Orders", icon: ShoppingCart, path: "/dashboard/orders" },
//   { title: "Inventory", icon: Package, path: "/dashboard/inventory" },
//   { title: "Menu", icon: UtensilsCrossed, path: "/dashboard/menu" },
//   { title: "Tables", icon: Grid3X3, path: "/dashboard/tables" },
//   { title: "Staff", icon: Users, path: "/dashboard/staff" },
//   { title: "AI Insights", icon: Brain, path: "/dashboard/ai-insights" },
//   { title: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
//   { title: "Subscription", icon: CreditCard, path: "/dashboard/subscription" },
//   { title: "Settings", icon: Settings, path: "/dashboard/settings" },
// ];

// interface AppSidebarProps {
//   collapsed: boolean;
//   onToggle: () => void;
// }

// export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
//   const location = useLocation();

//   return (
//     <aside
//       className={cn(
//         "fixed left-0 top-0 z-40 flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-all duration-200",
//         collapsed ? "w-[72px]" : "w-[260px]"
//       )}
//     >
//       {/* Brand */}
//       <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
//         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold text-sm">
//           SR
//         </div>
//         {!collapsed && (
//           <span className="text-sm font-semibold tracking-tight truncate">
//             Smart Restaurant
//           </span>
//         )}
//       </div>

//       {/* Nav items */}
//       <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
//         {navItems.map((item) => {
//           const isActive = location.pathname.startsWith(item.path);
//           return (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={cn(
//                 "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150",
//                 isActive
//                   ? "bg-sidebar-accent text-sidebar-accent-foreground"
//                   : "text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
//               )}
//             >
//               <item.icon className="h-5 w-5 shrink-0" />
//               {!collapsed && <span className="truncate">{item.title}</span>}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Collapse toggle */}
//       <div className="border-t border-sidebar-border p-3">
//         <button
//           onClick={onToggle}
//           className="flex w-full items-center justify-center rounded-lg py-2 text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors duration-150"
//         >
//           {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
//         </button>
//       </div>
//     </aside>
//   );
// }



import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  UtensilsCrossed,
  Grid3X3,
  Users,
  Brain,
  BarChart3,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { title: "Orders", icon: ShoppingCart, path: "/dashboard/orders" },
  { title: "Inventory", icon: Package, path: "/dashboard/inventory" },

  {
    title: "Menu",
    icon: UtensilsCrossed,
    path: "/dashboard/menu",
    children: [
      {
        title: "Manage Menu",
        path: "/dashboard/menu",
      },
      {
        title: "Customer Menu",
        path: "/dashboard/menu/customer",
      },
    ],
  },

  { title: "Tables", icon: Grid3X3, path: "/dashboard/tables" },
  { title: "Staff", icon: Users, path: "/dashboard/staff" },
  { title: "AI Insights", icon: Brain, path: "/dashboard/ai-insights" },
  { title: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
  { title: "Subscription", icon: CreditCard, path: "/dashboard/subscription" },
  { title: "Settings", icon: Settings, path: "/dashboard/settings" },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-all duration-200",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* BRAND */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold text-sm">
          SR
        </div>

        {!collapsed && (
          <span className="text-sm font-semibold tracking-tight truncate">
            Smart Restaurant
          </span>
        )}
      </div>

      {/* NAV */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isMainActive =
            item.path && location.pathname.startsWith(item.path);

          return (
            <div key={item.title}>
              {/* MAIN ITEM */}
              {item.path && (
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isMainActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  {item.icon && <item.icon className="h-5 w-5 shrink-0" />}
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              )}

              {/* CHILDREN */}
              {item.children && !collapsed && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.children.map((child) => {
                    const isChildActive = location.pathname.startsWith(
                      child.path
                    );

                    return (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={cn(
                          "block text-sm px-2 py-1 rounded-md transition-colors",
                          isChildActive
                            ? "text-white bg-sidebar-accent"
                            : "text-sidebar-muted hover:text-white"
                        )}
                      >
                        {child.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* COLLAPSE BUTTON */}
      <div className="border-t border-sidebar-border p-3">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded-lg py-2 text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>
    </aside>
  );
}