import { useState, useEffect } from "react";
import useFilter from "../hooks/useFilter.js";
import BrandsFilter from "./BrandsFilter.js";
import TypesFilter from "./TypesFilter.js";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Product from "./Product.js";

// TODO: Fix issue of useEffect not populating productCards before products state initialization does
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [productsFilter, setProductsFilter] = useState("");
  const [brandsFilter, setBrandsFilter] = useState("");
  const [typesFilter, setTypesFilter] = useState("");
  const filteredProducts = useFilter(
    products,
    productsFilter,
    brandsFilter,
    typesFilter
  );

  const submitSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setProductsFilter(e.target.value);
    }

    if (!e.target.value) {
      setProductsFilter("");
    }
    return;
  };

  const onBrandSelect = (e) => {
    setBrandsFilter(e.target.value);
    return;
  };

  const onTypeSelect = (e) => {
    setTypesFilter(e.target.value);
    return;
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/products");
      const product = await res.json();
      setProducts(product);
    }

    fetchData();
  }, []);

  const productCards = filteredProducts.map((product) => (
    <Product
      key={product.id}
      id={product.id}
      name={product.name}
      brand={product.brand}
      type={product.type}
    ></Product>
  ));

  return (
    <>
      <h1>Products</h1>
      <Form>
        <InputGroup style={{ zIndex: 0 }}>
          <FormControl placeholder="Search Products" onKeyDown={submitSearch} />
        </InputGroup>
        <BrandsFilter onBrandSelect={onBrandSelect} value={brandsFilter} />
        <TypesFilter onTypeSelect={onTypeSelect} value={typesFilter} />
        {productCards}
      </Form>
    </>
  );
};

export default ProductsPage;