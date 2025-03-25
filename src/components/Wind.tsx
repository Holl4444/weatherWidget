import { useWeather } from '../App';
import styles from './Wind.module.css';

export default function Wind() {
  const { weatherData, error } = useWeather();
  if (!weatherData || error) return null;
  const windSpeed = Math.round(weatherData.list[0].wind.speed);
  const arrowSrc = `https://cdn-icons-png.flaticon.com/128/5174/5174032.png`;
  const rotation = (weatherData.list[0].wind.deg + 180) % 360;
  const arrowAlt = compass(rotation);
  return (
    <div className={styles.wind}>
      <img
        src={arrowSrc}
        alt={`An arrow showing the wind direction: currently ${arrowAlt}`}
        className={styles.windArrow}
        style={
          { '--rotation': `${rotation}deg` } as React.CSSProperties //trust me TS it's valid css
        }
      ></img>
      <p className={styles.windSpeedText}>{`${windSpeed}m/s`}</p>
    </div>
  );
}

function compass(degrees: number): string {
  const index = Math.floor(((degrees + 22.5) % 360) / 45); // degrees + 22.5 makes 0 center for north instead of starting there by offsetting it (now 337.5 - 22.5deg)
  // Mod 360 keeps us always within 360 degs
  // 8 points of the compass, each covering 45degs so when rounding down we get an index out of 8 starting at 0 (0-7)
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

  return directions[index];
}
