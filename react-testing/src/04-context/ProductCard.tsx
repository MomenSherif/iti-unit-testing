import { Product } from './types';

type ProductProps = Product & {
  onAddToCart: () => void;
};

export default function ProductCard({
  title,
  description,
  price,
  onAddToCart,
}: ProductProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div>
        <span>{price}$</span>
        <button onClick={onAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}
