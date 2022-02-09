import { render, fireEvent, screen } from '@testing-library/react';

import Checkbox from '.';
import styles from './Checkbox.module.scss';

let mockOnChangeFunction: (value: boolean) => unknown;
const TestElement = () => <div data-testid="test-element" />;

beforeEach(() => {
  mockOnChangeFunction = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

it('calls onChange handler with correct parameters when checkbox is checked', () => {
  const { container } = render(<Checkbox checked onChange={mockOnChangeFunction} />);
  const checkbox = container.firstChild;

  fireEvent.click(checkbox!);

  expect(mockOnChangeFunction).toHaveBeenCalledTimes(1);
  expect(mockOnChangeFunction).toHaveBeenCalledWith(false);
});

it('calls onChange handler with correct parameters when checkbox is not checked', () => {
  const { container } = render(<Checkbox onChange={mockOnChangeFunction} />);
  const checkbox = container.firstChild;

  fireEvent.click(checkbox!);

  expect(mockOnChangeFunction).toHaveBeenCalledWith(true);
});

it('calls onChange handler with correct parameter when checkbox is indeterminate', () => {
  const { container } = render(<Checkbox indeterminate onChange={mockOnChangeFunction} />);
  const checkbox = container.firstChild;

  fireEvent.click(checkbox!);

  expect(mockOnChangeFunction).toHaveBeenCalledWith(true);
});

it('calls onChange handler with correct parameter when checkbox is checked, but indeterminate', () => {
  const { container } = render(<Checkbox indeterminate checked onChange={mockOnChangeFunction} />);
  const checkbox = container.firstChild;

  fireEvent.click(checkbox!);

  expect(mockOnChangeFunction).toHaveBeenCalledWith(false);
});

it('adds children correctly', () => {
  render(
    <Checkbox>
      <TestElement />
    </Checkbox>
  );

  expect(screen.queryByTestId('test-element')).toBeVisible();
});

it('passes the name prop to the checkbox input field', () => {
  const name = 'test-name';
  const { container } = render(<Checkbox name={name} />);

  expect(container.querySelector('input')).toHaveAttribute('name', name);
});

it('adds disabled class when disabled prop is true', () => {
  const { container } = render(<Checkbox disabled />);

  expect(container.firstChild).toHaveClass(styles.disabled);
});

it('passes the disabled prop to the checkbox input field', () => {
  const { container } = render(<Checkbox disabled />);

  expect(container.querySelector('input')).toBeDisabled();
});

it('adds error class when error prop is true', () => {
  const { container } = render(<Checkbox isError />);

  expect(container.firstChild).toHaveClass(styles.error);
});

it('adds error and disabled class when error and disabled props are true', () => {
  const { container } = render(<Checkbox isError disabled />);

  expect(container.firstChild).toHaveClass(styles.error);
  expect(container.firstChild).toHaveClass(styles.disabled);
});

it('appends className prop correctly', () => {
  const className = 'test-classname';
  const { container } = render(<Checkbox className={className} />);

  expect(container.firstChild).toHaveClass(className);
});
