import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Product } from 'utils/types';
import { useBasketProvider } from 'providers/BasketProvider';
import { capitalize } from 'utils/capitalize';

interface ProductItemProps {
  product: Product;
}

export const ProductItem = ({ product }: ProductItemProps) => {
  const { id, image, title, quantity } = product;
  const { removeProduct, isLoading } = useBasketProvider();

  const removeFromListHandler = () => {
    toast.warning(`${capitalize(title)} was removed!`);
    removeProduct(id);
  };

  return (
    <div className="d-flex align-items-center  mt-4 border p-2">
      <Image src={image} alt={title} height="100" />
      <div className="ms-4 h3 text-capitalize">{title}</div>
      <div className="ms-auto d-flex align-items-center h6 my-0">
        <span
          className="material-symbols-outlined"
          style={{ marginTop: '2px' }}
        >
          close
        </span>
        <span className="h4 my-0 ms-1" data-testid={`quantity-${title}`}>
          {quantity}
        </span>
      </div>
      <Button
        variant="outline-danger"
        size="sm"
        className="d-grid place-items-center ms-4"
        onClick={removeFromListHandler}
        disabled={isLoading}
        data-testid={`delete-${title}`}
      >
        <span className="material-symbols-outlined">delete</span>
      </Button>
    </div>
  );
};
