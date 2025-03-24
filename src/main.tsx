import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.module.css';

// Define type for the widget initialization function
interface InitWidgetFunction {
  (config: { container: Element | string }): void;
}

// Define augmentation for Window interface
declare global {
  interface Window {
    initWeatherWidget: InitWidgetFunction;
  }
  interface globalThis {
    initWeatherWidget: InitWidgetFunction;
  }
}

// For standalone use - ONLY when root element exists
const rootElement = document.getElementById('root');
if (rootElement) {
  console.log('Initializing in standalone mode');
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

// IMPORTANT: Explicitly export to global scope
export function initWidget(config: { container: Element | string }) {
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
}

// Directly attach to window using a more reliable method
if (typeof window !== 'undefined') {
  console.log(
    'Explicitly attaching initWeatherWidget to global window'
  );
  window.initWeatherWidget = initWidget;
}

console.log('About to expose initWeatherWidget globally');

const exposeGlobalFunction = () => {
  try {
    // Create a non-module script that will run in global context
    const globalScript = document.createElement('script');
    globalScript.textContent = `
      // Create a standalone function that doesn't reference outer scope variables
      window.initWeatherWidget = function(config) {
        const container = typeof config.container === 'string'
          ? document.getElementById(config.container)
          : config.container;
        
        if (container) {
          try {
            const root = ReactDOM.createRoot(container);
            root.render(React.createElement(${App.name}));
            console.log('Widget initialized successfully');
          } catch (error) {
            console.error('Error initializing widget:', error);
          }
        }
      };
      console.log("Self-contained initWeatherWidget function exposed:", !!window.initWeatherWidget);
    `;
    document.head.appendChild(globalScript);
  } catch (e) {
    console.error('Failed to expose global function:', e);
  }
};

// Run it immediately
exposeGlobalFunction();