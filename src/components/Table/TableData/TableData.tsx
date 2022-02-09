import { ReactNode } from 'react';
import useClassNames from 'hooks/useClassNames';
import styles from './TableData.module.scss';

export interface TableDataProps {
  children: ReactNode;
  className?: string;
  colSpan?: number;
}

const TableData = ({ children, className, colSpan }: TableDataProps) => (
  <td data-testid="table-data" className={useClassNames(className, styles.table_data)} colSpan={colSpan}>
    {children}
  </td>
);

export default TableData;
