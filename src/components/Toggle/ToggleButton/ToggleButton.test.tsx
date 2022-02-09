import { render, fireEvent, screen } from '@testing-library/react';

import ToggleButton from '.';
import styles from './ToggleButton.module.scss';

let mockOnChangeFunction: (value: string) => void;

const TestElement = () => <div data-testid="test-element" />;

beforeEach(() => {
  mockOnChangeFunction = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

it('calls onChange handler when clicked', () => {
  const { container } = render(<ToggleButton id="toggle_button_id" onChange={mockOnChangeFunction} />);
  const button = container.firstChild;
  fireEvent.click(button!);
  expect(mockOnChangeFunction).toHaveBeenCalledTimes(1);
});

it('adds additional className if passed as a prop', () => {
  const className = 'my-test-classname';
  const { container } = render(<ToggleButton id="toggle_button_id" className={className} />);
  expect(container.firstChild).toHaveClass(className);
  expect(container.firstChild).toHaveClass('toggle_button');
});

it('has toggle_button_active class if active', () => {
  const { container } = render(<ToggleButton id="toggle_button_id" active />);
  expect(container.firstChild).toHaveClass(styles.active);
  expect(container.firstChild).toHaveClass('toggle_button');
});

it('does not have toggle_button_active class if not active', () => {
  const { container } = render(<ToggleButton id="toggle_button_id" active={false} />);
  expect(container.firstChild).not.toHaveClass(styles.active);
  expect(container.firstChild).toHaveClass('toggle_button');
});

it('adds children correctly', () => {
  render(
    <ToggleButton id="id">
      <TestElement />
    </ToggleButton>
  );

  expect(screen.queryByTestId('test-element')).toBeVisible();
});
