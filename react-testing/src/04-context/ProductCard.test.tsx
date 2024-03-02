import { describe, expect, test, vi } from 'vitest';
import ProductCard from './ProductCard';
import { Product } from './types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<ProductCard />', () => {
  const product: Product = {
    id: 1,
    title: 'title one',
    description: 'description one',
    price: 100,
  };

  test('renders product details', () => {
    render(<ProductCard {...product} onAddToCart={() => {}} />);

    // expect(container).toMatchInlineSnapshot();

    expect(
      screen.getByRole('heading', { level: 3, name: product.title }),
    ).toBeInTheDocument();

    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(
      screen.getByText(`${product.price}$`, { exact: false }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /add to cart/i }),
    ).toBeInTheDocument();
  });

  test('clicking on add to cart button triggers onAddToCard props', async () => {
    const mockFn = vi.fn();
    render(<ProductCard {...product} onAddToCart={mockFn} />);
    await userEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(mockFn).toBeCalledTimes(1);
  });
});
