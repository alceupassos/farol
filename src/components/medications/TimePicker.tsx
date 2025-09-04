
import { useState, useEffect } from 'react';

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const TimePicker = ({ value, onChange, disabled = false }: TimePickerProps) => {
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(':');
      setHours(h);
      setMinutes(m);
    }
  }, [value]);

  const handleHoursChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newHours = e.target.value;
    setHours(newHours);
    onChange(`${newHours}:${minutes}`);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMinutes = e.target.value;
    setMinutes(newMinutes);
    onChange(`${hours}:${newMinutes}`);
  };

  return (
    <div className="flex items-center space-x-1">
      <select
        value={hours}
        onChange={handleHoursChange}
        disabled={disabled}
        className="h-9 w-16 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      >
        {Array.from({ length: 24 }, (_, i) => {
          const hour = i.toString().padStart(2, '0');
          return (
            <option key={hour} value={hour}>
              {hour}
            </option>
          );
        })}
      </select>
      <span className="text-sm">:</span>
      <select
        value={minutes}
        onChange={handleMinutesChange}
        disabled={disabled}
        className="h-9 w-16 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      >
        {Array.from({ length: 60 }, (_, i) => {
          const minute = i.toString().padStart(2, '0');
          return (
            <option key={minute} value={minute}>
              {minute}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default TimePicker;
