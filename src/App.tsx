import { useState, useEffect } from 'react';
import './App.module.css';
import Current from './components/Current';
import { ThreeHourResponse } from './utils/Types';

const App = () => {
  const [data, setData] = useState<ThreeHourResponse>();
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
        setData(result)
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
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return <Current weatherData={data} />;
}

export default App;
