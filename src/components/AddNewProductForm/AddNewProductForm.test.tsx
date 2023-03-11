import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AddNewProductForm } from './index';
import * as useBasketProvider from 'providers/BasketProvider';

const mockAddProduct = jest.fn();
const defaultBasketProviderImplementation: useBasketProvider.BasketProviderValue =
  {
    isLoading: false,
    products: [],
    removeAllProducts: jest.fn(),
    removeProduct: jest.fn(),
    addProduct: mockAddProduct,
  };

describe('Add new product form', () => {
  it('should submit with input filled string', async () => {
    jest
      .spyOn(useBasketProvider, 'useBasketProvider')
      .mockImplementation(() => defaultBasketProviderImplementation);
    render(<AddNewProductForm />);
    const formInput = screen.getByTestId('form-input');
    const formSubmitButton = screen.getByTestId('form-submit-button');

    fireEvent.change(formInput, { target: { value: 'apple' } });
    expect(formInput).toHaveValue('apple');

    fireEvent.click(formSubmitButton);
    expect(mockAddProduct).toHaveBeenCalledWith('apple');

    await waitFor(() => {
      expect(screen.queryByTestId('loading-icon')).not.toBeInTheDocument();
    });
  });

  it('should disable button while waiting for submit response', async () => {
    jest
      .spyOn(useBasketProvider, 'useBasketProvider')
      .mockImplementation(() => ({
        ...defaultBasketProviderImplementation,
        isLoading: true,
      }));
    render(<AddNewProductForm />);
    const formSubmitButton = screen.getByTestId('form-submit-button');
    expect(formSubmitButton).toBeDisabled();
  });

  it('should show error when field is empty', async () => {
    jest
      .spyOn(useBasketProvider, 'useBasketProvider')
      .mockImplementation(() => defaultBasketProviderImplementation);
    render(<AddNewProductForm />);
    const formInput = screen.getByTestId('form-input');
    const formSubmitButton = screen.getByTestId('form-submit-button');

    fireEvent.click(formSubmitButton);
    expect(formInput).toBeInvalid();

    await waitFor(() => {
      expect(screen.queryByTestId('loading-icon')).not.toBeInTheDocument();
    });
  });
});
