import { ReactNode } from 'react';

import useClassNames from 'hooks/useClassNames';
import styles from './ToggleButton.module.scss';

export interface ToggleButtonProps {
  id: string;
  active?: boolean;
  onChange?: (name: string) => unknown;
  className?: string;
  children?: ReactNode;
}

const ToggleButton = ({ id, active = false, onChange, children, className }: ToggleButtonProps) => {
  return (
    <button
      data-testid={`toggle_button_${id}`}
      type="button"
      onClick={() => onChange?.(id)}
      className={useClassNames(styles.toggle_button, active && styles.active, className)}
    >
      {children}
    </button>
  );
};

export default ToggleButton;
