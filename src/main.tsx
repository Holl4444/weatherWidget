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

//For standalone use
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

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

// Force global exposure with multiple approaches
try {
  // For globalThis, use a safer approach that TypeScript won't complain about
  if (typeof globalThis !== 'undefined') {
    Object.defineProperty(globalThis, 'initWeatherWidget', {
      value: initWidget,
      writable: true,
      configurable: true
    });
  }
  
  // For window, both direct assignment and defineProperty
  window.initWeatherWidget = initWidget; // This is fine because we declared it
  
  Object.defineProperty(window, 'initWeatherWidget', {
    value: initWidget,
    writable: true,
    configurable: true,
  });
  
  console.log('initWeatherWidget exposed via multiple methods');
} catch (e) {
  console.error('Failed to expose initWeatherWidget:', e);
}
