(function () {
  console.warn('🌤️ WEATHER WIDGET: Starting...');

  // Create container
  const container = document.createElement('div');
  container.id = `weather-widget-${Date.now()}`;

  // Add subtle card styling with min-width to prevent squishing
  container.style.backgroundColor = '#ffffff';
  container.style.padding = '16px';
  container.style.margin = '16px 0';
  container.style.maxWidth = '400px';
  container.style.minWidth = '280px'; // Prevent content squishing
  container.style.width = '100%'; // Allow responsive sizing
  container.style.boxSizing = 'border-box'; // Include padding in width
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
          const observer = new MutationObserver((mutations) => {
            console.warn('🌤️ Container mutation:', {
              childNodes: container.childNodes.length,
              mutations: mutations.map((m) => ({
                type: m.type,
                target: m.target.nodeName,
              })),
            });
          });

          observer.observe(container, {
            childList: true,
            subtree: true,
          });
          window.initWeatherWidget({ container, debug: true });
        }
      };

      document.body.appendChild(bundleScript);
    };

    document.head.appendChild(reactDomScript);
  };

  document.head.appendChild(reactScript);
})();
