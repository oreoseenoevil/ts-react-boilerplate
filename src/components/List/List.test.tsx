import { render, screen, fireEvent } from '@testing-library/react';

import List from '.';

const TestElement = () => <div data-testid="test-element" />;

it('renders className correctly', () => {
  const className = 'my-classname';
  const { container } = render(<List value="My value" className={className} />);
  expect(container.firstChild).toHaveClass(className);
});

it('shows children after being clicked', () => {
  render(
    <List value="My value">
      <TestElement />
    </List>
  );
  expect(screen.queryByTestId('test-element')).toBeNull();

  fireEvent.click(screen.queryByTestId('dropdown')!);
  expect(screen.queryByTestId('test-element')).toBeVisible();
});

it('shows value correctly', () => {
  const value = 'my-value';
  render(<List value={value} />);
  expect(screen.queryByTestId('dropdown')).toHaveTextContent(value);
});
