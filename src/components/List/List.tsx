import { useClickAway } from 'react-use';
import { Transition } from '@headlessui/react';
import { useState, useRef, ReactNode, useEffect } from 'react';

import useClassNames from 'hooks/useClassNames';

import Dropdown from 'components/Dropdown';
import styles from './List.module.scss';

interface ListProps {
  value: string;
  className?: string;
  children?: ReactNode;
  size?: 'small' | 'regular' | 'large';
  bold?: 'regular' | 'medium' | 'jumbo';
}

const List = ({ value, className, children, size = 'small', bold = 'regular' }: ListProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useClickAway(ref, () => {
    setOpen(false);
  });

  useEffect(() => {
    setOpen(false);
  }, [value]);

  return (
    <div className={useClassNames(styles.list, className)} ref={ref}>
      <Dropdown selected={open} open={open} onClick={() => setOpen(!open)} size={size} bold={bold}>
        {value}
      </Dropdown>
      <Transition
        enter={styles.enter_class}
        enterFrom={styles.enter_from_class}
        enterTo={styles.enter_to_class}
        leave={styles.leave_class}
        leaveFrom={styles.leave_from_class}
        leaveTo={styles.leave_to_class}
        as="div"
        appear
        show={open}
        className={useClassNames(styles.list_items, size === 'large' && styles.list_items_large)}
        data-testid="list-content"
      >
        {children}
      </Transition>
    </div>
  );
};

export default List;
