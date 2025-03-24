// Fetch weather info as though from a real API:
async function apiCall() {
  // Required parameters according to openweatherMap we have (lat, lon, appid). No specific headers.
  const url = `https://europe-west1-amigo-actions.cloudfunctions.net/recruitment-mock-weather-endpoint/forecast?appid=a2ef86c41a&lat=27.987850&lon=86.925026`;
  try {
    const response = await fetch(url);
    // Handle errors like 404 not found
    if (!response.ok) {
      console.log(`Error: `, response.status);
      throw new Error(`Error: `, response.status);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(`Error: `, err);
  }
}

async function weatherMain() {
  try {
    // Access the weather data
    const weatherData = await apiCall();
    console.log(weatherData);

    //Identify parent el and store it - Here we just want the first time this class appears.
    // const parent = document.querySelector('.Gridstyle__Column-sc-sque-1 bToVUj nt-col nt-col-m12 nt-col-t6');
    const parent = document.querySelector('body');
    //create a new article - Weather component is standalone and reuseable
    const weatherInfo = document.createElement('article');
    weatherInfo.id = 'weather';

    const current = document.createElement('div');
    current.id = 'currentWeather';
    const heroTime = document.createElement('div');
    const currentTime = document.createElement('p');
    currentTime.id = 'currentTime';
    currentTime.textContent = weatherData.list[0].dt_txt.slice(
      11,
      -3
    );
    const heroImage = document.createElement('img');
    heroImage.id = 'heroImage';
    const currentIcon = weatherData.list[0].weather[0].icon;
    heroImage.src = `https://openweathermap.org/img/wn/${currentIcon}@2x.png`;
    heroTime.appendChild(currentTime);
    heroTime.appendChild(heroImage);
    current.appendChild(heroTime);

    const extras = document.createElement('div');

    const description = document.createElement('p');
    description.id = `weatherDescription`;
    description.textContent = `${weatherData.list[0].weather[0].description
      .slice(0, 1)
      .toUpperCase()}${weatherData.list[0].weather[0].description.slice(1)}`;
    extras.appendChild(description);

    const currentWindandTemp = document.createElement('div');
    const currentTemp = document.createElement('p');
    currentTemp.id = 'currentTemp';
    const currentTrueTemp = Math.round(weatherData.list[0].main.temp - weatherData.list[0].main.temp_kf);
    currentTemp.textContent = `${currentTrueTemp}°C`;
    const currentWind = document.createElement('div');
    currentWind.id = 'currentWindContainer'
    const arrow = document.createElement('img');
    arrow.src = `https://t4.ftcdn.net/jpg/09/63/70/79/240_F_963707918_eW4e1dMbHoEUaz6YrhREaz67uiS7vnWv.jpg`;
    const currentPointDegs = (weatherData.list[0].wind.deg + 180) % 360; // Wrap around if over 360 degrees
    arrow.setAttribute('style', `rotate: ${currentPointDegs}deg; height: 2rem; width: auto;`)
    const currentWindSpeed = document.createElement('p');
    currentWindSpeed.id = 'currentWindSpeed';
    currentWindSpeed.textContent = `${Math.round(weatherData.list[0].wind.speed)}m/s`;
    currentWind.appendChild(arrow);
    currentWind.appendChild(currentWindSpeed);
    currentWindandTemp.appendChild(currentTemp);
    currentWindandTemp.appendChild(currentWind);
    extras.appendChild(currentWindandTemp);

    const laterToday = document.createElement('div');
    laterToday.id = 'updates';
    for (let i = 1; i < 4; i++) {
      const icon = weatherData.list[i].weather[0].icon;
      const update = document.createElement('img');
      update.id = `update${i}`;
      //Next index of weatherData.list = 3 hours later
      update.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      laterToday.appendChild(update);
    }
    extras.appendChild(laterToday);

    current.appendChild(extras);


    weatherInfo.appendChild(current);

    // Loop to make the correct Number of future days elements
    const weekAhead = document.createElement('div');
    weekAhead.id = 'weekAhead';
    //Showing a night icon would be odd and since the averages come from day time info only add a 6th if we have daytime info for an extra day.
    let len = parseInt(currentTime.textContent) >= 18 ? 5 : 4; // 18 so we have full day info for 6th date day
    let dayTracker = 3;
    for (let i = 1; i <= len; i++) {
      const day = document.createElement('div');
      const date = document.createElement('p');
      const icon = document.createElement('img');
      day.id = `day${i}`;
      icon.id = `icon${i}`;
      icon.alt = `Weather icon for day ${i}`;
      // Find number of updates left in day: (24hours - current time in hours) is hours left in day. Divide by 3 and round down gives number of weatherData.list indexes left in this day -1 for current.
      const daysRemainingUpdates = Math.floor((24 - parseInt(currentTime.textContent)) / 3);
      // this index + 1 = midnight of next day. Another 3 to get to 9am as we dont want to include weather when site shut = 4. dispose of those -1 + 1 and it's back to startIndex + 3 so dayTracker = 3
     // We'll need to access the same start time for the following 4 so add 8
      
      const startIndex = daysRemainingUpdates + dayTracker;
      if (startIndex < 36) {
        
      }
       // Including this start index, loop 4 times, for each daylight node adding the iconName to an array.
      const iconArray = [];
      for (let j = startIndex; j < (startIndex + 4) && j < weatherData.list.length; j++) {
        const icon = weatherData.list[j].weather[0].icon;
        iconArray.push(icon);
        console.log(j, icon);
      }
      // if any of the icons are for (in order of prio) 11d: thunderstorms, 13d: Snow, 09d/ 10d: Rain  and if so use that icon.
      // if not find the most common icon to use or first if tied.
      const iconToUse = getDayIcon(iconArray);
      console.log(iconArray, iconToUse);
      icon.src = `https://openweathermap.org/img/wn/${iconToUse}@2x.png`; 
      date.id = `date${i}`;
      day.appendChild(date);
      day.appendChild(icon);
      weekAhead.appendChild(day);
      dayTracker += 8;
    }
    weatherInfo.appendChild(weekAhead);

    //Create a new child node
    parent.appendChild(weatherInfo);
  } catch (err) {
    console.error('Failed to fetch weather data: ', err);
  }
}


function getDayIcon(iconsArray) {
  //check for empty array
  if (!iconsArray || iconsArray.length === 0) return null;
  // Priority icons in order of importance
  const priorityIcons = ['11d', '13d', '09d', '10d']; // Thunder, Snow, 2 kinds of rain

  // First check for priority icons in order
  for (const priorityIcon of priorityIcons) {
    if (iconsArray.includes(priorityIcon)) {
      return priorityIcon;
    }
  }

  // If no priority icons found, count frequencies and find max
  const iconCounts = {};
  for (const icon of iconsArray) {
    iconCounts[icon] = (iconCounts[icon] || 0) + 1; // || 0 for first count
  }

  // Get the max count
  const maxCount = Math.max(...Object.values(iconCounts)); // Array of all the icon counts values
  // Find the first icon with max count and return the key (icon name)
  const mostFrequentIcon = Object.keys(iconCounts).find(
    (icon) => iconCounts[icon] === maxCount
  );

  return mostFrequentIcon;
}


weatherMain();
