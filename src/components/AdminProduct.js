import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import UpdateAvailability from "./UpdateAvailability.js";

const AdminProduct = ({ id, name, brand, type, availability }) => {
  let navigate = useNavigate();
  const [error, setError] = useState();
  const AuthValues = useContext(AuthContext);
  const [newAvailability, setNewAvailability] = useState();

  const onUpdateAvailability = (e) => {
    setError("");
    setNewAvailability(e.target.value);
  };

  const updateAvailability = async () => {
    if (!AuthValues.token) {
      AuthValues.setToken(null);
      AuthValues.setIsLoggedIn(false);
      navigate("/user/login");
      return;
    }

    const boolAvailability = newAvailability === "true";

    if (!newAvailability || boolAvailability === availability) {
      setError("Must Set a New Availability");
      return;
    }

    const res = await fetch("http://localhost:3000/admin/updateAvailability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthValues.token}`,
      },
      body: JSON.stringify({
        productName: name,
        availability: boolAvailability,
      }),
    });

    if (res.ok) {
      window.location.reload();
    }
  };

  const availabilityText = availability ? "In Stock" : "Out of Stock";

  return (
    <Card style={{ width: "18rem" }} key={id}>
      <Card.Body>
        <Card.Title>
          {name} ({availabilityText})
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{brand}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{type}</Card.Subtitle>
        <UpdateAvailability
          onUpdateAvailability={onUpdateAvailability}
          value={newAvailability}
        ></UpdateAvailability>
        {error && <h5 style={{ color: "red" }}>{error}</h5>}
        <Button onClick={async () => updateAvailability()}>
          Set Availability
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AdminProduct;
