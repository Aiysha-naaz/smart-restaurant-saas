// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { DashboardLayout } from "@/layouts/DashboardLayout";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "@/pages/Home";
// import Dashboard from "@/pages/Dashboard";
// import Orders from "@/pages/Orders";
// import Inventory from "@/pages/Inventory";
// import Menu from "@/pages/Menu";
// import Tables from "@/pages/Tables";
// import Staff from "@/pages/Staff";
// import AIInsights from "@/pages/AIInsights";
// import Analytics from "@/pages/Analytics";
// import Subscription from "@/pages/Subscription";
// import SettingsPage from "@/pages/SettingsPage";
// import Login from "@/pages/Login";
// import Register from "@/pages/Register";
// import NotFound from "@/pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/" element={<Home />} />
//           <Route element={<DashboardLayout />}>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/orders" element={<Orders />} />
//             <Route path="/inventory" element={<Inventory />} />
//             <Route path="/menu" element={<Menu />} />
//             <Route path="/tables" element={<Tables />} />
//             <Route path="/staff" element={<Staff />} />
//             <Route path="/ai-insights" element={<AIInsights />} />
//             <Route path="/analytics" element={<Analytics />} />
//             <Route path="/subscription" element={<Subscription />} />
//             <Route path="/settings" element={<SettingsPage />} />
//           </Route>
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;



// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";

// import { DashboardLayout } from "@/layouts/DashboardLayout";

// import Home from "@/pages/Home";
// import Dashboard from "@/pages/Dashboard";
// import Orders from "@/pages/Orders";
// import Inventory from "@/pages/Inventory";
// import Menu from "@/pages/Menu";
// import Tables from "@/pages/Tables";
// import Staff from "@/pages/Staff";
// import AIInsights from "@/pages/AIInsights";
// import Analytics from "@/pages/Analytics";
// import Subscription from "@/pages/Subscription";
// import SettingsPage from "@/pages/SettingsPage";
// import Login from "@/pages/Login";
// import Register from "@/pages/Register";
// import NotFound from "@/pages/NotFound";
// import ProtectedRoute from "@/components/ProtectedRoute";
// import CustomerMenu from "@/pages/CustomerMenu";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />

//       <BrowserRouter>
//         <Routes>
//           {/* ✅ Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* ✅ Dashboard Routes (with layout) */}
//           {/* <Route
//   path="/dashboard"
//   element={
//     <ProtectedRoute>
//       <DashboardLayout />
//     </ProtectedRoute>
//   }
// >
//             <Route index element={<Dashboard />} />
//             <Route path="orders" element={<Orders />} />
//             <Route path="inventory" element={<Inventory />} />
//             <Route path="menu" element={<Menu />} />
//             <Route path="/menu/customer" element={<CustomerMenu />} />
//             <Route path="tables" element={<Tables />} />
//             <Route path="staff" element={<Staff />} />
//             <Route path="ai-insights" element={<AIInsights />} />
//             <Route path="analytics" element={<Analytics />} />
//             <Route path="subscription" element={<Subscription />} />
//             <Route path="settings" element={<SettingsPage />} />
//           </Route> */}

//           {/* ✅ 404 */}
//           <Route
//   path="/dashboard"
//   element={
//     <ProtectedRoute>
//       <DashboardLayout />
//     </ProtectedRoute>
//   }
// >
//   <Route index element={<Dashboard />} />
//   <Route path="orders" element={<Orders />} />
//   <Route path="inventory" element={<Inventory />} />
//   <Route path="menu" element={<Menu />} />

//   {/* ✅ FIXED CUSTOMER MENU */}
//   <Route path="menu/customer" element={<CustomerMenu />} />

//   <Route path="tables" element={<Tables />} />
//   <Route path="staff" element={<Staff />} />
//   <Route path="ai-insights" element={<AIInsights />} />
//   <Route path="analytics" element={<Analytics />} />
//   <Route path="subscription" element={<Subscription />} />
//   <Route path="settings" element={<SettingsPage />} />
// </Route>
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { DashboardLayout } from "@/layouts/DashboardLayout";

import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Orders from "@/pages/Orders";
import Inventory from "@/pages/Inventory";
import Menu from "@/pages/Menu";
import Tables from "@/pages/Tables";
import Staff from "@/pages/Staff";
import AIInsights from "@/pages/AIInsights";
import Analytics from "@/pages/Analytics";
import Subscription from "@/pages/Subscription";
import SettingsPage from "@/pages/SettingsPage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute";
import CustomerMenu from "@/pages/CustomerMenu";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="inventory" element={<Inventory />} />

            {/* 👨‍💼 MANAGER MENU */}
            <Route path="menu" element={<Menu />} />

            {/* 🍽 CUSTOMER MENU (INSIDE DASHBOARD) */}
            <Route path="menu/customer" element={<CustomerMenu />} />

            <Route path="tables" element={<Tables />} />
            <Route path="staff" element={<Staff />} />
            <Route path="ai-insights" element={<AIInsights />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;