import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

const TypesFilter = ({ onTypeSelect, value }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/types");
      const type = await res.json();
      setTypes(type);
    }

    fetchData();
  }, []);

  const typeFilter = types.map((type) => (
    <option value={type.id} key={type.name}>
      {type.name}
    </option>
  ));

  return (
    <Form.Select
      onChange={onTypeSelect}
      value={value}
      aria-label="Default select example"
    >
      <option value="">Types</option>
      {typeFilter}
    </Form.Select>
  );
};

export default TypesFilter;
