import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Product = ({ id, name, brand, type }) => {
  const target = useRef(null);
  let navigate = useNavigate();
  const [error, setError] = useState();
  const AuthValues = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

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
    const isNumberRegex = /^\d+$/;
    if (isNumberRegex.test(e.target.value)) {
      setError("");
      setQuantity(Number(e.target.value));
    } else {
      setError("Enter a Number");
    }
  };

  const addToCart = async () => {
    if (AuthValues.token) {
      if (quantity > 0) {
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
        setAddedToCart(true);
      } else {
        setError("Quantity Cannot be Zero");
        return;
      }
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
          {error && <h5 style={{ color: "red" }}>{error}</h5>}
          <Button ref={target} onClick={async () => await addToCart()}>
            Add to Cart
          </Button>

          <Overlay
            target={target.current}
            show={addedToCart}
            placement="right"
            onEntered={() => setTimeout(() => setAddedToCart(false), 1000)}
          >
            {(props) => (
              <Tooltip id="added-to-cart" {...props}>
                Successfully Added to Cart!
              </Tooltip>
            )}
          </Overlay>
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default Product;
