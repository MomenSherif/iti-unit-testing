import { afterEach, describe, expect, test } from 'vitest';
import {
  act,
  render,
  screen,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

// afterEach(cleanup);

test('Increment counter once to be one | Bad', async () => {
  const { container, debug } = render(<Counter />);
  // console.log(container.innerHTML);
  // debug();

  const incrementButton = container.querySelector(
    '#inc-btn',
  ) as HTMLButtonElement;
  // console.log(incrementButton);

  // incrementButton.click();

  // https://legacy.reactjs.org/docs/testing-recipes.html#act
  act(() => {
    incrementButton.click();
  });

  // await new Promise(res => setTimeout(res, 0));

  // debug();

  expect(container.querySelector('p')?.textContent).toBe('Counter 1');
});

test('Increment counter once to be one | Good', async () => {
  render(<Counter />);
  const incrementBtn = screen.getByRole('button', { name: /increment/i });
  //fireEvent
  await userEvent.click(incrementBtn);
  expect(screen.getByText(/counter 1/i)).toBeInTheDocument();
});

describe('<Counter />', () => {
  test('renders counter with initial value 0', () => {
    render(<Counter />);
    expect(screen.getByText(/counter 0/i)).toBeInTheDocument();
  });

  test('click increment button increments counter by one', async () => {
    render(<Counter />);
    await userEvent.click(screen.getByRole('button', { name: /increment/i }));
    expect(screen.getByText(/counter 1/i)).toBeInTheDocument();
  });

  test('click decrement button decrements counter by one', async () => {
    render(<Counter />);
    await userEvent.click(screen.getByRole('button', { name: /decrement/i }));
    expect(screen.getByText(/counter -1/i)).toBeInTheDocument();
  });
});
