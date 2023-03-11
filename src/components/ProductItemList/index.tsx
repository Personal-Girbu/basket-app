import { Product } from 'utils/types';
import { ProductItem } from 'components/ProductItem';

interface ProductItemListProps {
  products: Product[];
}

export const ProductItemList = (props: ProductItemListProps) => {
  const { products } = props;

  return (
    <div>
      {products.map((product, index) => (
        <ProductItem key={index} product={product} />
      ))}
    </div>
  );
};
