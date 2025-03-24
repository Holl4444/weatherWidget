import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.module.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

//embeds widget when called by the one liner!
window.initWeatherWidget = function (config: { container: string }) {
  const container = document.getElementById(config.container);
  if (container) {
    // Use simpler rendering approach for embedding
    import('react-dom').then((ReactDOM) => {
      ReactDOM.render(<App />, container);
    });
  }
};

// TypeScript declaration: Typescript doesn't know about properties added to global objects, like window, unless you declare them. This is after the embed call as it is only used by Typescript at compile time. Hoisted.
declare global { 
  interface Window {
    initWeatherWidget: (config: { container: string }) => void;
  }
}