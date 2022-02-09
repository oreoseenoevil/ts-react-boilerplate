import useClassNames from 'hooks/useClassNames';
import { FC, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

import { FaSpinner as Spinner } from 'react-icons/fa';

import styles from './Button.module.scss';

type ButtonVariant = 'basic' | 'flat' | 'stroked';
type ButtonColor = 'primary' | 'secondary';
type ButtonSize = 'regular' | 'large' | 'xlarge';

const sizeClassNameMap: Record<ButtonSize, string> = {
  large: styles.large,
  xlarge: styles.xlarge,
  regular: styles.regular
};

const colorClassNameMap: Record<ButtonColor, string> = {
  primary: styles.primary,
  secondary: styles.secondary
};

const variantClassNameMap: Record<ButtonVariant, string> = {
  basic: styles.basic,
  flat: styles.flat,
  stroked: styles.stroked
};

interface SharedButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  size?: ButtonSize;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  loading?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
}

interface BasicButtonProps extends SharedButtonProps {
  color?: ButtonColor;
  variant?: Extract<ButtonVariant, 'basic' | 'flat'>;
}

interface StrokedButtonProps extends SharedButtonProps {
  color?: Extract<ButtonColor, 'primary'>;
  variant: Extract<ButtonVariant, 'stroked'>;
}

export type ButtonProps = StrokedButtonProps | BasicButtonProps;

const Button: FC<ButtonProps> = ({
  className,
  type = 'button',
  children,
  leadingIcon = null,
  trailingIcon = null,
  size = 'regular',
  color = 'primary',
  variant = 'basic',
  disabled = false,
  onClick,
  loading = false
}) => {
  return (
    <button
      data-testid="button"
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={useClassNames(
        styles.button,
        variantClassNameMap[variant],
        'font-medium',
        size === 'regular' && 'body-small',
        sizeClassNameMap[size],
        colorClassNameMap[color],
        disabled && styles.disabled,
        (leadingIcon || trailingIcon) && styles.button_with_icon,
        loading && styles.loading,
        className
      )}
    >
      {leadingIcon}
      {loading && (
        <div data-testid="loading-icon" className={styles.loading_icon}>
          <Spinner />
        </div>
      )}
      {children}
      {trailingIcon}
    </button>
  );
};

export { default as IconButton } from './IconButton';
export default Button;
