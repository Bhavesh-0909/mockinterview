import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Moon, Sun, Bot } from "lucide-react";

const Nav = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(prev => !prev);
  };

  return (
    <nav className="h-16 w-full  flex items-center justify-between px-4">

      <div className='flex items-center space-x-2'>
        <Bot className='text-primary'/>
        <h1 className='scroll-m-20 text-center  text-xl font-extrabold tracking-tight text-balance'>MockInterview</h1>
      </div>

      <div>
        <Button variant="link" className='scroll-m-20 text-md font-semibold tracking-tight'>Home</Button>
        <Button variant="link" className='scroll-m-20 text-md font-semibold tracking-tight'>About</Button>
        <Button variant="link" className='scroll-m-20 text-md font-semibold tracking-tight'>Contact</Button>
      </div>

      <div className='flex items-center space-x-2'>
        <Button
          onClick={toggleDarkMode}
          variant="ghost"
        >
          {!isDark ? <Sun /> : <Moon />}
        </Button>
        <div className='flex items-center space-x-2'>
          <Button variant="ghost">Login</Button>
          <Button variant="ghost">Sign Up</Button>
        </div>
      </div>

    </nav>
  );
};

export default Nav;