// Simple embedding script using iframe
(function () {
  console.log('Iframe embedding script starting');

  // Create iframe container
  const container = document.createElement('div');

  // Set iframe HTML - directly loading the root URL
  container.innerHTML = `
    <iframe 
      src="https://weather-widget-pied.vercel.app/" 
      style="border:none; width:300px; height:150px; overflow:hidden;" 
      title="Weather Widget">
    </iframe>
  `;

  // Insert after script tag
  document.currentScript.insertAdjacentElement('afterend', container);

  console.log('Iframe embedded successfully');
})();
