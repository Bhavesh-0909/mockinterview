import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProctedRoutes";
import { PublicRoute } from "./components/PublicRoute";
import Nav from "@/components/Nav";
import Home from "@/pages/Home";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";
import VerifyOTP from "@/pages/verifyOTP";
import Dashboard from "@/pages/Dashboard";
import { Toaster } from "sonner";
import LoadingBar from "react-top-loading-bar";
import { useRef } from "react";
import type { LoadingBarRef } from "react-top-loading-bar";
import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

function AppLayout() {
  const loadingBarRef = useRef<LoadingBarRef>(null);
  const location = useLocation();

  return (
    <div className="min-h-screen max-w-screen overflow-x-hidden bg-background">
      <LoadingBar color="#3b82f6" ref={loadingBarRef} />

      {location.pathname === "/dashboard" ? (
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <SignupPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/verify-otp/:email"
                element={
                  <PublicRoute>
                    <VerifyOTP />
                  </PublicRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </SidebarProvider>
      ) : (
        <>
          <Nav />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <SignupPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/verify-otp/:email"
                element={
                  <PublicRoute>
                    <VerifyOTP />
                  </PublicRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </>
      )}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "bg-background",
            color: "primary",
            border: "border-border",
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;