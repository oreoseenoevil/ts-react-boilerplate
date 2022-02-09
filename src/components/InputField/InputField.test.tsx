import { render, screen, fireEvent } from '@testing-library/react';

import InputField from '.';
import styles from './InputField.module.scss';

let mockOnChangeFunction: (value: string) => void;

const DummyIconElement = () => <div data-testid="test-icon-element" />;

beforeEach(() => {
  mockOnChangeFunction = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

it('adds name attribute when passed as  a prop', () => {
  const name = 'my-name';
  const { container } = render(<InputField name={name} />);

  const inputField = container.querySelector('input');
  expect(inputField).toHaveAttribute('name', name);
});

it('adds leading icon element if passed as a prop', () => {
  render(<InputField leadingIcon={<DummyIconElement />} />);
  expect(screen.getByTestId('test-icon-element')).toBeVisible();
});

it('adds trailing icon element if passed as a prop', () => {
  render(<InputField trailingIcon={<DummyIconElement />} />);
  expect(screen.getByTestId('test-icon-element')).toBeVisible();
});

it('does not render icon elements if it is not passed as a prop', () => {
  render(<InputField />);
  expect(screen.queryByTestId('leading-icon')).toBeNull();
  expect(screen.queryByTestId('trailing-icon')).toBeNull();
});

it('adds placeholder when passed as a prop', () => {
  const placeholder = 'my-placeholder';
  const { container } = render(<InputField placeholder={placeholder} />);
  const inputField = container.querySelector('input');
  expect(inputField).toHaveAttribute('placeholder', placeholder);
});

it('adds disabled attribute when passed as a prop', () => {
  const { container } = render(<InputField disabled />);
  const inputField = container.querySelector('input');
  expect(inputField).toBeDisabled();
});

it('does not disable the input field if disabled is false', () => {
  const { container } = render(<InputField />);
  const inputField = container.querySelector('input');
  expect(inputField).toBeEnabled();
});

it('adds a className if passed as a prop', () => {
  const className = 'my-classname';
  const { container } = render(<InputField className={className} />);
  expect(container.firstChild).toHaveClass(className);
});

it('adds disabled className if the input is disabled', () => {
  const { container } = render(<InputField disabled />);
  expect(container.firstChild).toHaveClass(styles.disabled_container);
});

it('adds error className if isError prop is set to true', () => {
  const { container } = render(<InputField isError />);
  expect(container.firstChild).toHaveClass(styles.error);
});

it('adds value attribute when value is set', () => {
  const value = 'my-value';
  const { container } = render(<InputField value={value} />);
  const inputField = container.querySelector('input');
  expect(inputField).toHaveAttribute('value', value);
});

it('adds type attribute when type is set', () => {
  const type = 'number';
  const { container } = render(<InputField type={type} />);
  const inputField = container.querySelector('input');
  expect(inputField).toHaveAttribute('type', type);
});

it('sets type to text if no type is passed', () => {
  const { container } = render(<InputField />);
  const inputField = container.querySelector('input');
  expect(inputField).toHaveAttribute('type', 'text');
});

it('sets className if containerStyle is box', () => {
  const { container } = render(<InputField containerStyle="box" />);
  expect(container.firstChild).toHaveClass(styles.input_field_box_container);
});

it('sets className if containerStyle is line', () => {
  const { container } = render(<InputField containerStyle="line" />);
  expect(container.firstChild).toHaveClass(styles.input_field_line_container);
});

it('sets className to box container if no containerStyle is set', () => {
  const { container } = render(<InputField />);
  expect(container.firstChild).toHaveClass(styles.input_field_box_container);
});

it('calls onChange function handler when input is changed', () => {
  const { container } = render(<InputField onChange={mockOnChangeFunction} />);
  const inputField = container.querySelector('input');
  fireEvent.change(inputField!, { target: { value: '123' } });
  expect(mockOnChangeFunction).toHaveBeenCalledTimes(1);
  expect(mockOnChangeFunction).toHaveBeenCalledWith('123');
});
