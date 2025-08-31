import { useEffect, useState } from 'react';

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
    <nav className="">
      <button
        onClick={toggleDarkMode}
        className=""
      >
        {!isDark ? ' ☀️' : '🌙'}
      </button>
    </nav>
  );
};

export default Nav;