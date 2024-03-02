import { describe, expect, test } from 'vitest';
import ShoppingCart from './ShoppingCart';
import {
  RenderOptions,
  render as rtlRender,
  screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { RootState, setupStore } from './redux/store';
import userEvent from '@testing-library/user-event';
import { Product } from './types';

// function Wrapper({ children }: { children: React.ReactNode }) {
//   const store = setupStore({
//     cart: {
//       products: [
//         {
//           id: 1,
//           title: 'title one',
//           price: 100,
//           description: 'description one',
//         },
//       ],
//     },
//   });
//   return <Provider store={store}>{children}</Provider>;
// }

// describe('<ShoppingCart />', async () => {
//   test('blabla', async () => {
//     render(<ShoppingCart />, { wrapper: Wrapper });

//     await userEvent.click(
//       screen.getByRole('button', { name: /open shopping cart/i }),
//     );

//     expect(screen.getAllByRole('listitem')).toHaveLength(1);
//     screen.debug();
//   });
// });

// ------------------------------

function render(
  ui: React.ReactElement,
  {
    preloadedState,
    ...renderOptions
  }: { preloadedState?: Partial<RootState> } & Omit<
    RenderOptions,
    'wrapper'
  > = {},
) {
  const store = setupStore(preloadedState);

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

describe('<ShoppingCart />', async () => {
  test('blabla', async () => {
    const products: Product[] = [
      {
        id: 1,
        title: 'title one',
        price: 100,
        description: 'description one',
      },
      {
        id: 2,
        title: 'title two',
        price: 100,
        description: 'description two',
      },
    ];
    render(<ShoppingCart />, { preloadedState: { cart: { products } } });

    await userEvent.click(
      screen.getByRole('button', { name: /open shopping cart/i }),
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(products.length);
    // screen.debug();
  });
});
