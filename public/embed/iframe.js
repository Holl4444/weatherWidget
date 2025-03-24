// Simple embedding script using iframe
(function () {
  console.log('Iframe embedding script starting');

  // Create iframe container
  const container = document.createElement('div');

  // Create iframe element using DOM methods
  const iframe = document.createElement('iframe');
  iframe.src = 'https://weather-widget-pied.vercel.app/';
  iframe.style.border = 'none';
  iframe.style.width = '350px'; // Increased width
  iframe.style.height = '200px'; // Increased height
  iframe.style.overflow = 'hidden';
  iframe.title = 'Weather Widget';

  // Append iframe to container
  container.appendChild(iframe);

  // Insert after script tag
  document.currentScript.insertAdjacentElement('afterend', container);

  console.log('Iframe embedded successfully');
})();
