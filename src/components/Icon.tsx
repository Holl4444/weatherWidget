interface IconProps {
  icon: string;
  description: string;
  id?: string;
  className?: string;
}

export default function Icon({ icon, description, id, className }: IconProps) {
  return (
    <img
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`} // update
      alt={description}
      id={id}
      className={className}
    />
  );
}
