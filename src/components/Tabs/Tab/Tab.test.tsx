import { render, fireEvent, screen } from '@testing-library/react';

import Tab from '.';
import styles from './Tab.module.scss';

let mockOnChangeFunction: (value: string) => void;

const TestElement = () => <div data-testid="test-element" />;

beforeEach(() => {
  mockOnChangeFunction = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

it('calls onChange handler when clicked', () => {
  const { container } = render(<Tab id="tab_id" onChange={mockOnChangeFunction} />);
  const button = container.firstChild;
  fireEvent.click(button!);
  expect(mockOnChangeFunction).toHaveBeenCalledTimes(1);
});

it('adds additional className if passed as a prop', () => {
  const className = 'my-test-classname';
  const { container } = render(<Tab id="tab_id" className={className} />);
  expect(container.firstChild).toHaveClass(className);
  expect(container.firstChild).toHaveClass('tab');
});

it('has tab_active class if active', () => {
  const { container } = render(<Tab id="tab_id" active />);
  expect(container.firstChild).toHaveClass(styles.active);
  expect(container.firstChild).toHaveClass('tab');
});

it('does not have tab_active class if not active', () => {
  const { container } = render(<Tab id="tab_id" active={false} />);
  expect(container.firstChild).not.toHaveClass(styles.active);
  expect(container.firstChild).toHaveClass('tab');
});

it('adds children correctly', () => {
  render(
    <Tab id="id">
      <TestElement />
    </Tab>
  );

  expect(screen.queryByTestId('test-element')).toBeVisible();
});
