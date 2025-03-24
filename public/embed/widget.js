(function () {
  console.log('Widget script starting');

  // Create container with UNIQUE ID to avoid doubled React instances trying to render in same container.
  const uniqueId = 
    `weather-widget-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const container = document.createElement('div');
  container.id = uniqueId;
  document.currentScript.insertAdjacentElement('afterend', container);

  // Load the main bundle directly
  const script = document.createElement('script');
  script.src =
    'https://weather-widget-pied.vercel.app/assets/index-B5QcDblH.js';

  script.onload = function () {
    if (window.initWeatherWidget) {
      console.log('Initializing widget in container:', uniqueId);
      window.initWeatherWidget({
        container: document.getElementById(uniqueId),
      });
    } else {
      console.error('initWeatherWidget not found!');
    }
  };

  document.body.appendChild(script);
})();
