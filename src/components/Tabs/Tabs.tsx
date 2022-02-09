import { FC, useEffect, useState } from 'react';

import useClassNames from 'hooks/useClassNames';
import styles from './Tabs.module.scss';
import Tab, { TabProps } from './Tab';

export type TabsOption = Pick<TabProps, 'id' | 'children' | 'className' | 'disabled'>;

export interface TabsProps {
  options: TabsOption[];
  defaultActive?: string;
  onChange?: (id: string) => unknown;
  className?: string;
  value?: string;
}

const Tabs: FC<TabsProps> = ({ options, defaultActive, onChange, className, value }) => {
  const [activeOption, setActiveOption] = useState<string | null>(defaultActive ?? options[0]?.id ?? null);

  useEffect(() => {
    if (value) {
      setActiveOption(value);
    }
  }, [value]);

  const changeActiveOption = (id: string): void => {
    if (!value) {
      setActiveOption(id);
    }
    onChange?.(id);
  };

  return (
    <div data-testid="tabs" className={useClassNames(styles.tabs, className)}>
      {options.map(({ id, children, className, disabled }) => {
        return (
          <Tab
            key={id}
            id={id}
            active={id === activeOption}
            onChange={changeActiveOption}
            className={className}
            disabled={!!disabled}
          >
            {children}
          </Tab>
        );
      })}
    </div>
  );
};

export default Tabs;
