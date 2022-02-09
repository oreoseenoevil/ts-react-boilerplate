import { ChangeEventHandler } from 'react';
import useClassNames from 'hooks/useClassNames';
import styles from './InputField.module.scss';

const containerClasses = {
  box: styles.input_field_box_container,
  line: styles.input_field_line_container
};

interface InputFieldProps {
  name?: string;
  placeholder?: string;
  onChange?: (value: string) => unknown;
  disabled?: boolean;
  className?: string;
  isError?: boolean;
  leadingIcon?: JSX.Element;
  trailingIcon?: JSX.Element;
  value?: string;
  containerStyle?: 'line' | 'box';
  type?: 'text' | 'search' | 'number' | 'email' | 'password';
}

const InputField = ({
  name,
  placeholder,
  disabled,
  isError,
  className,
  leadingIcon,
  trailingIcon,
  onChange,
  value,
  containerStyle = 'box',
  type = 'text'
}: InputFieldProps) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div
      className={useClassNames(
        containerClasses[containerStyle],
        disabled && styles.disabled_container,
        isError && styles.error,
        className
      )}
    >
      {leadingIcon && (
        <div data-testid="leading-icon" className={styles.leading_icon} style={{ color: '#786980' }}>
          {leadingIcon}
        </div>
      )}
      <input
        autoComplete="off"
        type={type}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
      {trailingIcon && (
        <div data-testid="trailing-icon" className={styles.trailing_icon}>
          {trailingIcon}
        </div>
      )}
    </div>
  );
};

export default InputField;
