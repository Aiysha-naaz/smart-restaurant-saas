import { useState, useRef, useEffect } from "react";
import { Bell, Search, ChevronDown, LogOut, User, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const restaurants = [
  { id: "1", name: "Downtown Bistro" },
  { id: "2", name: "Riverside Grill" },
  { id: "3", name: "Uptown Café" },
];

export function Navbar() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0]);
  const [showRestaurantDropdown, setShowRestaurantDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const restaurantRef = useRef(null);
  const profileRef = useRef(null);

  // ✅ GET USER FROM STORAGE
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handler = (e) => {
      if (restaurantRef.current && !restaurantRef.current.contains(e.target))
        setShowRestaurantDropdown(false);

      if (profileRef.current && !profileRef.current.contains(e.target))
        setShowProfileDropdown(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  const initials = user?.name
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase()
    : "U";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-6">

      {/* Restaurant selector */}
      <div ref={restaurantRef} className="relative">
        <button
          onClick={() => setShowRestaurantDropdown(!showRestaurantDropdown)}
          className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted"
        >
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span>{selectedRestaurant.name}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search orders, menu, inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">

        <button className="relative rounded-lg p-2 hover:bg-muted">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
        </button>

        {/* PROFILE */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-muted"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              {initials}
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 top-full mt-1 w-48 rounded-xl border border-border bg-card shadow-sm">

              <div className="border-b border-border px-4 py-3">
                <p className="text-sm font-medium">
                  {user?.name || "Guest"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user?.email || "No email"}
                </p>
              </div>

              <button className="flex w-full items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted">
                <User className="h-4 w-4 text-muted-foreground" />
                Profile
              </button>

              {/* ✅ LOGOUT FIX */}
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-b-xl px-4 py-2.5 text-sm text-destructive hover:bg-muted"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}