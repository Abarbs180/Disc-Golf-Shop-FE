import Product from "./Product.js";
import Form from "react-bootstrap/Form";
import TypesFilter from "./TypesFilter.js";
import { useState, useEffect } from "react";
import BrandsFilter from "./BrandsFilter.js";
import useFilter from "../hooks/useFilter.js";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [typesFilter, setTypesFilter] = useState("");
  const [brandsFilter, setBrandsFilter] = useState("");
  const [productsFilter, setProductsFilter] = useState("");
  const filteredProducts = useFilter(
    products,
    productsFilter,
    brandsFilter,
    typesFilter
  );

  useEffect(() => {
    getAllProducts();
  }, []);

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

  const getAllProducts = async () => {
    const res = await fetch("http://localhost:3000/products");
    const product = await res.json();
    setProducts(product);
  };

  const productCards = filteredProducts.map(
    (product) =>
      product.availability && (
        <Product
          key={product.id}
          id={product.id}
          name={product.name}
          brand={product.brand}
          type={product.type}
        ></Product>
      )
  );

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
