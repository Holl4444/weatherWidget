import { useWeather } from '../App';

export default function Wind() {
    const { weatherData, error } = useWeather();
    if (!weatherData || error) return null;
    const windSpeed = Math.round(weatherData.list[0].wind.speed)
    const arrowSrc = `https://t4.ftcdn.net/jpg/09/63/70/79/240_F_963707918_eW4e1dMbHoEUaz6YrhREaz67uiS7vnWv.jpg`;
    const rotation = (weatherData.list[0].wind.deg + 180) % 360;
    const arrowAlt = compass(rotation);

    const arrowStyle = {
        transform: `rotate(${rotation}deg)`,
        width: '2rem',
        height: '2rem',
    }
    
   return (
      <>
        <img
          src={arrowSrc}
          alt={`An arrow showing the wind direction: currently ${arrowAlt}`}
          style={arrowStyle}
            ></img>
            <p>{`${windSpeed}m/s` }</p>
      </>
    );
}

function compass( degrees: number): string {
    const index = Math.floor(((degrees + 22.5) % 360) / 45); // degrees + 22.5 makes 0 center for north instead of starting there by offsetting it (now 337.5 - 22.5deg)
    // Mod 360 keeps us always within 360 degs
    // 8 points of the compass, each covering 45degs so when rounding down we get an index out of 8 starting at 0 (0-7)
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    return directions[index];
}
