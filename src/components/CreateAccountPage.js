import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateAccountPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");
  const AuthValues = useContext(AuthContext);
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }),
    });

    const data = await res.json();

    if (data.error) {
      setErrors(data.error);
      return;
    }

    const loginRes = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const loginData = await loginRes.json();

    AuthValues.setToken(loginData);
    AuthValues.setIsLoggedIn(true);

    navigate("/");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Create Account</h1>
      <Form.Group>
        <FloatingLabel controlId="email" label="Email">
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
        <FloatingLabel controlId="confirm-password" label="Confirm Password">
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
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
      <Button type="submit">Create Account</Button>
    </Form>
  );
};

export default CreateAccountPage;
