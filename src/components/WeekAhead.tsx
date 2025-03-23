import { useWeather } from '../App';
import Icon from './Icon';
import styles from './WeekAhead.module.css';

console.log('Styles object:', styles);

interface WeatherItem {
  icon: string;
  description: string;
  date: string;
}

export default function WeekAhead() {
  const { weatherData } = useWeather();
  if (!weatherData) {
    return null;
  }

  // Loop to make the correct Number of future days elements. Showing a night icon would be odd and since the averages come from day time info only add a 6th if we have daytime info for a whole extra day.
  const currentTime: number = parseInt(
    weatherData.list[0].dt_txt.slice(11, -3)
  );
  let len = currentTime >= 18 ? 5 : 4; // 18:00 so we have full day info for 6th date day
  // Find number of updates left in day: (24hours - current time in hours) is hours left in day. Divide by 3 and round down gives number of weatherData.list indexes left in this day -1 for current.
  const daysRemainingUpdates = Math.floor((24 - currentTime) / 3);
  // this index + 1 = midnight of next day. Another 3 to get to 9am as we dont want to include weather when site shut = 4. Dispose of those -1 + 1 and it's back to startIndex + 3 so dayTracker = 3
  let dayTracker = 3;
  // We'll need to access the same start time for the following 4 so add 8

  let startIndex = daysRemainingUpdates + dayTracker;
  let endDayIndex = startIndex + 4;
  const iconArrayContainer: WeatherItem[][] = []; // an array of string arrays :)

  `${weatherData.list[0].weather[0].description
    .slice(0, 1)
    .toUpperCase()}${weatherData.list[0].weather[0].description.slice(
    1
  )}`;
  // Fill iconArrayContainer with arrays of the all daytime icons from the next few days.
  for (let i = 0; i < len; i++) {
    const weatherItems: WeatherItem[] = [];
    for (
      let j = startIndex;
      j < endDayIndex && j < weatherData.list.length;
      j++
    ) {
      const description = `${weatherData.list[
        j
      ].weather[0].description
        .slice(0, 1)
        .toUpperCase()}${weatherData.list[0].weather[0].description.slice(
        1
      )}`;
      const date = `${weatherData.list[j].dt_txt.slice(0, 10)}`;
      weatherData.list.slice(startIndex, endDayIndex).map((item) => {
        weatherItems.push({
          icon: item.weather[0].icon,
          description: description,
          date: date,
        });
      });
    }
    iconArrayContainer.push(weatherItems);
    startIndex += 8;
    endDayIndex += 8;
  }

  const weekAheadIcons: WeatherItem[] = [];
  for (let array of iconArrayContainer) {
    const averageIcon = getDayIcon(array);
    if (!averageIcon) {
      return null;
    }
    weekAheadIcons.push(averageIcon);
  }
  return (
    <div className={styles.weekDaysContainer}>
      {weekAheadIcons.map((item) => {
        const icon = item.icon;
        const weatherInfo: string = `${item.description
          .slice(0, 1)
          .toUpperCase()}${item.description.slice(1)}`;
        const id: string = `item${item.date}`;
        const dayDate: string = `${id.slice(-2)}`;
        return (
          <div key={id} className={styles.weekDays}>
            <p>{dayDate}</p>
            <Icon
              id={id}
              icon={icon}
              description={weatherInfo}
              className={styles.weekday}
            />
          </div>
        );
      })}
    </div>
  );
}

interface IconCounts {
  [key: string]: number; // it WILL have string keys and number values (as defining empty)
}

function getDayIcon(weatherItems: WeatherItem[]): WeatherItem | null {
  //check for empty array
  if (!weatherItems || weatherItems.length === 0) return null;
  // Priority icons in order of importance
  const priorityIcons = ['11d', '13d', '09d', '10d']; // Thunder, Snow, 2 kinds of rain

  // Check for priority icons in order
  for (const priorityIcon of priorityIcons) {
    const matchingIcon = weatherItems.find(
      (item) => item.icon === priorityIcon
    );
    if (matchingIcon) {
      return matchingIcon;
    }
  }

  // If no priority icons found, count frequencies and find max
  const iconCounts: IconCounts = {};
  for (const item of weatherItems) {
    iconCounts[item.icon] = (iconCounts[item.icon] || 0) + 1; // || 0 Adding zero if not seen before.
  }

  // Get the max count ie most recurring icon
  const maxCount = Math.max(...Object.values(iconCounts)); // Array of all the icon counts values ie {'02d': 1, '01n': 2}
  // Find the first icon with max count and return the key (icon name)
  const mostFrequentIcon = Object.keys(iconCounts).find(
    (icon) => iconCounts[icon] === maxCount
  );
  const averageIconWeatherItem = weatherItems.find(
    (item) => item.icon === mostFrequentIcon // Find the first example of this icon in weatherItems so we can get both icon and description.
  );
  return averageIconWeatherItem || null;
}
