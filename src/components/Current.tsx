import { ThreeHourResponse } from '../utils/Types';
import Icon from './Icon';
import styles from './Current.module.css';

interface CurrentProps {
  weatherData: ThreeHourResponse;
}

// Creates an icon using its weather description as alt text
export default function Current({ weatherData }: CurrentProps) {
    const currentTime = weatherData.list[0].dt_txt.slice(11, -3);
    const nowIcon = weatherData.list[0].weather[0].icon;
    const description = `${weatherData.list[0].weather[0].description
      .slice(0, 1)
      .toUpperCase()}${weatherData.list[0].weather[0].description.slice(
      1
    )}`;
  return (
    <div className={styles.todayContainer}>
      <p>{currentTime}</p>
          <Icon icon={nowIcon} description={description} />
    </div>
  );
}