import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

const BrandsFilter = ({ onBrandSelect, value }) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/brands");
      const brand = await res.json();
      setBrands(brand);
    }

    fetchData();
  }, []);

  const brandFilter = brands.map((brand) => (
    <option value={brand.id} key={brand.name}>
      {brand.name}
    </option>
  ));

  return (
    <Form.Select
      onChange={onBrandSelect}
      value={value}
      aria-label="Default select example"
    >
      <option value="">Brands</option>
      {brandFilter}
    </Form.Select>
  );
};

export default BrandsFilter;
