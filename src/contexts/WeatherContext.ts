import { createContext, useContext } from 'react';
import { ThreeHourResponse } from '../utils/Types';

interface WeatherContextType {
  weatherData: ThreeHourResponse | undefined;
  error: string | null;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within WeatherProvider');
  }
  return context;
}

export { WeatherContext };