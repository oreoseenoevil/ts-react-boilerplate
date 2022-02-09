import { ReactNode } from 'react';
import useClassNames from 'hooks/useClassNames';
import styles from './TableRow.module.scss';

export interface TableRowProps {
  children: ReactNode;
  className?: string;
}

const TableRow = ({ className, children }: TableRowProps) => (
  <tr data-testid="table-row" className={useClassNames(className, styles.table_row)}>
    {children}
  </tr>
);

export default TableRow;
