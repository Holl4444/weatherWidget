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
    WeatherWidgetAppComponent: React.ComponentType<object>;
  }
  interface globalThis {
    initWeatherWidget: InitWidgetFunction;
    WeatherWidgetAppComponent: React.ComponentType<object>;
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
      // Store App component globally so it can be used by the global function
      window.WeatherWidgetAppComponent = App;

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

// Modify exposeGlobalFunction to use the globally stored App component
const exposeGlobalFunction = () => {
  try {
    const globalScript = document.createElement('script');
    globalScript.textContent = `
      window.initWeatherWidget = function(config) {
        const container = typeof config.container === 'string'
          ? document.getElementById(config.container)
          : config.container;
        
        if (container) {
          try {
            // Try to use the actual App component if available
            if (window.WeatherWidgetAppComponent) {
              const AppComponent = window.WeatherWidgetAppComponent;
              const element = React.createElement(AppComponent);
              const root = ReactDOM.createRoot(container);
              root.render(element);
              console.log('Real weather widget initialized successfully');
            } else {
              // Fallback to placeholder if App component isn't available
              console.warn('App component not available, using placeholder');
              // Placeholder code here (your existing code)
            }
          } catch (error) {
            console.error('Error initializing widget:', error);
          }
        }
      };
      console.log("Real App-capable initWeatherWidget function exposed:", !!window.initWeatherWidget);
    `;
    document.head.appendChild(globalScript);
  } catch (e) {
    console.error('Failed to expose global function:', e);
  }
};

// Run it immediately
exposeGlobalFunction();
