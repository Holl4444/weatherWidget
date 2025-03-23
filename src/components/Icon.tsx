import styles from './Icon.module.css';

interface IconProps {
  icon: string;
  description: string;
  id?: string;
}

export default function Icon({ icon, description }: IconProps) {
  return (
    <img
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`} // update
      alt={description}
    />
  );
}
