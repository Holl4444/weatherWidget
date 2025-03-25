(function () {
  // Create container
  const container = document.createElement('div');
  container.id = `weather-widget-${Date.now()}`;

  container.setAttribute(
    'style',
    'display: flex; justify-content: center; align-items: center; background-color: #fff; padding: 1rem; margin-top: 0 auto; width: 100%; box-shadow: 0 0.0625rem 0.1875rem #00000014; border-radius: 0.25rem'
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
      // Fetch the manifest as part of automating src to update
      const manifestRequest = new XMLHttpRequest();
      manifestRequest.open(
        'GET',
        'https://weather-widget-pied.vercel.app/manifest.json',
        true
      );

      // Automate updating the script src
      manifestRequest.onload = function () {
        if (manifestRequest.status === 200) {
          const manifest = JSON.parse(manifestRequest.responseText);
          const bundleScript = document.createElement('script');
          bundleScript.type = 'text/javascript';
          bundleScript.src =
            'https://weather-widget-pied.vercel.app/' +
            manifest['index.html'].file;

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
        }
      };
      manifestRequest.send();
    };

    document.head.appendChild(reactDomScript);
  };

  document.head.appendChild(reactScript);
})();
