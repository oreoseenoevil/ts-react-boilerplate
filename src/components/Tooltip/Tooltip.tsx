import { ReactNode } from 'react';
import { Transition } from '@headlessui/react';
import useClassNames from 'hooks/useClassNames';

import styles from './Tooltip.module.scss';

export interface TooltipProps {
  position?: 'bottom' | 'top';
  children?: ReactNode;
  show?: boolean;
  className?: string;
}

const Tooltip = ({ show = false, position = 'top', children, className }: TooltipProps) => {
  const classNames = useClassNames(
    styles.tooltip,
    position === 'top' && styles.top,
    position === 'bottom' && styles.bottom,
    className
  );

  return (
    <Transition
      enter={styles.enter_class}
      enterFrom={styles.enter_from_class}
      enterTo={styles.enter_to_class}
      leave={styles.leave_class}
      leaveFrom={styles.leave_from_class}
      leaveTo={styles.leave_to_class}
      as="div"
      appear
      show={show}
      className={classNames}
    >
      <div className={styles.arrow}>
        <div className={styles.arrow_inside} />
      </div>
      {children}
    </Transition>
  );
};

export default Tooltip;
