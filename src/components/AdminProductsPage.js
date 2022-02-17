import Form from "react-bootstrap/Form";
import TypesFilter from "./TypesFilter.js";
import Button from "react-bootstrap/Button";
import BrandsFilter from "./BrandsFilter.js";
import AdminProduct from "./AdminProduct.js";
import { useNavigate } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import { AuthContext } from "../contexts/AuthContext";
import FormControl from "react-bootstrap/FormControl";
import { useState, useEffect, useContext } from "react";

const AdminProductsPage = () => {
  let navigate = useNavigate();
  const [type, setType] = useState();
  const [error, setError] = useState();
  const [brand, setBrand] = useState();
  const AuthValues = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState();

  useEffect(() => {
    getAllProducts();
  }, []);

  const submitProductName = (e) => {
    setError("");
    setProductName(e.target.value);
    return;
  };

  const onBrandSelect = (e) => {
    setBrand(e.target.value);
    return;
  };

  const onTypeSelect = (e) => {
    setType(e.target.value);
    return;
  };

  const getAllProducts = async () => {
    const res = await fetch("http://localhost:3000/products");
    const product = await res.json();
    setProducts(product);
  };

  const addProduct = async () => {
    if (!AuthValues.token) {
      AuthValues.setToken(null);
      AuthValues.setIsLoggedIn(false);
      navigate("/user/login");
      return;
    }

    if (!productName || !brand || !type) {
      setError("Enter All Product Information");
      return;
    }

    const res = await fetch("http://localhost:3000/admin/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthValues.token}`,
      },
      body: JSON.stringify({
        productName: productName,
        brandId: brand,
        typeId: type,
      }),
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
    }

    window.location.reload(false);
  };

  const productCards = products.map((product) => (
    <AdminProduct
      key={product.id}
      id={product.id}
      name={product.name}
      brand={product.brand}
      type={product.type}
      availability={product.availability}
    ></AdminProduct>
  ));

  const errorMessage = error && <h5 style={{ color: "red" }}>{error}</h5>;

  return (
    <>
      <h1>Products</h1>
      <Form>
        <InputGroup style={{ zIndex: 0 }}>
          <FormControl
            placeholder="Enter New Product Name"
            onChange={submitProductName}
          />
        </InputGroup>
        {errorMessage}
        <BrandsFilter onBrandSelect={onBrandSelect} value={brand} />
        <TypesFilter onTypeSelect={onTypeSelect} value={type} />
        <Button onClick={addProduct}>Add Product</Button>
        {productCards}
      </Form>
    </>
  );
};

export default AdminProductsPage;
