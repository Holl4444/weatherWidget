import Icon from './Icon';
import styles from './Current.module.css';
import { useWeather } from '../contexts/WeatherContext';
import Wind from './Wind';
import LaterToday from './LaterToday';


// Creates an icon using its weather description as alt text
export default function Current() {
    const { weatherData, error } = useWeather();
    if (!weatherData || error) return null;
    const currentTime = weatherData.list[0].dt_txt.slice(11, -3);
    const nowIcon = weatherData.list[0].weather[0].icon;
    const description = `${weatherData.list[0].weather[0].description
      .slice(0, 1)
      .toUpperCase()}${weatherData.list[0].weather[0].description.slice(
      1
        )}`;
    const currentTemp = Math.round(weatherData.list[0].main.temp - weatherData.list[0].main.temp_kf);
   
    return (
      <div className={styles.current}>
        <div className={styles.todayContainer}>
          <p className={styles.currentTimeText}>Today {currentTime}</p>
          <Icon icon={nowIcon} description={description} className={styles.nowIcon} />
        </div>
        <div className={styles.extrasContainer}>
          <p className={styles.currentWeatherText}>{description}</p>
          <div className={styles.tempWindContainer}>
            <p className={styles.temp}>{currentTemp}°C</p>
            <Wind />
          </div>
          <div className={styles.updatesToday}>
            <LaterToday />
          </div>
        </div>
      </div>
    );
}