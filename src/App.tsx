import { createContext, useContext, useState, useEffect } from 'react';
import './App.module.css';
import Current from './components/Current';
import { ThreeHourResponse } from './utils/Types'; // Type for API data

interface WeatherContextType {
  weatherData: ThreeHourResponse | undefined;
  error: string | null;
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

const App = () => {
  const [weatherData, setWeatherData] = useState<ThreeHourResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Fetch weather info as though from a real API:
  useEffect(() => {
    const apiCall = async () => {
      // Required parameters according to openweatherMap we have (lat, lon, appid). No specific headers.
      const url = `https://europe-west1-amigo-actions.cloudfunctions.net/recruitment-mock-weather-endpoint/forecast?appid=a2ef86c41a&lat=27.987850&lon=86.925026`;
      try {
        const response = await fetch(url);
        // Handle errors like 404 not found
        if (!response.ok) {
          console.log(`Error: `, response.status);
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
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
    apiCall();
  }, []);
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
        <Current />
      )}
    </WeatherContext.Provider>
  );
}

export default App;
