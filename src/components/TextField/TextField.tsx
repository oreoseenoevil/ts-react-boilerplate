import { ChangeEventHandler } from 'react';
import useClassNames from 'hooks/useClassNames';
import styles from './TextField.module.scss';

interface TextFieldProps {
  name?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  isError?: boolean;
  rows?: number;
  onChange?: (value: string) => unknown;
  className?: string;
}

const TextField = ({ name, value, placeholder, disabled, isError, rows = 4, onChange, className }: TextFieldProps) => {
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div
      className={useClassNames(
        styles.text_field_container,
        disabled && styles.disabled_container,
        isError && styles.error,
        className
      )}
    >
      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextField;
