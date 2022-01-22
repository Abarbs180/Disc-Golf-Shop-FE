import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Product = ({ id, name, brand, type }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [err, setErr] = useState();
  const AuthValues = useContext(AuthContext);
  let navigate = useNavigate();

  const handleIncrement = () => {
    if (Number(quantity) < 100) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (Number(quantity) > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleChange = (e) => {
    if (/^\d+$/.test(e.target.value) || e.target.value === "") {
      setErr("");
      setQuantity(Number(e.target.value));
    } else {
      setErr("Enter a Number");
    }
  };

  const addToCart = async () => {
    if (AuthValues.token) {
      setErr("");
      setAddedToCart(false);
      const res = await fetch("http://localhost:3000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthValues.token}`,
        },
        body: JSON.stringify({
          productId: id,
          quantity: quantity,
        }),
      });
    } else {
      AuthValues.setToken(null);
      AuthValues.setIsLoggedIn(false);
      navigate("/user/login");
    }
  };

  return (
    <Card style={{ width: "18rem" }} key={id}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{brand}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          {type}
          <div className="form-control-check">
            <button type="button" onClick={handleIncrement}>
              +
            </button>
            <input type="text" value={quantity} onChange={handleChange} />
            <button type="button" onClick={handleDecrement}>
              -
            </button>
          </div>
          {err && <h5 style={{ color: "red" }}>{err}</h5>}
          <Button onClick={async () => await addToCart()}>Add to Cart</Button>
          {addedToCart && (
            <h5 style={{ color: "green" }}>Successfully Added to Your Cart!</h5>
          )}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default Product;
