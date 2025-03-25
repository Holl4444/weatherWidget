(function () {
  // Create container with flex layout
  const container = document.createElement('div');
  container.id = `weather-widget-${Date.now()}`;

  // Use flex layout with content-based sizing
  container.style.display = 'flex';
  container.style.justifyContent = 'center';
  container.style.backgroundColor = '#ffffff';
  container.style.padding = '16px';
  container.style.margin = '16px 0';
  container.style.width = 'fit-content'; // Size to content
  container.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
  container.style.borderRadius = '4px';

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
        'https://weather-widget-pied.vercel.app/assets/index-DKyZjJz-.js';

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
