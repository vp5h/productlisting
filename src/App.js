import {
  Container,
  Row,
  Col,
  Nav,
  Card,
  Button,
  Navbar,
} from "react-bootstrap";
// import Lister from "./components/Lister";
import { useState, useEffect } from "react";
import data from "./data";


let sorted = data.sort((a, b) => a.price - b.price);
function App() {
  const defState = { for: "-", size: "-", sortby: "lh", Brands: "all" };
  const [products, setProducts] = useState(sorted);

  const [filters, setFilters] = useState(defState);
  useEffect(() => {
    setProducts(data);

    if (filters.sortby === "lh") {
      setProducts(products.sort((a, b) => b.price - a.price));
    } else if (filters.sortby === "hl") {
      setProducts(products.sort((a, b) => a.price - b.price));
    }

    

    if (
      filters.size === "-" &&
      filters.Brands === "all" &&
      filters.for === "-"
    ) {
      // setFilters({...filters, sortby: "lh"})
      setProducts(sorted);
    } else if (filters.size === "-" && filters.Brands === "all") {
      if (filters.for === "-") {
        setProducts(sorted);
      } else {
        setProducts(sorted.filter((prod) => prod.for === filters.for));
      }
    } else if (filters.Brands === "all" && filters.for === "-") {
      if (filters.size === "-") {
        setProducts(sorted);
      } else {
        setProducts(sorted.filter((prod) => prod.size === filters.size));
      }
    } else if (filters.size === "-" && filters.for === "-") {
      if (filters.Brands === "all") {
        setProducts(sorted);
      } else {
        setProducts(sorted.filter((prod) => prod.Brand === filters.Brands));
      }
    } else if (filters.size === "-") {
      setProducts(
        sorted.filter(
          (prod) => prod.for === filters.for && prod.Brand === filters.Brands
        )
      );
    } else if (filters.for === "-") {
      setProducts(
        sorted.filter(
          (prod) => prod.size === filters.size && prod.Brand === filters.Brands
        )
      );
    } else if (filters.Brands === "all") {
      setProducts(
        sorted.filter(
          (prod) => prod.size === filters.size && prod.for === filters.for
        )
      );
    } else {
      setProducts(
        sorted.filter(
          (prod) =>
            prod.size === filters.size &&
            prod.for === filters.for &&
            prod.Brand === filters.Brands
        )
      );
    }
  }, [filters]);

  function handleReset() {
    setFilters(defState);
    setProducts(data);
  }

  const Sidebar = () => {
    return (
      <div>
        {/* {JSON.stringify(filters)} */}
        <p>Sort By</p>
        <select
          onChange={(e) => setFilters({ ...filters, sortby: e.target.value })}
          value={filters.sortby}
        >
          <option value={"lh"}>Low to high</option>
          <option value={"hl"}>high to low</option>
        </select>
        <br />

        <p>Filters</p>
        <p>Sizes</p>

        <select
          onChange={(e) => setFilters({ ...filters, size: e.target.value })}
          value={filters.size}
        >
          <option>-</option>
          <option>S</option>
          <option>M</option>
          <option>XL</option>
          <option>XXL</option>
        </select>
        <p>Brands</p>
        <select
          onChange={(e) => setFilters({ ...filters, Brands: e.target.value })}
          value={filters.Brands}
        >
          <option>all</option>
          {products.map((prod) => {
            return <option>{prod.Brand}</option>;
          })}
        </select>
        <br />
        <p>For</p>
        <select
          onChange={(e) => setFilters({ ...filters, for: e.target.value })}
          value={filters.for}
        >
          <option>-</option>
          <option>Men</option>
          <option>Women</option>
        </select>
        <br />
        <br />
        <br />
        <br />
        <br />

        <Button onClick={handleReset}>Clear</Button>
      </div>
    );
  };

  const Lister = () => {
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
                  <Button variant="primary">₹ {prod.price}</Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <Navbar
        bg="dark"
        variant="dark"
        activeKey="/home"
        style={{ justifyContent: "center" }}
        // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item>{/* <Nav.Link href="/home">Active</Nav.Link> */}</Nav.Item>
        <Nav.Item>{/* <Nav.Link eventKey="link-1">Link</Nav.Link> */}</Nav.Item>
        <Nav.Item>{/* <Nav.Link eventKey="link-2">Link</Nav.Link> */}</Nav.Item>
        <Nav.Item>
          <Navbar.Brand>Flipkart</Navbar.Brand>
        </Nav.Item>
        {/* <Nav.Item>

            {JSON.stringify(filters)}
          </Nav.Item> */}
      </Navbar>
      <Container>
        <Row>
          <Col sm={2}>{Sidebar()}</Col>
          <Col sm={10}>
            <div>{Lister()}</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
