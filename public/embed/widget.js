(function () {
  console.log('Widget script starting');

  // Create container with uniqueID
  const uniqueId = `weather-widget-${Date.now()}-${Math.floor(
    Math.random() * 1000
  )}`;
  const container = document.createElement('div');
  container.id = uniqueId;

  // Add a visible border 
  container.style.border = '1px solid transparent';

  // Insert container into DOM
  document.currentScript.insertAdjacentElement('afterend', container);

  console.log('Created container with ID:', uniqueId);

  // Store direct reference to container element
  const containerElement = container;

  // Load the main bundle directly
  const script = document.createElement('script');
  script.src =
    'https://weather-widget-pied.vercel.app/assets/index-BXephlxF.js';

  script.onload = function () {
      console.log("Bundle loaded, checking for initWeatherWidget:", !!window.initWeatherWidget);

    if (window.initWeatherWidget) {
      console.log('Initializing widget in container:', uniqueId);
      // Pass the element reference directly
      window.initWeatherWidget({
        container: document.getElementById(uniqueId),
      });
    } else {
      console.error('initWeatherWidget not found!');
    }
  };

  document.body.appendChild(script);
})();
