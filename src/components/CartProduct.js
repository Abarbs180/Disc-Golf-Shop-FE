import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CartProduct = ({ id, product, brand, type, quantity, setCartItems }) => {
  const [newQuantity, setNewQuantity] = useState(quantity);
  const AuthValues = useContext(AuthContext);
  const [error, setError] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    if (!newQuantity) {
      setNewQuantity(quantity);
    } else if (newQuantity != quantity) {
      updateQuantity();
    }
    return;
  }, [newQuantity]);

  async function updateQuantity() {
    if (AuthValues.token) {
      const res = await fetch("http://localhost:3000/cart/updateQuantity", {
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
    } else {
      AuthValues.setToken(null);
      AuthValues.setIsLoggedIn(false);
      navigate("/user/login");
    }
  }

  const handleIncrement = () => {
    if (Number(newQuantity) < 100) {
      setNewQuantity(newQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (newQuantity > 1) {
      setNewQuantity(newQuantity - 1);
    }
  };

  const handleChange = (e) => {
    const isNumberRegex = /^\d+$/;
    if (isNumberRegex.test(e.target.value)) {
      setError("");
      setNewQuantity(Number(e.target.value));
    } else {
      setNewQuantity(quantity);
      setError("Enter a Number");
    }
  };

  async function removeFromCart() {
    if (AuthValues.token) {
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
    } else {
      AuthValues.setToken(null);
      AuthValues.setIsLoggedIn(false);
      navigate("/user/login");
    }
  }

  return (
    <Card style={{ width: "18rem" }} key={id}>
      <Card.Body>
        <Card.Title>{product}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{brand}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{type}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          <div className="form-control-check">
            <h6 style={{ justifyContent: "spaceBetween" }}>QTY: </h6>
            <button type="button" onClick={handleIncrement}>
              +
            </button>
            <input type="text" value={newQuantity} onChange={handleChange} />
            <button type="button" onClick={handleDecrement}>
              -
            </button>
          </div>
          {error && <h5 style={{ color: "red" }}>Enter a Number</h5>}
        </Card.Subtitle>
      </Card.Body>
      <Button onClick={async () => removeFromCart()}>Remove From Cart</Button>
    </Card>
  );
};

export default CartProduct;
