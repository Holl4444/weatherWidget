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
    'https://weather-widget-pied.vercel.app/assets/index-B5QcDblH.js';

  script.onload = function () {
    console.log(
      'Bundle loaded, checking container exists:',
      !!document.getElementById(uniqueId)
    );

    // Verify container still exists
    if (!document.getElementById(uniqueId)) {
      console.error('Container element was removed from DOM!');
      // Re-insert if needed
      document.currentScript.insertAdjacentElement(
        'afterend',
        containerElement
      );
    }

    if (window.initWeatherWidget) {
      console.log(
        'Initializing widget in container element directly'
      );

      // Pass the element reference directly, not the ID
      window.initWeatherWidget({
        container: containerElement,
      });
    } else {
      console.error('initWeatherWidget not found!');
    }
  };

  document.body.appendChild(script);
})();
