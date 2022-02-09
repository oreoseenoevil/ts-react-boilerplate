import useClassNames from 'hooks/useClassNames';
import { ReactNode } from 'react';
import styles from './TableHeader.module.scss';

export interface TableHeaderProps {
  children?: ReactNode;
  className?: string;
}

const TableHeader = ({ children, className }: TableHeaderProps) => (
  <th data-testid="table-header" className={useClassNames(className, styles.table_header)}>
    {children}
  </th>
);

export default TableHeader;
