import { render, fireEvent } from '@testing-library/react';

import TextField from '.';
import styles from './TextField.module.scss';

let mockOnChangeFunction: (value: string) => void;

beforeEach(() => {
  mockOnChangeFunction = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

it('adds name attribute when passed as  a prop', () => {
  const name = 'my-name';
  const { container } = render(<TextField name={name} />);

  const textField = container.querySelector('textarea');
  expect(textField).toHaveAttribute('name', name);
});

it('adds placeholder when passed as a prop', () => {
  const placeholder = 'my-placeholder';
  const { container } = render(<TextField placeholder={placeholder} />);
  const textField = container.querySelector('textarea');
  expect(textField).toHaveAttribute('placeholder', placeholder);
});

it('adds disabled attribute when passed as a prop', () => {
  const { container } = render(<TextField disabled />);
  const textField = container.querySelector('textarea');
  expect(textField).toBeDisabled();
});

it('does not disable the input field if disabled is false', () => {
  const { container } = render(<TextField />);
  const textField = container.querySelector('textarea');
  expect(textField).toBeEnabled();
});

it('adds a className if passed as a prop', () => {
  const className = 'my-classname';
  const { container } = render(<TextField className={className} />);
  expect(container.firstChild).toHaveClass(className);
});

it('adds disabled className if the input is disabled', () => {
  const { container } = render(<TextField disabled />);
  expect(container.firstChild).toHaveClass(styles.disabled_container);
});

it('adds error className if isError prop is set to true', () => {
  const { container } = render(<TextField isError />);
  expect(container.firstChild).toHaveClass(styles.error);
});

it('adds value attribute when value is set', () => {
  const value = 'my-value';
  const { container } = render(<TextField value={value} />);
  const textField = container.querySelector('textarea');
  expect(textField).toHaveValue(value);
});

it('adds rows attribute when rows is set', () => {
  const rows = 8;
  const { container } = render(<TextField rows={rows} />);
  const textField = container.querySelector('textarea');
  expect(textField).toHaveAttribute('rows', `${rows}`);
});

it('calls onChange function handler when input is changed', () => {
  const { container } = render(<TextField onChange={mockOnChangeFunction} />);
  const textField = container.querySelector('textarea');
  fireEvent.change(textField!, { target: { value: '123' } });
  expect(mockOnChangeFunction).toHaveBeenCalledTimes(1);
  expect(mockOnChangeFunction).toHaveBeenCalledWith('123');
});
