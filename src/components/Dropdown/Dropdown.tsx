import { ReactNode } from 'react';
import useClassNames from 'hooks/useClassNames';

import { FaCaretDown as CaretDown } from 'react-icons/fa';
import styles from './Dropdown.module.scss';

interface DropdownProps {
  selected?: boolean;
  open?: boolean;
  size?: 'small' | 'regular' | 'large';
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  bold?: 'regular' | 'medium' | 'jumbo';
}

const Dropdown = ({
  selected = false,
  open = false,
  size = 'regular',
  bold = 'regular',
  className,
  children,
  onClick
}: DropdownProps) => {
  const changeActiveOption = (): void => {
    onClick?.();
  };

  return (
    <button
      type="button"
      data-testid="dropdown"
      className={useClassNames(
        styles.dropdown,
        size === 'small' && styles.small,
        size === 'large' && styles.large,
        open && styles.open,
        selected && styles.selected,
        bold === 'regular' && styles.regular_bold,
        bold === 'medium' && styles.medium_bold,
        bold === 'jumbo' && styles.jumbo_bold,
        className
      )}
      onClick={changeActiveOption}
    >
      <div className={useClassNames(styles.children)}>
        {children}
        <CaretDown className={styles.icon} />
      </div>
    </button>
  );
};

export default Dropdown;
