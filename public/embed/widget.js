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

  // More reliable insertion method
  try {
    // Method 1: Try currentScript first
    if (document.currentScript) {
      document.currentScript.insertAdjacentElement(
        'afterend',
        testElement
      );
      console.log('Inserted using currentScript');
    }
    // Method 2: Find the script element
    else {
      const scripts = document.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes('widget.js')) {
          scripts[i].parentNode.insertBefore(
            testElement,
            scripts[i].nextSibling
          );
          console.log('Inserted using script tag search');
          break;
        }
      }
    }
  } catch (e) {
    // Method 3: Last resort - append to body
    console.error('Error inserting element:', e);
    document.body.appendChild(testElement);
    console.log('Inserted as body child');
  }
})();
