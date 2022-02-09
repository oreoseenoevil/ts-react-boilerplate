import { render, screen } from '@testing-library/react';

import { IconButton } from '.';
import styles from './IconButton.module.scss';

const TestElement = () => <div data-testid="test-element" />;

it('default button style', () => {
  const { container } = render(<IconButton />);

  expect(container.firstChild).toHaveClass(styles.basic);
  expect(container.firstChild).toHaveClass(styles.primary);
  expect(container.firstChild).toHaveClass(styles.button);
  expect(container.firstChild).toHaveClass(styles.icon_button);
});

it('has rounded class if rounded', () => {
  const { container } = render(<IconButton rounded />);

  expect(container.firstChild).toHaveClass(styles.rounded);
  expect(container.firstChild).toHaveClass(styles.icon_button);
  expect(container.firstChild).toHaveClass(styles.basic);
  expect(container.firstChild).toHaveClass(styles.primary);
  expect(container.firstChild).toHaveClass(styles.button);
});

it('adds additional className if passed as a prop', () => {
  const className = 'my-test-classname';
  const { container } = render(<IconButton className={className} />);

  expect(container.firstChild).toHaveClass(className);
});

it('adds children correctly', () => {
  render(
    <IconButton>
      <TestElement />
    </IconButton>
  );

  expect(screen.queryByTestId('test-element')).toBeVisible();
});
