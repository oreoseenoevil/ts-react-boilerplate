import useClassNames from 'hooks/useClassNames';
import { FaCheck as CheckIcon } from 'react-icons/fa';
import styles from './ListItem.module.scss';

export interface ListItemProps {
  text: string;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  iconElement?: JSX.Element;
  canToggle?: boolean;
  className?: string;
}

export const ListItem = ({
  text,
  canToggle = true,
  iconElement,
  selected = false,
  onSelect,
  className
}: ListItemProps) => {
  const toggleSelection = () => {
    if (onSelect && canToggle) {
      onSelect(!selected);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleSelection}
      className={useClassNames(
        className,
        styles.list_item_container,
        selected ? styles.list_item_selected : styles.list_item_not_selected
      )}
    >
      <div className={styles.text}>{text}</div>
      {selected && (
        <div data-testid="icon-container" className={styles.icon}>
          {iconElement || <CheckIcon />}
        </div>
      )}
    </button>
  );
};
