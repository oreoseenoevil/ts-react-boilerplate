import { FC, useEffect, useState } from 'react';

import useClassNames from 'hooks/useClassNames';
import styles from './Toggle.module.scss';
import ToggleButton, { ToggleButtonProps } from './ToggleButton';

export type ToggleOption = Pick<ToggleButtonProps, 'id' | 'children' | 'className'>;

export interface ToggleProps {
  options: ToggleOption[];
  defaultActive?: string;
  onChange?: (id: string) => unknown;
  className?: string;
  value?: string;
}

const Toggle: FC<ToggleProps> = ({ options, defaultActive, onChange, className, value }) => {
  const [activeOption, setActiveOption] = useState<string | null>(defaultActive ?? options[0]?.id ?? null);
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    if (value) {
      options.forEach((option) => {
        if (value !== option.id) {
          setCounter((counter) => counter + 1);
        }
      });
      if (counter === options.length) {
        setActiveOption(options[0]?.id ?? null);
        onChange?.(options[0]?.id);
      } else {
        setActiveOption(value);
      }
    }

    if (defaultActive) {
      setActiveOption(defaultActive);
    }

    return () => {
      setCounter(0);
    };
  }, [counter, defaultActive, onChange, options, value]);

  const changeActiveOption = (id: string): void => {
    if (!value) {
      setActiveOption(id);
    }
    onChange?.(id);
  };

  return (
    <div data-testid="toggle" className={useClassNames(styles.toggle, className)}>
      {options.map(({ id, children, className }) => {
        return (
          <ToggleButton
            key={id}
            id={id}
            active={id === activeOption}
            onChange={changeActiveOption}
            className={className}
          >
            {children}
          </ToggleButton>
        );
      })}
    </div>
  );
};

export default Toggle;
