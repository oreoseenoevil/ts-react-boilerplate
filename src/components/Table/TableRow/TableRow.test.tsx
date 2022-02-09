import { render, screen } from '@testing-library/react';
import styles from 'TableData.module.scss';
import TableRow, { TableRowProps } from './TableRow';

const TableWithTestComponent = ({ className, children }: TableRowProps) => (
  <table>
    <tbody>
      <TableRow className={className}>{children}</TableRow>
    </tbody>
  </table>
);

const textExample = 'This is text example';

it('renders child component', () => {
  render(
    <TableWithTestComponent>
      <td>{textExample}</td>
    </TableWithTestComponent>
  );
  const tableData = screen.getByTestId('table-row');

  expect(tableData).toHaveTextContent(textExample);
});

it('has default style', () => {
  render(
    <TableWithTestComponent>
      <td>{textExample}</td>
    </TableWithTestComponent>
  );
  const tableData = screen.getByTestId('table-row');

  expect(tableData).toHaveClass(styles.table_row);
});

it('has passed className', () => {
  const classNameExample = 'example-class';
  render(
    <TableWithTestComponent className={classNameExample}>
      <td>{textExample}</td>
    </TableWithTestComponent>
  );
  const tableData = screen.getByTestId('table-row');

  expect(tableData).toHaveClass(classNameExample);
});
