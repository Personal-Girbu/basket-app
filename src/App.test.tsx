import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from 'App';
import { BasketProvider } from 'providers/BasketProvider';

jest.mock('./utils/generateImage', () => ({
  generateImage: jest.fn(searchString => ({
    data: { url: `testurl/${searchString}` },
  })),
}));

describe('Basket', () => {
  it('should add product from form to basket', async () => {
    render(
      <BasketProvider>
        <App />
      </BasketProvider>
    );
    const formInput = screen.getByTestId('form-input');
    const formSubmitButton = screen.getByTestId('form-submit-button');

    fireEvent.change(formInput, { target: { value: 'apple' } });
    fireEvent.click(formSubmitButton);

    await waitFor(() => {
      expect(screen.getByText('apple')).toBeInTheDocument();
    });
  });

  it('should delete product from list when clicking product remove button', async () => {
    render(
      <BasketProvider>
        <App />
      </BasketProvider>
    );
    const formInput = screen.getByTestId('form-input');
    const formSubmitButton = screen.getByTestId('form-submit-button');

    fireEvent.change(formInput, { target: { value: 'apple' } });
    fireEvent.click(formSubmitButton);

    const productRemoveButton = screen.getByTestId('delete-apple');
    fireEvent.click(productRemoveButton);

    await waitFor(() => {
      expect(screen.queryByText('apple')).not.toBeInTheDocument();
    });
  });

  it('should delete all products from list when clicking remove all button', async () => {
    render(
      <BasketProvider>
        <App />
      </BasketProvider>
    );
    const formInput = screen.getByTestId('form-input');
    const formSubmitButton = screen.getByTestId('form-submit-button');

    fireEvent.change(formInput, { target: { value: 'apple' } });
    fireEvent.click(formSubmitButton);

    await waitFor(() => {
      expect(screen.getByText('apple')).toBeInTheDocument();
    });

    fireEvent.change(formInput, { target: { value: 'pear' } });
    fireEvent.click(formSubmitButton);

    await waitFor(() => {
      expect(screen.getByText('pear')).toBeInTheDocument();
    });

    const productRemoveButton = screen.getByTestId('remove-all-button');
    fireEvent.click(productRemoveButton);

    expect(screen.queryByText('apple')).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('pear')).not.toBeInTheDocument();
    });
  });

  it('should increase quantity of a product if already exists', async () => {
    render(
      <BasketProvider>
        <App />
      </BasketProvider>
    );
    const formInput = screen.getByTestId('form-input');
    const formSubmitButton = screen.getByTestId('form-submit-button');

    fireEvent.change(formInput, { target: { value: 'apple' } });
    fireEvent.click(formSubmitButton);

    await waitFor(() => {
      expect(screen.getByTestId('quantity-apple')).toHaveTextContent('1');
    });

    fireEvent.click(formSubmitButton);

    await waitFor(() => {
      expect(screen.getByTestId('quantity-apple')).toHaveTextContent('2');
    });
  });

  it('should show added items after page reload', async () => {
    render(
      <BasketProvider>
        <App />
      </BasketProvider>
    );
    const formInput = screen.getByTestId('form-input');
    const formSubmitButton = screen.getByTestId('form-submit-button');

    fireEvent.change(formInput, { target: { value: 'apple' } });
    fireEvent.click(formSubmitButton);

    await waitFor(() => {
      expect(screen.getByText('apple')).toBeInTheDocument();
    });

    fireEvent.change(formInput, { target: { value: 'pear' } });
    fireEvent.click(formSubmitButton);

    await waitFor(() => {
      expect(screen.getByText('pear')).toBeInTheDocument();
    });

    window.location.reload();

    expect(screen.getByText('apple')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('pear')).toBeInTheDocument();
    });
  });
});
