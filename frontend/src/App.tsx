import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Dashboard from "@/pages/Dashboard"; // Create a proper Dashboard component
import { Toaster } from "sonner"; // For toast notifications
import LoadingBar from "react-top-loading-bar";
import { useRef } from "react";
import type { LoadingBarRef } from "react-top-loading-bar";

function App() {
  const loadingBarRef = useRef<LoadingBarRef>(null);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen max-w-screen overflow-x-hidden bg-background">
          <LoadingBar color="#3b82f6" ref={loadingBarRef} />
          <Nav />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              
              <Route path="/login" element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              } />
              
              <Route path="/signup" element={
                <PublicRoute>
                  <SignupPage />
                </PublicRoute>
              } />
              
              <Route path="/verify-otp/:email" element={
                <PublicRoute>
                  <VerifyOTP />
                </PublicRoute>
              } />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          <Toaster 
            position="top-right" 
            toastOptions={{
              duration: 4000,
              style: {
                background: 'white',
                color: '#333',
                border: '1px solid #e5e7eb',
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;