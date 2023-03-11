import { FormEvent, useState } from 'react';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { useBasketProvider } from 'providers/BasketProvider';

export const AddNewProductForm = () => {
  const [newProductTitle, setNewProductTitle] = useState('');
  const { addProduct, isLoading } = useBasketProvider();

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    addProduct(newProductTitle);
  };

  return (
    <>
      <Form onSubmit={onFormSubmit}>
        <InputGroup>
          <Form.Control
            placeholder="Enter name"
            value={newProductTitle}
            onChange={e => {
              setNewProductTitle(e.target.value);
            }}
            required
            data-testid="form-input"
          />
          <Button
            type="submit"
            variant="outline-success"
            disabled={isLoading}
            data-testid="form-submit-button"
          >
            {isLoading ? 'Loading...' : 'Add item'}
            {isLoading && (
              <Spinner
                size="sm"
                className="ms-2"
                animation="border"
                data-testid="loading-icon"
              />
            )}
          </Button>
        </InputGroup>
      </Form>
    </>
  );
};
