(function () {
  console.warn('🌤️ WEATHER WIDGET: Starting...'); // More visible logging

  // Create container with uniqueID
  const uniqueId = `weather-widget-${Date.now()}-${Math.floor(
    Math.random() * 1000
  )}`;
  const container = document.createElement('div');
  container.id = uniqueId;

  // Add visibility
  container.style.border = '1px solid red';
  container.style.minHeight = '200px';
  container.style.padding = '10px';
  container.style.margin = '10px 0';
  container.style.backgroundColor = '#f0f0f0'; // Light background to be more visible

  // Insert container into DOM
  document.currentScript.insertAdjacentElement('afterend', container);

  console.warn('🌤️ WEATHER WIDGET: Created container:', uniqueId);

  console.log('Created container with ID:', uniqueId);

  // Store direct reference to container element
  const containerElement = container;

  // First load React and ReactDOM
  // Use specific versions to ensure compatibility
  const reactScript = document.createElement('script');
  reactScript.src =
    'https://unpkg.com/react@18.3.1/umd/react.development.js';

  reactScript.onload = function () {
    console.log('✓ React core loaded, window.React:', !!window.React);

    // Only load ReactDOM after React loads successfully
    const reactDomClientScript = document.createElement('script');
    reactDomClientScript.src =
      'https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js';

    reactDomClientScript.onload = function () {
      console.log(
        '✓ ReactDOM client loaded, window.ReactDOM:',
        !!window.ReactDOM
      );

      // Only load bundle after both React and ReactDOM load
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src =
        'https://weather-widget-pied.vercel.app/assets/index-DKyZjJz-.js';

      script.onload = function () {
        console.log('Bundle loaded, checking globals:', {
          hasReact: !!window.React,
          hasReactDOM: !!window.ReactDOM,
          hasInit: !!window.initWeatherWidget,
        });

        // Debug what global functions might exist
        const potentialWidgetFns = Object.keys(window).filter(
          (k) =>
            typeof window[k] === 'function' &&
            (k.includes('widget') || k.includes('Widget'))
        );
        console.log(
          'Potential widget functions:',
          potentialWidgetFns
        );

        // Check if WeatherWidget has properties
        if (window.WeatherWidget) {
          console.log(
            'Found WeatherWidget global:',
            window.WeatherWidget
          );
        }

        // Add more detailed debugging
        if (window.initWeatherWidget) {
          try {
            console.warn('🌤️ React version:', React.version);

            window.initWeatherWidget({
              container: containerElement,
              debug: true,
            });

            const observer = new MutationObserver((mutations) => {
              console.warn('🌤️ Container mutation:', {
                childNodes: containerElement.childNodes.length,
                mutations: mutations.map((m) => ({
                  type: m.type,
                  target: m.target.nodeName,
                })),
              });
            });

            observer.observe(containerElement, {
              childList: true,
              subtree: true,
            });

            console.warn(
              '🌤️ WEATHER WIDGET: Post-initialization state:',
              {
                containerElement,
                containerChildren: containerElement.children,
                containerHTML: containerElement.innerHTML,
                initFunctionExists:
                  typeof window.initWeatherWidget === 'function',
                reactExists: typeof window.React === 'object',
                reactDOMExists: typeof window.ReactDOM === 'object',
                weatherWidgetExists:
                  typeof window.WeatherWidgetAppComponent ===
                  'function',
              }
            );

            console.log('Widget initialized, checking container:', {
              hasChildren: containerElement.children.length > 0,
              innerHTML: containerElement.innerHTML,
            });
          } catch (e) {
            console.error(
              'Error initializing with direct reference:',
              e
            );

            // Try with getElementById as fallback
            try {
              console.log('Trying with getElementById fallback');
              window.initWeatherWidget({
                container: document.getElementById(uniqueId),
              });
            } catch (e2) {
              console.error(
                'Both initialization methods failed:',
                e2
              );
            }
          }
        } else {
          console.error(
            'initWeatherWidget not found in global scope!'
          );
        }
      };

      document.body.appendChild(script);
    };
    reactDomClientScript.onerror = function (e) {
      console.error('✗ ReactDOM client failed to load:', e);
    };

    document.head.appendChild(reactDomClientScript);
  };

  reactScript.onerror = function (e) {
    console.error('✗ React core failed to load:', e);
  };

  // Load React first, then ReactDOM will load
  document.head.appendChild(reactScript);
})();
