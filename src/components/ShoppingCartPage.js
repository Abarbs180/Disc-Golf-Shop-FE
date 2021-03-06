import LoadingIcon from "./LoadingIcon";
import CartProduct from "./CartProduct";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useState, useEffect, useContext } from "react";

const ShoppingCartPage = () => {
  let navigate = useNavigate();
  const AuthValues = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!AuthValues.token) {
      AuthValues.setIsLoggedIn(false);
      navigate("/user/login");
      return;
    }

    async function viewCart() {
      const res = await fetch("http://localhost:3000/cart", {
        method: "GET",
        headers: { Authorization: `Bearer ${AuthValues.token}` },
      });

      const data = await res.json();

      setIsLoading(false);
      setCartItems(data);
    }
    viewCart();
  }, [AuthValues.token]);

  const cartContents = cartItems.map((product) => (
    <CartProduct
      key={product.product_id}
      id={product.product_id}
      product={product.product}
      brand={product.brand}
      type={product.type}
      quantity={product.quantity}
      setCartItems={setCartItems}
    ></CartProduct>
  ));

  const displayedContents = cartContents.length ? (
    <>
      <h1>Cart</h1>
      {cartContents}
    </>
  ) : (
    <h2 style={{ textAlign: "center" }}>Your Cart is Empty</h2>
  );

  return <>{isLoading ? <LoadingIcon /> : displayedContents}</>;
};

export default ShoppingCartPage;
