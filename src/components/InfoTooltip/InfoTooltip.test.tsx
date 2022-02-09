import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import InfoTooltip from '.';

const TestElement = () => <div data-testid="test-element" />;

it('adds className when specified', () => {
  const className = 'my-custom-classname';
  const { container } = render(<InfoTooltip className={className} />);

  expect(container.firstChild).toHaveClass(className);
});

it('tooltip show on mouse enter and disappear on mouse leave', async () => {
  render(
    <InfoTooltip>
      <TestElement />
    </InfoTooltip>
  );

  expect(screen.queryByTestId('test-element')).not.toBeInTheDocument();

  fireEvent.mouseEnter(screen.getByTestId('info-icon'));

  await waitFor(() => screen.queryByTestId('tooltip'), { timeout: 1000 });
  expect(screen.queryByTestId('test-element')).toBeInTheDocument();

  fireEvent.mouseLeave(screen.getByTestId('info-icon'));

  const tooltip = await screen.queryByTestId('tooltip');
  await waitFor(() => expect(tooltip).not.toBeInTheDocument(), { timeout: 1000 });
  await waitFor(() => expect(screen.queryByTestId('test-element')).not.toBeInTheDocument(), { timeout: 1000 });
});
