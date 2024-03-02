import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import FavoriteNumber from './FavoriteNumber';
import randomMock from '../utils/random';

// vi.mock('../utils/random.ts', () => ({
//   default: vi.fn(() => 0),
// }));
vi.mock('../utils/random.ts');

describe('<FavoriteNumber />', () => {
  test('renders favorite number input & random button', () => {
    render(<FavoriteNumber />);

    expect(screen.getByLabelText(/favorite number/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /random/i })).toBeInTheDocument();
  });

  test('renders favorite number to screen with changed input value', async () => {
    render(<FavoriteNumber />);

    expect(
      screen.getByText(/your favorite number is \.+/i),
    ).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText(/favorite number/i), '3');
    // await fireEvent.change(screen.getByLabelText(/favorite number/i), {
    //   target: { value: '3' },
    // });

    expect(screen.getByText(/your favorite number is 3/i)).toBeInTheDocument();
  });

  test('renders alert if favorite number if bigger than the maximum number', async () => {
    render(<FavoriteNumber max={20} />);
    await userEvent.type(screen.getByLabelText(/favorite number/i), '21');
    expect(screen.getByRole('alert')).toHaveTextContent(
      /please enter a number between \d & 20/i,
    );
  });

  test('renders alert if favorite number if less than the minimum number', async () => {
    render(<FavoriteNumber min={5} />);
    await userEvent.type(screen.getByLabelText(/favorite number/i), '4');
    expect(screen.getByRole('alert')).toHaveTextContent(
      /please enter a number between 5 & \d/i,
    );
  });

  test('can rerender with new min & max value as prop', async () => {
    const { rerender } = render(<FavoriteNumber />);
    await userEvent.type(screen.getByLabelText(/favorite number/i), '15');
    expect(screen.getByRole('alert')).toBeInTheDocument();

    rerender(<FavoriteNumber max={30} />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    rerender(<FavoriteNumber min={20} max={30} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('click random button generates favorite number between min and max', async () => {
    const min = 10;
    const max = 100;

    vi.mocked(randomMock).mockReturnValueOnce(max);
    render(<FavoriteNumber min={min} max={max} />);

    await userEvent.click(screen.getByRole('button', { name: /random/i }));
    expect(vi.mocked(randomMock)).toBeCalledTimes(1);
    expect(vi.mocked(randomMock)).toBeCalledWith(min, max);

    expect(
      screen.getByText(`your favorite number is ${max}`, { exact: false }),
    ).toBeInTheDocument();
  });
});
