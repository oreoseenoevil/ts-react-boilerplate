import { render, screen, fireEvent } from '@testing-library/react';
import styles from 'ListItem.module.scss';
import { ListItem } from '.';

const DummyIconElement = () => <div data-testid="test-icon-element" />;
const text = 'My component title';

let mockOnChangeFunction: (selected: boolean) => void;

beforeEach(() => {
  mockOnChangeFunction = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

it('shows text when passed as a prop', () => {
  const { container } = render(<ListItem text={text} />);

  expect(container.firstChild).toHaveTextContent(text);
});

it('shows check icon when selected passed as a prop', () => {
  render(<ListItem text={text} selected />);
  const iconContainer = screen.getByTestId('icon-container');

  expect(iconContainer).toBeVisible();
});

it('does not show check icon when selected is not passed as a prop', () => {
  render(<ListItem text={text} />);

  expect(screen.queryByTestId('icon-container')).toBeNull();
});

it('changes style when selected passed as prop', () => {
  const { container } = render(<ListItem text={text} selected />);

  expect(container.firstChild).toHaveClass(styles.list_item_selected);
  expect(container.firstChild).not.toHaveClass(styles.list_item_not_selected);
});

it('change style when selected is not passed as prop', () => {
  const { container } = render(<ListItem text={text} />);

  expect(container.firstChild).toHaveClass(styles.list_item_not_selected);
  expect(container.firstChild).not.toHaveClass(styles.list_item_selected);
});

it('adds className prop correctly', () => {
  const className = 'my-component-className';
  const { container } = render(<ListItem text={text} className={className} />);

  expect(container.firstChild).toHaveClass(className);
  expect(container.firstChild).toHaveClass(styles.list_item_not_selected);
  expect(container.firstChild).toHaveClass(styles.list_item_container);
});

it('shows default check icon when iconElement is not passed as prop', () => {
  render(<ListItem text={text} selected />);
  const defaultIcon = screen.getByTestId('icon-container').firstChild;

  expect(defaultIcon).toBeVisible();
});

it('shows check icon when it passed as a prop', () => {
  render(<ListItem text={text} selected iconElement={DummyIconElement()} />);
  const dummyIcon = screen.getByTestId('test-icon-element');
  const container = screen.getByTestId('icon-container');

  expect(container.firstChild).toEqual(dummyIcon);
  expect(dummyIcon).toBeVisible();
});

it('selects item when item is clicked', () => {
  const { container } = render(<ListItem text={text} onSelect={mockOnChangeFunction} />);
  const listItem = container.firstChild;

  fireEvent.click(listItem!);

  expect(mockOnChangeFunction).toHaveBeenCalledTimes(1);
  expect(mockOnChangeFunction).toHaveBeenCalledWith(true);
});
