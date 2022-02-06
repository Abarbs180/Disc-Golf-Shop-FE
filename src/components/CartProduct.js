import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import IncrementDecrementQuantity from "./IncrementDecrementQuantity";

const CartProduct = ({ id, product, brand, type, quantity, setCartItems }) => {
  let navigate = useNavigate();
  const [error, setError] = useState();
  const AuthValues = useContext(AuthContext);
  const [newQuantity, setNewQuantity] = useState(quantity);

  const handleIncrement = () => {
    setError("");
    updateQuantity(newQuantity + 1);
  };

  const handleDecrement = () => {
    setError("");
    updateQuantity(newQuantity - 1);
  };

  const handleChange = (e) => {
    const isWholeNumberRegex = /^[1-9]\d*$/;
    if (isWholeNumberRegex.test(e.target.value)) {
      setError("");
      updateQuantity(Number(e.target.value));
    } else {
      setError("Enter a Nonzero Number");
    }
  };

  async function updateQuantity(newQuantity) {
    if (newQuantity > 100 || newQuantity <= 0) {
      return;
    }

    setNewQuantity(newQuantity);

    if (!AuthValues.token) {
      AuthValues.setToken(null);
      AuthValues.setIsLoggedIn(false);
      navigate("/user/login");
    }

    await fetch("http://localhost:3000/cart/updateQuantity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthValues.token}`,
      },
      body: JSON.stringify({
        productId: id,
        quantity: newQuantity,
      }),
    });
  }

  async function removeFromCart() {
    if (!AuthValues.token) {
      AuthValues.setToken(null);
      AuthValues.setIsLoggedIn(false);
      navigate("/user/login");
      return;
    }

    const res = await fetch("http://localhost:3000/cart/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthValues.token}`,
      },
      body: JSON.stringify({ productId: id }),
    });

    if (res.ok) {
      const res = await fetch("http://localhost:3000/cart", {
        method: "GET",
        headers: { Authorization: `Bearer ${AuthValues.token}` },
      });

      const data = await res.json();

      setCartItems(data);
    }
  }

  const errorMessage = error && <h5 style={{ color: "red" }}>{error}</h5>;

  return (
    <Card style={{ width: "18rem" }} key={id}>
      <Card.Body>
        <Card.Title>{product}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{brand}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{type}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          <IncrementDecrementQuantity
            quantity={newQuantity}
            handleChange={handleChange}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
          {errorMessage}
        </Card.Subtitle>
      </Card.Body>
      <Button onClick={async () => removeFromCart()}>Remove From Cart</Button>
    </Card>
  );
};

export default CartProduct;
