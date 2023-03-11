import React from 'react';
import './App.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { ProductItemList } from 'components/ProductItemList';
import { useBasketProvider } from 'providers/BasketProvider';
import { AddNewProductForm } from 'components/AddNewProductForm';
import { ToastContainer } from 'react-toastify';

function App() {
  const { products, isLoading, removeAllProducts } = useBasketProvider();

  return (
    <div className="App">
      <h2>Healthy basket</h2>
      <p>Start adding some fruit!</p>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <AddNewProductForm />
            <ProductItemList products={products} />
            {products.length > 0 && (
              <Button
                variant="outline-danger"
                size="lg"
                className="mt-4"
                onClick={removeAllProducts}
                disabled={isLoading}
                data-testid="remove-all-button"
              >
                Remove all
              </Button>
            )}
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default App;
