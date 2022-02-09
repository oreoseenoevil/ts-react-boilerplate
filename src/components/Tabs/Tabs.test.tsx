import { render, fireEvent, screen, getByText } from '@testing-library/react';
import { FC } from 'react';

import Tabs from '.';
import tabStyles from './Tab.module.scss';
import styles from './Tabs.module.scss';

let mockOnChangeFunction: (value: string) => void;

const TestElement: FC<{ id: string }> = ({ children, id }) => <div data-testid={`test_id_${id}`}>{children}</div>;

const options = [
  {
    id: '1',
    children: <TestElement id="1">tab_1</TestElement>
  },
  {
    id: '2',
    children: <TestElement id="2">tab_2</TestElement>
  },
  {
    id: '3',
    children: <TestElement id="3">tab_3</TestElement>
  }
];

beforeEach(() => {
  mockOnChangeFunction = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

it('adds additional className if passed as a prop', () => {
  const className = 'my-test-classname';
  const { container } = render(<Tabs options={options} className={className} />);

  expect(container.firstChild).toHaveClass(className);
  expect(container.firstChild).toHaveClass(styles.tabs);
});

it('adds children correctly', () => {
  render(<Tabs options={options} />);

  expect(screen.queryByTestId('tabs')).toBeVisible();
  expect(screen.queryByTestId('tab_1')).toBeVisible();
  expect(screen.queryByTestId('tab_2')).toBeVisible();
  expect(screen.queryByTestId('tab_3')).toBeVisible();
});

it('default active set correctly', () => {
  render(<Tabs options={options} defaultActive="2" />);

  expect(screen.queryByTestId('tab_2')).toHaveClass(tabStyles.active);
  expect(screen.queryByTestId('tab_1')).not.toHaveClass(tabStyles.active);
  expect(screen.queryByTestId('tab_3')).not.toHaveClass(tabStyles.active);
});

it('on change function called when any tab clicked', () => {
  render(<Tabs options={options} onChange={mockOnChangeFunction} />);

  const tab = screen.getByTestId('tab_1');
  fireEvent.click(tab);

  expect(mockOnChangeFunction).toHaveBeenCalledTimes(1);
});

it('on change function called with correct parameter', () => {
  render(<Tabs options={options} onChange={mockOnChangeFunction} />);

  const tab = screen.getByTestId('tab_1');
  fireEvent.click(tab);
  expect(mockOnChangeFunction).toHaveBeenCalledWith('1');
});

it('first element is active if there is no defaultActive prop', () => {
  render(<Tabs options={options} />);

  expect(screen.queryByTestId('tab_1')).toHaveClass(tabStyles.active);
  expect(screen.queryByTestId('tab_2')).not.toHaveClass(tabStyles.active);
  expect(screen.queryByTestId('tab_3')).not.toHaveClass(tabStyles.active);
});

it('same button is active although it was clicked on another one when value prop is present', () => {
  render(<Tabs options={options} value="3" onChange={mockOnChangeFunction} />);

  expect(screen.queryByTestId('tab_3')).toHaveClass(tabStyles.active);
  expect(screen.queryByTestId('tab_2')).not.toHaveClass(tabStyles.active);
  expect(screen.queryByTestId('tab_1')).not.toHaveClass(tabStyles.active);

  const tab = screen.getByTestId('tab_1');
  fireEvent.click(tab);

  expect(mockOnChangeFunction).toHaveBeenCalledTimes(1);
  expect(mockOnChangeFunction).toHaveBeenCalledWith('1');
  expect(screen.queryByTestId('tab_3')).toHaveClass(tabStyles.active);
  expect(screen.queryByTestId('tab_1')).not.toHaveClass(tabStyles.active);
});

it('renders children for each option', () => {
  const { container } = render(<Tabs options={options} value="3" onChange={mockOnChangeFunction} />);

  expect(getByText(container, /tab_1/).getAttribute('data-testid')).toEqual('test_id_1');
  expect(getByText(container, /tab_2/).getAttribute('data-testid')).toEqual('test_id_2');
  expect(getByText(container, /tab_3/).getAttribute('data-testid')).toEqual('test_id_3');
});
