import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from './context/ThemeContext.tsx';
import { LoadingBarContainer } from 'react-top-loading-bar';
import { Toaster } from "@/components/ui/sonner"
import './index.css';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LoadingBarContainer props={{ color: "violet" }}>
        <BrowserRouter>
          <App/>
          <Toaster />
        </BrowserRouter>
      </LoadingBarContainer>
    </ThemeProvider>
  </StrictMode>
);