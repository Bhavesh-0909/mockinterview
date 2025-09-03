import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import NotFound from "./pages/NotFound.tsx";
import LoginPage from "./pages/Login.tsx";
import SignupPage from "./pages/Signup.tsx";
import VerifyOTP from "./pages/VerifyOTP.tsx";

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
