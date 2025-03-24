(function () {
  console.log('Test widget running');

  // Create a visible element without any React dependencies
  const testElement = document.createElement('div');
  testElement.style.width = '200px';
  testElement.style.height = '100px';
  testElement.style.backgroundColor = 'red';
  testElement.style.color = 'white';
  testElement.style.padding = '20px';
  testElement.style.margin = '20px';
  testElement.style.fontFamily = 'Arial, sans-serif';
  testElement.textContent = 'Weather Widget Placeholder';

  // Add it to the page
  document.currentScript.insertAdjacentElement(
    'afterend',
    testElement
  );
})();
