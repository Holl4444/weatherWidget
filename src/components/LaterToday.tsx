import { useWeather } from '../App';
import Icon from './Icon';
import styles from './LaterToday.module.css'

export default function LaterToday() {
    const { weatherData } = useWeather();
    if (!weatherData) {
        return null;
    }
    return (
        <>
            {/* Loop over the next three update intervals */}
            {weatherData.list.slice(1, 4).map((item, index) => {
                const icon = item.weather[0].icon;
                const weatherInfo: string = `${item.weather[0].description
                    .slice(0, 1)
                    .toUpperCase()}${item.weather[0].description.slice(1)}`;
                const id: string = `update${index}`; //Next index of weatherData.list = 3 hours later
                return (
                    <Icon key={id} id={id} icon={icon} description={weatherInfo} className={styles.later} />
            )
            })}

      </>
    ); 
}