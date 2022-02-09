import { render, screen } from '@testing-library/react';
import styles from 'TableData.module.scss';
import TableData, { TableDataProps } from './TableData';

const TableWithTestComponent = ({ className, children }: TableDataProps) => (
  <table>
    <tbody>
      <tr>
        <TableData className={className}>{children}</TableData>
      </tr>
    </tbody>
  </table>
);

const text = 'This is an example';

it('renders child component', () => {
  render(<TableWithTestComponent>{text}</TableWithTestComponent>);
  const tableData = screen.getByTestId('table-data');

  expect(tableData).toHaveTextContent(text);
});

it('has default style', () => {
  render(<TableWithTestComponent>{text}</TableWithTestComponent>);
  const tableData = screen.getByTestId('table-data');

  expect(tableData).toHaveClass(styles.table_data);
});

it('has passed className', () => {
  const classNameExample = 'example-class';
  render(<TableWithTestComponent className={classNameExample}>{text}</TableWithTestComponent>);
  const tableData = screen.getByTestId('table-data');

  expect(tableData).toHaveClass(classNameExample);
});
