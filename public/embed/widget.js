(function () {
  console.log('Widget script starting');

  // Create container
  const container = document.createElement('div');
  container.id = 'weather-widget-container';
  document.currentScript.insertAdjacentElement('afterend', container);

  // // Load CSS
  // const link = document.createElement('link');
  // link.rel = 'stylesheet';
  // link.href ='https://weather-widget-pied.vercel.app/assets/index-BJpt4Z0r.css';
  // document.head.appendChild(link);

  // Load JS only with new IIFE build
  const script = document.createElement('script');
  script.src =
    'https://weather-widget-pied.vercel.app/assets/index-B5QcDblH.js'; 
  
  script.onload = function () {
    if (window.initWeatherWidget) {
      window.initWeatherWidget({
        container: document.getElementById(
          'weather-widget-container'
        ),
      });
    } else {
      console.error('initWeatherWidget not found!');
    }
  };
  document.body.appendChild(script);
})();