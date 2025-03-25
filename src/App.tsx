import { createContext, useContext, useState, useEffect } from 'react';
import styles from './App.module.css';
import Current from './components/Current';
import WeekAhead from './components/WeekAhead';
import { ThreeHourResponse } from './utils/Types'; // Type for API data
import { Analytics, track } from '@vercel/analytics/react'

interface WeatherContextType {
  weatherData: ThreeHourResponse | undefined;
  error: string | null;
}

interface coordProps {
  coords?: {
    lat: number;
    lon: number;
  };
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined); // Creates context for the hook useWeather - undefined is the default value - this is where the .Provider container component comes from

// export the hook to be used in other components
export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within WeatherProvider');
  }
  return context;
}

const App = ({ coords }: coordProps) => {
  const [weatherData, setWeatherData] = useState<ThreeHourResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoverCount, setHoverCount] = useState(0) // Track session hovers

  // Fetch weather info as though from a real API:
  useEffect(() => {
    const apiCall = async () => {
      // Fallback coords to Castle Drogo - England's newest castle (1930)!
      const lat = coords?.lat ?? 50.6816;
      const lon = coords?.lon ?? -3.7844;
      console.log('API call using coordinates:', { lat, lon });
      // Required parameters according to openweatherMap we have (lat, lon, appid). No specific headers.
      const url = `https://europe-west1-amigo-actions.cloudfunctions.net/recruitment-mock-weather-endpoint/forecast?appid=a2ef86c41a&lat=${lat}&lon=${lon}`;
      try {
        const response = await fetch(url);
        // Handle errors like 404 not found
        if (!response.ok) {
          console.log(`Error: `, response.status);
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setWeatherData(result);
      } catch (err) {
        console.log(err);
        // Handle the unknown type error safely
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    console.log('App received coords:', coords);
    apiCall();
  }, [coords]);

  useEffect(() => {
    // Add listener when component mounts
    const accordion = document.querySelector('.glFdsV');
    const handleClick = (event: Event) => {
      const accordionItem = (event.target as Element).closest('li');
      if (accordionItem) {
        const locationName =
          window.location.pathname.split('/').pop() ||
          'unknown-location';
        track('accordion_click', {
          propertyId: locationName,
          section: accordionItem.id.replace('place-', ''),
          timestamp: new Date().toISOString(),
        });
      }
    };

    accordion?.addEventListener('click', handleClick);

    // Clean up when component unmounts
    return () => accordion?.removeEventListener('click', handleClick);
  }, []); // Empty array means run once on mount

  // Wrap everything we need elsewhere in context provider. Everything in here will be able to access useWeather hook and therefore weatherData and error
  return (
    <WeatherContext.Provider value={{ weatherData, error }}>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : !weatherData ? (
        <div>No weatherData available</div>
      ) : (
        <>
          <div
            className={styles.weatherContainer}
            onMouseEnter={() => {
              setHoverCount((prev) => {
                track('widget-hover', {
                  propertyId: window.location.pathname.split('/').pop() //browser window -> current url info -> url path
                    || 'unknown-location',
                  timestamp: new Date().toISOString(),
                  hoverCount: prev + 1,
                });
                return prev + 1; //updating hoverCount
              });
            }}
          >
            <Current />
            <WeekAhead />
          </div>
          <Analytics />
        </>
      )}
    </WeatherContext.Provider>
  );
};

export default App;
