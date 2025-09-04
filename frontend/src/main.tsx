import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { LoadingBarContainer } from 'react-top-loading-bar';
import './index.css';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LoadingBarContainer>
        <App />
      </LoadingBarContainer>
    </ThemeProvider>
  </StrictMode>
);