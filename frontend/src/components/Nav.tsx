import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bot, Menu, X, Sun, Moon, User, LogOut, Settings, LayoutDashboard } from "lucide-react";
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

  // Authenticated navigation items
  const authNavItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/profile", label: "Profile", icon: User },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

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
          <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
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
          <Button variant="link" className="text-md font-semibold" asChild key={item.to}>
            <Link to={item.to}>{item.label}</Link>
          </Button>
        ))}
        
        {user && authNavItems.map((item) => (
          <Button
            key={item.to}
            variant={isActivePath(item.to) ? "default" : "ghost"}
            className="text-sm font-medium"
            asChild
          >
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
                <Link to="/dashboard" className="flex items-center">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
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
        <div className="w-full bg-background flex flex-col md:hidden">
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              {publicNavItems.map((item) => (
                <Button variant="link" className="text-md font-semibold" asChild key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </Button>
              ))}
            </div>

            {user && (
              <>
                <div className="border-t pt-4 space-y-2">
                  <div className="px-2 pb-2">
                    <p className="text-sm font-medium">{user.fullname || "User"}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  {authNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.to}
                        variant={isActivePath(item.to) ? "default" : "ghost"}
                        className="w-full justify-start text-sm font-medium"
                        asChild
                        onClick={closeMenu}
                      >
                        <Link to={item.to}>
                          <Icon className="mr-2 h-4 w-4" />
                          {item.label}
                        </Link>
                      </Button>
                    );
                  })}
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </div>
              </>
            )}

            {!user && (
              <div className="border-t pt-4 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm font-medium"
                  asChild
                  onClick={closeMenu}
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  className="w-full justify-start text-sm font-medium"
                  asChild
                  onClick={closeMenu}
                >
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