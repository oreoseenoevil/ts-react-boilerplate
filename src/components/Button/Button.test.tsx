import { render, screen, fireEvent } from '@testing-library/react';

import Button from '.';
import styles from './Button.module.scss';

const TestElement = () => <div data-testid="test-element" />;
const TestLeadingIconElement = () => <div data-testid="test-leading-icon-element" />;
const TestTrailingIconElement = () => <div data-testid="test-trailing-icon-element" />;

let mockOnClickFunction: () => void;
beforeEach(() => {
  mockOnClickFunction = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

it('default button style', () => {
  const { container } = render(<Button />);

  expect(container.firstChild).toHaveClass(styles.primary);
  expect(container.firstChild).toHaveClass(styles.basic);
  expect(container.firstChild).toHaveClass(styles.button);
});

it('has primary class if color is primary', () => {
  const { container } = render(<Button color="primary" />);

  expect(container.firstChild).toHaveClass(styles.primary);
  expect(container.firstChild).toHaveClass(styles.button);
});

it('has secondary class if color is secondary', () => {
  const { container } = render(<Button color="secondary" />);

  expect(container.firstChild).toHaveClass(styles.secondary);
  expect(container.firstChild).toHaveClass(styles.button);
});

it('has basic class if variant is basic', () => {
  const { container } = render(<Button variant="basic" />);

  expect(container.firstChild).toHaveClass(styles.basic);
  expect(container.firstChild).toHaveClass(styles.button);
});

it('has flat class if variant is flat', () => {
  const { container } = render(<Button variant="flat" />);

  expect(container.firstChild).toHaveClass(styles.flat);
  expect(container.firstChild).toHaveClass(styles.button);
});

it('has stroked class if variant is stroked', () => {
  const { container } = render(<Button variant="stroked" />);

  expect(container.firstChild).toHaveClass(styles.stroked);
  expect(container.firstChild).toHaveClass(styles.button);
});

it('has large class if size is large', () => {
  const { container } = render(<Button size="large" />);

  expect(container.firstChild).toHaveClass(styles.large);
  expect(container.firstChild).toHaveClass(styles.button);
  expect(container.firstChild).toHaveClass(styles.primary);
  expect(container.firstChild).toHaveClass(styles.basic);
});

it('has xlarge class if size is xlarge', () => {
  const { container } = render(<Button size="xlarge" />);

  expect(container.firstChild).toHaveClass(styles.xlarge);
  expect(container.firstChild).toHaveClass(styles.button);
  expect(container.firstChild).toHaveClass(styles.primary);
  expect(container.firstChild).toHaveClass(styles.basic);
});

it('button is disabled', () => {
  const { container } = render(<Button disabled />);

  expect(container.firstChild).toBeDisabled();
});

it('adds children correctly', () => {
  render(
    <Button>
      <TestElement />
    </Button>
  );

  expect(screen.queryByTestId('test-element')).toBeVisible();
});

it('adds leading icon, trailing icon and children correctly', () => {
  const { container } = render(
    <Button leadingIcon={<TestLeadingIconElement />} trailingIcon={<TestTrailingIconElement />}>
      <TestElement />
    </Button>
  );

  expect(screen.queryByTestId('test-leading-icon-element')).toBeVisible();
  expect(screen.queryByTestId('test-element')).toBeVisible();
  expect(screen.queryByTestId('test-trailing-icon-element')).toBeVisible();
  expect(container.firstChild).toHaveClass(styles.button_with_icon);
});

it('onClick function called when button clicked', () => {
  render(<Button onClick={mockOnClickFunction} />);

  const button = screen.getByTestId('button');
  fireEvent.click(button);

  expect(mockOnClickFunction).toHaveBeenCalledTimes(1);
});

it('adds loading className when loading prop is passed', () => {
  const { container } = render(<Button loading />);
  expect(container.firstChild).toHaveClass(styles.loading);
});

it('shows loading icon when loading prop is passed', () => {
  render(<Button loading />);
  expect(screen.getByTestId('loading-icon')).toBeVisible();
});

it('does not show loading icon if loading prop is not passed', () => {
  render(<Button />);
  expect(screen.queryByTestId('loading-icon')).toBeNull();
});

it('does not have loading className if loading is not passed', () => {
  const { container } = render(<Button />);
  expect(container.firstChild).not.toHaveClass(styles.loading);
});
