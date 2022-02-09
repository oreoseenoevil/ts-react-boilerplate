import { render, fireEvent, screen, getByText } from '@testing-library/react';
import { FC } from 'react';

import Toggle from '.';
import toggleButtonStyles from './ToggleButton.module.scss';
import styles from './Toggle.module.scss';

let mockOnChangeFunction: (value: string) => void;

const TestElement: FC<{ id: string }> = ({ children, id }) => <div data-testid={`test_id_${id}`}>{children}</div>;

const options = [
  {
    id: '1',
    children: <TestElement id="1">toggle_button_1</TestElement>
  },
  {
    id: '2',
    children: <TestElement id="2">toggle_button_2</TestElement>
  },
  {
    id: '3',
    children: <TestElement id="3">toggle_button_3</TestElement>
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
  const { container } = render(<Toggle options={options} className={className} />);

  expect(container.firstChild).toHaveClass(className);
  expect(container.firstChild).toHaveClass(styles.toggle);
});

it('adds children correctly', () => {
  render(<Toggle options={options} />);

  expect(screen.queryByTestId('toggle')).toBeVisible();
  expect(screen.queryByTestId('toggle_button_1')).toBeVisible();
  expect(screen.queryByTestId('toggle_button_2')).toBeVisible();
  expect(screen.queryByTestId('toggle_button_3')).toBeVisible();
});

it('default active set correctly', () => {
  render(<Toggle options={options} defaultActive="2" />);

  expect(screen.queryByTestId('toggle_button_2')).toHaveClass(toggleButtonStyles.active);
  expect(screen.queryByTestId('toggle_button_1')).not.toHaveClass(toggleButtonStyles.active);
  expect(screen.queryByTestId('toggle_button_3')).not.toHaveClass(toggleButtonStyles.active);
});

it('on change function called when any toggle button clicked', () => {
  render(<Toggle options={options} onChange={mockOnChangeFunction} />);

  const toogleButton = screen.getByTestId('toggle_button_1');
  fireEvent.click(toogleButton);

  expect(mockOnChangeFunction).toHaveBeenCalledTimes(1);
});

it('on change function called with correct parameter', () => {
  render(<Toggle options={options} onChange={mockOnChangeFunction} />);

  const toogleButton = screen.getByTestId('toggle_button_1');
  fireEvent.click(toogleButton);
  expect(mockOnChangeFunction).toHaveBeenCalledWith('1');
});

it('first element is active if there is no defaultActive prop', () => {
  render(<Toggle options={options} />);

  expect(screen.queryByTestId('toggle_button_1')).toHaveClass(toggleButtonStyles.active);
  expect(screen.queryByTestId('toggle_button_2')).not.toHaveClass(toggleButtonStyles.active);
  expect(screen.queryByTestId('toggle_button_3')).not.toHaveClass(toggleButtonStyles.active);
});

it('same button is active although it was clicked on another one when value prop is present', () => {
  render(<Toggle options={options} value="3" onChange={mockOnChangeFunction} />);

  expect(screen.queryByTestId('toggle_button_3')).toHaveClass(toggleButtonStyles.active);
  expect(screen.queryByTestId('toggle_button_2')).not.toHaveClass(toggleButtonStyles.active);
  expect(screen.queryByTestId('toggle_button_1')).not.toHaveClass(toggleButtonStyles.active);

  const toggleButton = screen.getByTestId('toggle_button_1');
  fireEvent.click(toggleButton);

  expect(mockOnChangeFunction).toHaveBeenCalledTimes(1);
  expect(mockOnChangeFunction).toHaveBeenCalledWith('1');
  expect(screen.queryByTestId('toggle_button_3')).toHaveClass(toggleButtonStyles.active);
  expect(screen.queryByTestId('toggle_button_1')).not.toHaveClass(toggleButtonStyles.active);
});

it('renders children for each option', () => {
  const { container } = render(<Toggle options={options} value="3" onChange={mockOnChangeFunction} />);

  expect(getByText(container, /toggle_button_1/).getAttribute('data-testid')).toEqual('test_id_1');
  expect(getByText(container, /toggle_button_2/).getAttribute('data-testid')).toEqual('test_id_2');
  expect(getByText(container, /toggle_button_3/).getAttribute('data-testid')).toEqual('test_id_3');
});
