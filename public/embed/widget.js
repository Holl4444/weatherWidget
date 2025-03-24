(function () {
  console.warn('🌤️ WEATHER WIDGET: Starting...');

  // Create container
  const uniqueId = `weather-widget-${Date.now()}-${Math.floor(
    Math.random() * 1000
  )}`;
  const container = document.createElement('div');
  container.id = uniqueId;
  container.style.border = '1px solid red';
  container.style.minHeight = '200px';
  container.style.padding = '10px';
  container.style.margin = '10px 0';
  container.style.backgroundColor = '#f0f0f0';

  document.currentScript.insertAdjacentElement('afterend', container);
  const containerElement = container;

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
              childNodes: containerElement.childNodes.length,
              mutations: mutations.map((m) => ({
                type: m.type,
                target: m.target.nodeName,
              })),
            });
          });

          observer.observe(containerElement, {
            childList: true,
            subtree: true,
          });
          window.initWeatherWidget({
            container: containerElement,
            debug: true,
          });
        }
      };

      document.body.appendChild(bundleScript);
    };

    document.head.appendChild(reactDomScript);
  };

  document.head.appendChild(reactScript);
})();
