(function () {
  console.log('Widget script starting');

  // Create container
  const container = document.createElement('div');
  container.id = 'weather-widget-container';
  container.style.border = '1px solid red'; // Make it visible
  document.currentScript.insertAdjacentElement('afterend', container);

  // Load CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href =
    'https://weather-widget-pied.vercel.app/assets/index-BJpt4Z0r.css';
  document.head.appendChild(link);

  // Load JS
  const script = document.createElement('script');
  script.src =
    'https://weather-widget-pied.vercel.app/assets/index-B1ax72pw.js'; // Fixed duplicate
  script.onload = function () {
    console.log(
      'Script loaded, initWeatherWidget exists:',
      !!window.initWeatherWidget
    );

    // Get the container element
    const containerEl = document.getElementById(
      'weather-widget-container'
    );
    console.log('Container element:', containerEl);

    if (window.initWeatherWidget && containerEl) {
      window.initWeatherWidget({
        container: containerEl, // Pass the DOM element
      });
    }
  };
  document.body.appendChild(script);
})();
