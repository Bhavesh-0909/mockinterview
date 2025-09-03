import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import VerifyOTP from "./pages/VerifyOTP";

function App() {
  return (
    <div className="min-h-screen max-w-screen overflow-x-hidden bg-background">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-otp/:email" element={<VerifyOTP />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
