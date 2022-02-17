import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate, useLocation } from "react-router-dom";

const ReactivateAccountPage = () => {
  let navigate = useNavigate();
  const { state } = useLocation();
  const [errors, setErrors] = useState("");
  const AuthValues = useContext(AuthContext);
  const [password, setPassword] = useState("");

  const email = state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await res.json();

    if (data.error) {
      setErrors(data.error);
      return;
    }

    await fetch("http://localhost:3000/user/reactivateAccount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
      }),
    });

    AuthValues.setToken(data.token);
    AuthValues.setIsLoggedIn(true);

    navigate("/");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Reactivate Account</h1>
      <h5>
        Your account has been deactivated by the admin due to prolonged
        inactivity, please enter the correct information to reactivate your
        account
      </h5>
      <Form.Group>
        <FloatingLabel controlId="email" label="Email">
          <Form.Control
            value={email}
            placeholder={email}
            type="text"
            disabled
            readOnly
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group>
        <FloatingLabel controlId="password" label="Password">
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </FloatingLabel>
      </Form.Group>
      {errors && (
        <Form.Group>
          <FloatingLabel className="error-msg" controlId="error">
            {errors}
          </FloatingLabel>
        </Form.Group>
      )}
      <Button type="submit">Reactivate Account</Button>
    </Form>
  );
};

export default ReactivateAccountPage;
