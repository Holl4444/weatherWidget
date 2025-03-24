(function () {
  console.log('Widget loader starting');

  // Create container
  const container = document.createElement('div');
  container.id = 'weather-widget-container';
  document.currentScript.insertAdjacentElement('afterend', container);

  // Load the main bundle directly
  const script = document.createElement('script');
  script.src =
    'https://weather-widget-pied.vercel.app/assets/index-B5QcDblH.js';
  script.onload = function () {
    if (window.initWeatherWidget) {
      console.log('initWeatherWidget found, initializing widget');
      window.initWeatherWidget({
        container: document.getElementById(
          'weather-widget-container'
        ),
      });
    } else {
      console.error('initWeatherWidget not found in loaded bundle');
    }
  };

  document.body.appendChild(script);
})();
