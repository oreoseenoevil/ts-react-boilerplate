import useClassNames from 'hooks/useClassNames';
import { FC, MouseEventHandler, useRef } from 'react';

import styles from './SlideToggle.module.scss';

interface SlideToggleProps {
  value?: boolean;
  onChange?: (value: boolean) => unknown;
  rightToLeft?: boolean;
  className?: string;
}

const SlideToggle: FC<SlideToggleProps> = ({ children, value = false, onChange, className, rightToLeft = false }) => {
  const elementRef = useRef<HTMLButtonElement>(null);
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    onChange?.(!value);
    elementRef.current?.blur();
  };

  return (
    <button
      ref={elementRef}
      onClick={handleClick}
      type="button"
      className={useClassNames(
        styles.track,
        rightToLeft && styles.right_to_left,
        value && 'SlideToggle_track_active',
        className
      )}
    >
      <div className={`${styles.thumb} SlideToggle_thumb`}>{children}</div>
    </button>
  );
};

export default SlideToggle;
