import { generateImage } from 'utils/generateImage';
import useLocalStorage from 'hooks/useLocalStorage';
import { createContext, ReactNode, useContext } from 'react';
import { Product } from 'utils/types';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { capitalize } from 'utils/capitalize';

export interface BasketState {
  products: Product[];
  isLoading: boolean;
}

export const initialState: BasketState = {
  products: [],
  isLoading: false,
};

export interface BasketProviderValue {
  products: BasketState['products'];
  isLoading: boolean;
  addProduct: (productTitle: Product['title']) => Promise<void>;
  removeProduct: (productId: Product['id']) => void;
  removeAllProducts: () => void;
}

interface BasketProviderProps {
  children: ReactNode;
}

const BasketContext = createContext<BasketProviderValue>({
  products: [],
  isLoading: false,
  addProduct: () => Promise.resolve(),
  removeProduct: () => {},
  removeAllProducts: () => {},
});

export const BasketProvider = ({ children }: BasketProviderProps) => {
  const [products, setProducts] = useLocalStorage<BasketState['products']>(
    'basketProducts',
    initialState.products
  );
  const [isLoading, setIsLoading] = useState(false);

  const addProduct: BasketProviderValue['addProduct'] =
    async newProductTitle => {
      setIsLoading(true);
      let updatedProducts = products;
      const foundProduct = products.find(
        p => p.title.toLowerCase() === newProductTitle.toLowerCase()
      );
      if (foundProduct) {
        updatedProducts = products.map(product => {
          if (foundProduct.title === product.title) {
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          } else {
            return product;
          }
        });
      } else {
        try {
          const image = await generateImage(newProductTitle);

          updatedProducts = [
            ...products,
            {
              id: `${Date.now()}-${Math.round(Math.random() * 100000)}`,
              title: newProductTitle,
              image,
              quantity: 1,
            },
          ];
          toast.success(`${capitalize(newProductTitle)} added with success!`);
        } catch (e) {
          const err = e as Error;
          if (err.message) {
            toast.error(err.message, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
          }
        }
      }
      setProducts(updatedProducts);
      return setIsLoading(false);
    };

  const removeProduct: BasketProviderValue['removeProduct'] = productId => {
    const filteredProducts = products.filter(product => {
      return product.id !== productId;
    });
    setProducts(filteredProducts);
  };

  const removeAllProducts: BasketProviderValue['removeAllProducts'] = () => {
    setProducts([]);
    toast.warning(`All products were removed!`);
  };

  const contextValue = {
    products,
    isLoading,
    addProduct,
    removeProduct,
    removeAllProducts,
  };

  return (
    <BasketContext.Provider value={contextValue}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasketProvider = () => useContext(BasketContext);
