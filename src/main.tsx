import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.module.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

//embeds widget when called by the one liner!
window.initWeatherWidget = function (config: {
  container: Element | string;
}) {
  const container =
    typeof config.container === 'string'
      ? document.getElementById(config.container)
      : config.container;
  
  if (container) {
     try {
       const root = createRoot(container);
       root.render(<App />);
     } catch (error) {
       console.error(error);
     }
  }
};

// TypeScript declaration: Typescript doesn't know about properties added to global objects, like window, unless you declare them. This is after the embed call as it is only used by Typescript at compile time. Hoisted.
declare global { 
  interface Window {
    initWeatherWidget: (config: { container: Element | string }) => void;
  }
}