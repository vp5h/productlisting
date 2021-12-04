import { Container, Row, Col, Nav, Card, Button } from "react-bootstrap";
// import Lister from "./components/Lister";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import data from "./data";
import { filter } from "dom-helpers";
function App() {
  const defState = { for: "all", size: "none", sortby: "lh", Brands: "all" };
  const [products, setProducts] = useState(data);
  const [filters, setFilters] = useState({
    for: "all",
    size: "none",
    sortby: "lh",
    Brands: "all",
  });
  useEffect(() => {

    setProducts(data)
    if (filters.sortby === "hl") {
      setProducts(products.sort((a, b) => a.price - b.price));
    } else if (filters.sortby === "lh") {
      setProducts(products.sort((a, b) => b.price - a.price));
    }

    if (filters.for === "-") {
      setProducts(data);
    } else if (filters.for === "Men") {
      setProducts(products.filter((prod) => prod.for === "Men"));
    } else if (filters.for === "Women") {
      setProducts(products.filter((prod) => prod.for === "Women"));
    }

    if (filters.size === "-") {
      setProducts(data);
    } else if (filters.size === "XL") {
      setProducts(products.filter((prod) => prod.size === "XL"));
    } else if (filters.size === "XXL") {
      setProducts(products.filter((prod) => prod.size === "XXL"));
    } else if (filters.size === "S") {
      setProducts(products.filter((prod) => prod.size === "S"));
    } else if (filters.size === "M") {
      setProducts(products.filter((prod) => prod.size === "M"));
    }


    if(filters.Brands !== "all"){
      setProducts(products.filter((prod)=>(prod.Brand === filters.Brands)))
    }
    
    
  }, [filters]);

  function handleReset() {
    setFilters(defState);
    setProducts(data);
  }

  const Sidebar = () => {
    return (
      <div>
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
      <Container>
        <Nav
          activeKey="/home"
          // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
          <Nav.Item>
            <Nav.Link href="/home">Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">Link</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
              Disabled
            </Nav.Link>
            {JSON.stringify(filters)}
          </Nav.Item>
        </Nav>
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
