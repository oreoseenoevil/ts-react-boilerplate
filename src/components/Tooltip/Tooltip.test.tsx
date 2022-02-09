import { render, screen } from '@testing-library/react';

import Tooltip from '.';
import styles from './Tooltip.module.scss';

it('shows tooltip when show is set to true', () => {
  const { container } = render(<Tooltip show />);
  expect(container.firstChild).toBeVisible();
});

it('does not show tooltip if show is omitted', () => {
  const { container } = render(<Tooltip />);
  expect(container.firstChild).toBeNull();
});

it('adds position top className when position is set to top', () => {
  const { container } = render(<Tooltip position="top" show />);
  expect(container.firstChild).toHaveClass(styles.top);
  expect(container.firstChild).not.toHaveClass(styles.bottom);
});

it('adds position top className when position is not set', () => {
  const { container } = render(<Tooltip show />);
  expect(container.firstChild).toHaveClass(styles.top);
  expect(container.firstChild).not.toHaveClass(styles.bottom);
});

it('adds position bottom className when position is set to bottom', () => {
  const { container } = render(<Tooltip show position="bottom" />);
  expect(container.firstChild).toHaveClass(styles.bottom);
  expect(container.firstChild).not.toHaveClass(styles.top);
});

it('renders children when passed', () => {
  const TestElement = () => <div data-testid="test-element" />;
  render(
    <Tooltip show>
      <TestElement />
    </Tooltip>
  );

  expect(screen.getByTestId('test-element')).toBeVisible();
});

it('adds className when specified', () => {
  const className = 'my-custom-classname';
  const { container } = render(<Tooltip show className={className} />);
  expect(container.firstChild).toHaveClass(className);
});
