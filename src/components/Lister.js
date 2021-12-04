import React, { useState } from "react";
import data from "../data";
import { Card, Button } from "react-bootstrap";
import { useProducts } from "../context/productContext";

const Lister = () => {
  // const [products, setProducts] = useState(data);
  const { products, setProducts } = useProducts();
  console.log(products);
  return (
    <div>
      <div className="products">
        {products.map((prod) => {
          return (
            <Card style={{ width: "18rem", marginTop: "1rem" }}>
              <Card.Img
                variant="top"
                src={prod.image}
                style={{ height: "300px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{prod.Name}</Card.Title>
                <Card.Text>
                  {prod.size}-{prod.for}-{prod.Brand}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Lister;
