import { render, screen, fireEvent } from '@testing-library/react';
import RadioButton from '.';

import styles from './RadioButton.module.scss';

let mockOnChangeFunction: (value: boolean) => unknown;
const TestElement = () => <div data-testid="test-element" />;

beforeEach(() => {
  mockOnChangeFunction = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

it('renders children correctly', () => {
  render(
    <RadioButton>
      <TestElement />
    </RadioButton>
  );
  expect(screen.getByTestId('test-element')).toBeVisible();
});

it('adds className correctly', () => {
  const className = 'my-classname';
  const { container } = render(<RadioButton className={className} />);
  expect(container.firstChild).toHaveClass(className);
});

it('adds disabled class if radio button is disabled', () => {
  const { container } = render(<RadioButton disabled />);
  expect(container.firstChild).toHaveClass(styles.disabled);
});

it('disables the input if radio button is disabled', () => {
  const { container } = render(<RadioButton disabled />);
  expect(container.querySelector('input')).toBeDisabled();
});

it('adds error class if isError is set', () => {
  const { container } = render(<RadioButton isError />);
  expect(container.firstChild).toHaveClass(styles.error);
});

it('adds checked attribute if the radio button is checked', () => {
  const { container } = render(<RadioButton checked />);
  expect(container.querySelector('input')).toBeChecked();
});

it('does not add checked attribute if radio button is not checked', () => {
  const { container } = render(<RadioButton />);
  expect(container.querySelector('input')).not.toBeChecked();
});

it('fires the handler function when checked', () => {
  const { container } = render(<RadioButton onChange={mockOnChangeFunction} />);
  fireEvent.click(container.querySelector('input')!);
  expect(mockOnChangeFunction).toHaveBeenCalledTimes(1);
  expect(mockOnChangeFunction).toHaveBeenCalledWith(true);
});

it('renders the radio button circle if it is checked', () => {
  render(<RadioButton checked />);
  expect(screen.getByTestId('radio-button-circle')).toBeVisible();
});

it('does not render radio button circle if it is not checked', () => {
  render(<RadioButton />);
  expect(screen.queryByTestId('radio-button-circle')).toBeNull();
});

it('passes id on label and input correctly', () => {
  const id = 'my-id';
  const { container } = render(<RadioButton id={id} />);
  expect(container.firstChild).toHaveAttribute('for', id);
  expect(container.querySelector('input')).toHaveAttribute('id', id);
});

it('passes name attribute correctly to the input', () => {
  const name = 'my-name';
  const { container } = render(<RadioButton name={name} />);
  expect(container.querySelector('input')).toHaveAttribute('name', name);
});

it('passes value attribute correctly to the input', () => {
  const value = 'my-value';
  const { container } = render(<RadioButton value={value} />);
  expect(container.querySelector('input')).toHaveAttribute('value', value);
});
