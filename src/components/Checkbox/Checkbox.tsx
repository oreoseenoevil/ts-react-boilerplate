import useClassNames from 'hooks/useClassNames';
import { ChangeEventHandler, ReactNode, useEffect, useRef } from 'react';

import { FaCheck as Check, FaMinus as Minus } from 'react-icons/fa';

import styles from './Checkbox.module.scss';

interface CheckboxProps {
  id?: string;
  checked?: boolean;
  onChange?: (value: boolean) => unknown;
  className?: string;
  isError?: boolean;
  children?: ReactNode;
  name?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  value?: string;
}

const Checkbox = ({
  id,
  onChange,
  disabled,
  isError,
  className,
  children,
  checked,
  name,
  indeterminate = false,
  value
}: CheckboxProps) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  useEffect(() => {
    // React doesn't support the indeterminate prop
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate, checked]);

  return (
    <label
      htmlFor={id}
      className={useClassNames(
        isError && styles.error,
        disabled && styles.disabled,
        styles.checkbox_container,
        className
      )}
    >
      <input
        id={id}
        name={name}
        type="checkbox"
        ref={checkboxRef}
        disabled={disabled}
        checked={checked}
        onChange={handleChange}
        className={useClassNames(styles.checkbox)}
        value={value}
      />
      <span className={styles.icon_container}>
        <Minus className={useClassNames(styles.minus, styles.icon)} />
        <Check className={useClassNames(styles.check, styles.icon)} />
      </span>
      {children && <span className={styles.label}>{children}</span>}
    </label>
  );
};

export default Checkbox;
