(function () {
  // Create container with flex layout
  const container = document.createElement('div');
  container.id = `weather-widget-${Date.now()}`;

  // Use flex layout with complete centering

  container.setAttribute(
    'style',
    'display: flex; justify-content: center; align-items: center; background-color: #fff; padding: 1em; width: 100%; font-size: 16px; box-sizing: border-box; box-shadow: 0 0.0625rem 0.1875rem #00000014; border-radius: 0.25rem'
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
        'https://weather-widget-one-roan.vercel.app/assets/index-CJjse7Z_.js';

      bundleScript.onload = function () {
        if (window.initWeatherWidget) {
          // get coords
          const coords = getSiteLocation();

          // Development observer setup
          if (bundleScript.src.includes('development')) {
            const observer = new MutationObserver(() => {});
            observer.observe(container, {
              childList: true,
              subtree: true,
            });
          }
          console.log('Initializing widget with coords:', coords);
          // Pass coordinates to widget initialization
          window.initWeatherWidget({ container, coords });
        }
      };

      document.body.appendChild(bundleScript);
    };

    document.head.appendChild(reactDomScript);
  };

  document.head.appendChild(reactScript);
})();

function getSiteLocation() {
  const mapLink = document.querySelector('a[href*="maps/dir"]');
  console.log('No map link');
  if (!mapLink) return null;

  const match = mapLink.href.match(
    /destination=([-\d.]+)%2C([-\d.]+)/
  );
  if (match) {
    const coords = {
      lat: Number(match[1]),
      lon: Number(match[2]),
    };
    return coords;
  }
  return null;
}
