import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const User = ({ id, email, active }) => {
  let navigate = useNavigate();
  const AuthValues = useContext(AuthContext);
  const [isActive, setIsActive] = useState(active);

  const toggleUserActivity = async () => {
    if (!AuthValues.token) {
      AuthValues.setToken(null);
      AuthValues.setIsLoggedIn(false);
      navigate("/user/login");
    }

    await fetch("http://localhost:3000/admin/toggleUserActivity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthValues.token}`,
      },
      body: JSON.stringify({ id: id }),
    });

    setIsActive(!isActive);
  };

  const buttonText = isActive ? "Deactivate User" : "Activate User";

  return (
    <Card style={{ width: "18rem" }} key={id}>
      <Card.Body>
        <Card.Title>User: {id}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{email}</Card.Subtitle>
        <Button onClick={() => toggleUserActivity()}>{buttonText}</Button>
      </Card.Body>
    </Card>
  );
};

export default User;
