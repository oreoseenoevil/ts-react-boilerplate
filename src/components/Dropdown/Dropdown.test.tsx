import { render, screen, fireEvent } from '@testing-library/react';

import Dropdown from '.';
import styles from './Dropdown.module.scss';

const TestElement = () => <div data-testid="test-element" />;

let mockOnClickFunction: () => void;
beforeEach(() => {
  mockOnClickFunction = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

it('adds children correctly', () => {
  render(
    <Dropdown>
      <TestElement />
    </Dropdown>
  );

  expect(screen.queryByTestId('test-element')).toBeVisible();
});

it('has dropdown class', () => {
  const { container } = render(<Dropdown />);
  expect(container.firstChild).toHaveClass(styles.dropdown);
});

it('has small class if size is small', () => {
  const { container } = render(<Dropdown size="small" />);

  expect(container.firstChild).toHaveClass(styles.small);
});

it('has open class if open', () => {
  const { container } = render(<Dropdown open />);

  expect(container.firstChild).toHaveClass(styles.open);
});

it('has selected class if selected', () => {
  const { container } = render(<Dropdown selected />);

  expect(container.firstChild).toHaveClass(styles.selected);
});

it('onClick function called when button clicked', () => {
  render(<Dropdown onClick={mockOnClickFunction} />);

  const dropdown = screen.getByTestId('dropdown');
  fireEvent.click(dropdown);

  expect(mockOnClickFunction).toHaveBeenCalledTimes(1);
});

it('has className if passed as a prop', () => {
  const className = 'my-class-name';
  const { container } = render(<Dropdown className={className} />);

  expect(container.firstChild).toHaveClass(className);
});
