// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Eye, EyeOff } from "lucide-react";

// export default function Register() {
//   const [showPassword, setShowPassword] = useState(false);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [restaurantName, setRestaurantName] = useState("");

//   const handleRegister = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//           restaurantName
//         })
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert(`Registered! Your Restaurant ID: ${data.restaurant.restaurantId}`);

//         localStorage.setItem("token", data.token);

//         window.location.href = "/dashboard";
//       } else {
//         alert(data.msg || "Error");
//       }

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold text-lg">
//             SR
//           </div>
//           <h1 className="text-2xl font-semibold tracking-tight">Create your restaurant</h1>
//           <p className="text-sm text-muted-foreground mt-1">
//             Set up your account and restaurant in minutes
//           </p>
//         </div>

//         <div className="rounded-xl border border-border bg-card p-6 space-y-6">
          
//           {/* Manager Details */}
//           <div>
//             <h3 className="text-sm font-semibold mb-3">Manager Details</h3>
//             <div className="space-y-3">

//               <div>
//                 <label className="text-sm font-medium mb-1.5 block">Full Name</label>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="John Doe"
//                   className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-medium mb-1.5 block">Email</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="john@restaurant.com"
//                   className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-medium mb-1.5 block">Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="••••••••"
//                     className="w-full rounded-lg border border-border bg-background px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <Eye className="h-4 w-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//             </div>
//           </div>

//           {/* Restaurant Details */}
//           <div className="border-t border-border pt-6">
//             <h3 className="text-sm font-semibold mb-3">Restaurant Details</h3>
//             <div className="space-y-3">

//               <div>
//                 <label className="text-sm font-medium mb-1.5 block">Restaurant Name</label>
//                 <input
//                   type="text"
//                   value={restaurantName}
//                   onChange={(e) => setRestaurantName(e.target.value)}
//                   placeholder="Downtown Bistro"
//                   className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
//                 />
//               </div>

//               {/* Optional fields (not used in backend yet) */}
//               <div>
//                 <label className="text-sm font-medium mb-1.5 block">Address</label>
//                 <input
//                   type="text"
//                   placeholder="123 Main Street"
//                   className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-medium mb-1.5 block">Phone</label>
//                 <input
//                   type="tel"
//                   placeholder="+91 98765 43210"
//                   className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
//                 />
//               </div>

//             </div>
//           </div>

//           {/* BUTTON (FIXED) */}
//           <button
//             onClick={handleRegister}
//             className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
//           >
//             Create Restaurant
//           </button>

//         </div>

//         <p className="mt-4 text-center text-sm text-muted-foreground">
//           Already have an account?{" "}
//           <Link to="/login" className="text-primary hover:underline font-medium">
//             Sign In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

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

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          restaurantName
        })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // optional: show restaurant ID once
        alert(`Restaurant ID: ${data.restaurant.restaurantId}`);

        navigate("/dashboard");
      } else {
        alert(data.msg || "Error");
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
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