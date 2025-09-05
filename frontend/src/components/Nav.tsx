import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bot, Menu, X, Sun, Moon, LogOut, LayoutDashboard } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isLoading } = useAuth();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Hide nav on auth pages
  const hideNavRoutes = ["/login", "/signup"];
  const shouldHideNav = hideNavRoutes.includes(location.pathname) || 
                       location.pathname.includes("verify-otp");

  if (shouldHideNav) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Public navigation items
  const publicNavItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  if (isLoading) {
    return (
      <nav className="h-16 w-full flex items-center justify-between px-4 bg-background border-b">
        <div className="flex items-center space-x-2">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Bot className="size-4" />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight">MockInterview</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-muted animate-pulse rounded-full"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="h-16 w-full flex items-center justify-between px-4 bg-background">
      <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
          <Bot className="size-4" />
        </div>
        <h1 className="text-xl font-extrabold tracking-tight">MockInterview</h1>
      </Link>

      <div className="hidden md:flex items-center space-x-6">
        {publicNavItems.map((item) => (
          <Button variant="link" onClick={closeMenu} className="text-md font-semibold" asChild key={item.to}>
            <Link to={item.to}>{item.label}</Link>
          </Button>
        ))}
        
      </div>

      <div className="hidden md:flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="hover:bg-muted"
        >
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatarlink} alt={user.fullname || user.email} />
                  <AvatarFallback>
                    {user.fullname ? getInitials(user.fullname) : user.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.fullname || "User"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} variant="destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>

      <div className="md:hidden flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="hover:bg-muted"
        >
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
        
        <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-background border-t md:hidden z-50">
          <div className="flex flex-col justify-center items-center p-4 space-y-4">
            <div className="flex flex-col justify-center items-center space-y-2">
              {publicNavItems.map((item) => (
                <Button variant="link" onClick={closeMenu} className="text-md font-semibold" asChild key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </Button>
              ))}
            </div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatarlink} alt={user.fullname || user.email} />
                      <AvatarFallback>
                        {user.fullname ? getInitials(user.fullname) : user.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.fullname || "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;