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

  // Load the main bundle directly - UPDATED BUNDLE NAME
  const script = document.createElement('script');
  script.src =
    'https://weather-widget-pied.vercel.app/assets/index-4P27zBKZ.js';

  script.onload = function () {
    console.log(
      'Bundle loaded, checking for initWeatherWidget:',
      !!window.initWeatherWidget
    );

    // Debug what global functions might exist
    const potentialWidgetFns = Object.keys(window).filter(
      (k) =>
        typeof window[k] === 'function' &&
        (k.includes('widget') || k.includes('Widget'))
    );
    console.log('Potential widget functions:', potentialWidgetFns);

    // Check if WeatherWidget has properties
    if (window.WeatherWidget) {
      console.log(
        'Found WeatherWidget global:',
        window.WeatherWidget
      );
    }

    if (window.initWeatherWidget) {
      try {
        console.log(
          'Initializing widget with direct container reference'
        );
        window.initWeatherWidget({
          container: containerElement,
        });
      } catch (e) {
        console.error('Error initializing with direct reference:', e);

        // Try with getElementById as fallback
        try {
          console.log('Trying with getElementById fallback');
          window.initWeatherWidget({
            container: document.getElementById(uniqueId),
          });
        } catch (e2) {
          console.error('Both initialization methods failed:', e2);
        }
      }
    } else {
      console.error('initWeatherWidget not found in global scope!');
    }
  };

  document.body.appendChild(script);
})();
