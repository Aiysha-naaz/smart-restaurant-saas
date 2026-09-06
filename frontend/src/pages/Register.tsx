import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import api from "@/lib/api";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

 const handleRegister = async () => {
  if (!name || !email || !password || !restaurantName) {
    alert("Please fill all required fields");
    return;
  }

  try {
    setLoading(true);

    const res = await api.post("/auth/register", {
      name,
      email,
      password,
      restaurantName
    });

    const data = res.data;

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert(`Restaurant ID: ${data.restaurant.restaurantId}`);

    navigate("/dashboard");
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.msg || "Server error");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold text-lg">
            SR
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Create your restaurant
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Set up your account in minutes
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 space-y-6">

          {/* Manager */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Manager Details</h3>
            <div className="space-y-3">

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border px-3 py-2.5 text-sm"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border px-3 py-2.5 text-sm"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2.5 pr-10 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

            </div>
          </div>

          {/* Restaurant */}
          <div className="border-t pt-6">
            <h3 className="text-sm font-semibold mb-3">Restaurant Details</h3>

            <input
              type="text"
              placeholder="Restaurant Name"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              className="w-full rounded-lg border px-3 py-2.5 text-sm"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm text-white"
          >
            {loading ? "Creating..." : "Create Restaurant"}
          </button>

        </div>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}