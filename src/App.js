import HomePage from "./components/HomePage";
import ProductsPage from "./components/ProductsPage";
import NavBar from "./components/NavBar";
import CreateAccountPage from "./components/CreateAccountPage";
import LoginPage from "./components/LoginPage";
import ShoppingCartPage from "./components/ShoppingCartPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import checkIsTokenExpired from "./utils/checkIsTokenExpired";

function App() {
  const AuthValues = useContext(AuthContext);

  // Check if token is expired
  useEffect(() => {
    if (!AuthValues.token) {
      return;
    }

    const checkExpiration = setInterval(() => {
      if (AuthValues.token && checkIsTokenExpired(AuthValues.token)) {
        AuthValues.setToken(null);
      }
    }, 5000);

    return function cleanup() {
      clearInterval(checkExpiration);
    };
  }, [AuthValues.token]);

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user/register" element={<CreateAccountPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/user/login" element={<LoginPage />} />
            <Route path="/cart" element={<ShoppingCartPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
