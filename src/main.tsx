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
  console.warn('🌤️ initWidget called with:', config);

  const container =
    typeof config.container === 'string'
      ? document.getElementById(config.container)
      : config.container;

  console.warn('🌤️ Container resolved:', {
    exists: !!container,
    type: typeof container,
    id: container?.id,
  });

  if (container) {
    try {
      window.WeatherWidgetAppComponent = App;
      console.warn('🌤️ Root creation starting for:', container.id);

      const root = createRoot(container);
      console.warn('🌤️ Root created, rendering App');

      root.render(<App />);
      console.warn('🌤️ Render called on root');
    } catch (error) {
      console.error('🌤️ Widget initialization failed:', error);
    }
  }
}

// Directly attach to window using a more reliable method
if (typeof window !== 'undefined') {
  console.log('Initialising weather widget globally');

  // Set up the widget components  
  window.WeatherWidgetAppComponent = App;
  window.initWeatherWidget = initWidget;

  console.log('Weather widget initialization complete:', {
    hasInitFunction: typeof window.initWeatherWidget === 'function',
    hasApp: !!window.WeatherWidgetAppComponent,
    appType: typeof window.WeatherWidgetAppComponent,
  });
}