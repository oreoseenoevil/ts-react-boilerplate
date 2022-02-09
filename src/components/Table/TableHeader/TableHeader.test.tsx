import { render, screen } from '@testing-library/react';
import styles from 'TableData.module.scss';
import TableHeader, { TableHeaderProps } from './TableHeader';

const TableWithTestComponent = ({ className, children }: TableHeaderProps) => (
  <table>
    <thead>
      <tr>
        <TableHeader className={className}>{children}</TableHeader>
      </tr>
    </thead>
  </table>
);

const text = 'This is an example';

it('renders child component', () => {
  render(<TableWithTestComponent>{text}</TableWithTestComponent>);
  const tableData = screen.getByTestId('table-header');

  expect(tableData).toHaveTextContent(text);
});

it('has default style', () => {
  render(<TableWithTestComponent>{text}</TableWithTestComponent>);
  const tableData = screen.getByTestId('table-header');

  expect(tableData).toHaveClass(styles.table_header);
});

it('has passed className', () => {
  const classNameExample = 'example-class';
  render(<TableWithTestComponent className={classNameExample}>{text}</TableWithTestComponent>);
  const tableData = screen.getByTestId('table-header');

  expect(tableData).toHaveClass(classNameExample);
});
