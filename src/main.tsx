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
      console.log(
        'Storing App component globally:',
        !!window.WeatherWidgetAppComponent
      );

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
   console.log(
    'WeatherWidgetAppComponent check:',
    window.WeatherWidgetAppComponent ? 'Available' : 'Not available',
    typeof window.WeatherWidgetAppComponent
  );
}

console.log('About to expose initWeatherWidget globally');

if (typeof window !== 'undefined') {
  console.log(
    'Explicitly attaching initWeatherWidget to global window'
  );
  window.initWeatherWidget = initWidget;
  window.WeatherWidgetAppComponent = App;
  console.log('Weather widget initialization complete:', {
    hasInitFunction: typeof window.initWeatherWidget === 'function',
    hasApp: !!window.WeatherWidgetAppComponent,
    appType: typeof window.WeatherWidgetAppComponent,
  });
};