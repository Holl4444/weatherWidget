// This is the one-line embed script that websites can include

(function () { 
  // Create container
  const container = document.createElement('div');
  container.id = 'weather-widget-container';
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
    'https://weather-widget-pied.vercel.app/assets/index-BQB9t8up.js'; 
  script.onload = function () {
 
    window.initWeatherWidget && 
      window.initWeatherWidget({
        container: 'weather-widget-container', 
      });
  };
  document.body.appendChild(script); 
})();

