import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { Bot, Menu, X } from "lucide-react";

const Nav = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`h-16 w-full flex items-center justify-between px-4 bg-background ${location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/verify-otp" ? "hidden" : "block"}`}>

      <div className="flex items-center space-x-2">
        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
          <Bot className="size-4" />
        </div>
        <h1 className="text-xl font-extrabold tracking-tight">MockInterview</h1>
      </div>

      <div className="hidden md:flex items-center space-x-6">
        <Button variant="link" className="text-md font-semibold" asChild>
          <Link to="/">Home</Link>
        </Button>
        <Button variant="link" className="text-md font-semibold" asChild>
          <Link to="/about">About</Link>
        </Button>
        <Button variant="link" className="text-md font-semibold" asChild>
          <Link to="/contact">Contact</Link>
        </Button>
      </div>

      <div className="hidden md:flex items-center space-x-2">
        <AnimatedThemeToggler className="cursor-pointer" />
        <Button variant="ghost"><Link to="/login">Login</Link></Button>
        <Button variant="ghost"><Link to="/signup">Sign Up</Link></Button>
      </div>

      <div className="md:hidden flex items-center">
        <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-background shadow-md flex flex-col items-center space-y-4 py-6 md:hidden z-50">
          <Button variant="link" className="text-md font-semibold" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="link" className="text-md font-semibold" asChild>
            <Link to="/about">About</Link>
          </Button>
          <Button variant="link" className="text-md font-semibold" asChild>
            <Link to="/contact">Contact</Link>
          </Button>
          <AnimatedThemeToggler className="cursor-pointer" />
          <Button variant="ghost"><Link to="/login">Login</Link></Button>
          <Button variant="ghost"><Link to="/signup">Sign Up</Link></Button>
        </div>
      )}
    </nav>
  );
};

export default Nav;