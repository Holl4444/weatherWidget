(function () {
  // Create container with flex layout
  const container = document.createElement('div');
  container.id = `weather-widget-${Date.now()}`;

  // Use flex layout with complete centering

  container.setAttribute(
    'style',
    'display: flex; justify-content: center; align-items: center; background-color: #fff; padding: 1rem; margin-top: 0 auto; width: 90%; box-shadow: 0 0.0625rem 0.1875rem #00000014; border-radius: 0.25rem'
  );

  // Add container right after script
  document.currentScript.insertAdjacentElement('afterend', container);

  // Load React and ReactDOM
  const reactScript = document.createElement('script');
  reactScript.src =
    'https://unpkg.com/react@18.3.1/umd/react.development.js';

  reactScript.onload = function () {
    const reactDomScript = document.createElement('script');
    reactDomScript.src =
      'https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js';

    reactDomScript.onload = function () {
      const bundleScript = document.createElement('script');
      bundleScript.type = 'text/javascript';
      bundleScript.src =
        'https://weather-widget-pied.vercel.app/assets/index-DVuy20L3.js';

      bundleScript.onload = function () {
        if (window.initWeatherWidget) {
          // Single mutation observer for development
          if (bundleScript.src.includes('development')) {
            const observer = new MutationObserver(() => {});
            observer.observe(container, {
              childList: true,
              subtree: true,
            });
          }
          window.initWeatherWidget({ container });
        }
      };

      document.body.appendChild(bundleScript);
    };

    document.head.appendChild(reactDomScript);
  };

  document.head.appendChild(reactScript);
})();
