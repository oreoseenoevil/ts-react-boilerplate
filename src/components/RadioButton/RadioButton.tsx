import { ChangeEventHandler, ReactNode } from 'react';
import useClassNames from 'hooks/useClassNames';

import styles from './RadioButton.module.scss';

interface RadioButtonProps {
  id?: string;
  checked?: boolean;
  onChange?: (value: boolean) => unknown;
  className?: string;
  isError?: boolean;
  disabled?: boolean;
  value?: string;
  name?: string;
  children?: ReactNode;
}

const Circle = () => (
  <div data-testid="radio-button-circle" className={styles.circle}>
    <div className={styles.circle_inner} />
  </div>
);

const RadioButton = ({
  id,
  checked = false,
  onChange,
  className,
  isError,
  name,
  value,
  disabled,
  children
}: RadioButtonProps) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <label
      className={useClassNames(styles.radio_container, disabled && styles.disabled, isError && styles.error, className)}
      htmlFor={id}
    >
      <input
        id={id}
        name={name}
        value={value}
        type="radio"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={styles.radio}
      />
      <span className={styles.icon_container}>{checked && <Circle />}</span>
      {children && <span className={styles.label}>{children}</span>}
    </label>
  );
};

export default RadioButton;
