import { ReactNode } from 'react';

import useClassNames from 'hooks/useClassNames';
import styles from './Tab.module.scss';

export interface TabProps {
  id: string;
  active?: boolean;
  onChange?: (name: string) => unknown;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
}

const Tab = ({ id, active = false, onChange, children, className, disabled }: TabProps) => {
  return (
    <button
      data-testid={`tab_${id}`}
      type="button"
      onClick={() => onChange?.(id)}
      className={useClassNames(
        styles.tab,
        active && styles.active,
        disabled && styles.disabled,
        'body-small',
        className
      )}
      disabled={!!disabled}
    >
      {children}
    </button>
  );
};

export default Tab;
