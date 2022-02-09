import { ListItem, ListItemProps } from 'components/ListItem';
import styles from './List.module.scss';

const ListOption = ({ text, onSelect, selected }: ListItemProps) => {
  return <ListItem selected={selected} text={text} className={styles.list_item} onSelect={onSelect} />;
};

export default ListOption;
