import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import { useEffect, useContext } from "react";
import LoginPage from "./components/LoginPage";
import { AuthContext } from "./contexts/AuthContext";
import AllUsersPage from "./components/AllUsersPage";
import ProductsPage from "./components/ProductsPage";
import ShoppingCartPage from "./components/ShoppingCartPage";
import checkIsTokenExpired from "./utils/checkIsTokenExpired";
import CreateAccountPage from "./components/CreateAccountPage";
import AdminProductsPage from "./components/AdminProductsPage";
import VerifyAccountPage from "./components/VerifyAccountPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactivateAccountPage from "./components/ReactivateAccountPage";

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
            <Route path="/user/verifyAccount" element={<VerifyAccountPage />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/admin/allUsers" element={<AllUsersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/user/login" element={<LoginPage />} />
            <Route
              path="/user/reactivateAccount"
              element={<ReactivateAccountPage />}
            />
            <Route path="/cart" element={<ShoppingCartPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
