import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import FloatingLabel from "react-bootstrap/FloatingLabel";

// TODO: Prohibit login if user does not have verified = true

const LoginPage = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const AuthValues = useContext(AuthContext);
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setErrors("");

    const getUser = await fetch("http://localhost:3000/user/getUserActivity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
      }),
    });

    const userData = await getUser.json();

    if (!userData.active) {
      navigate("/user/reactivateAccount", { state: { email: email } });
      return;
    }

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

    AuthValues.setToken(data.token);
    AuthValues.setIsLoggedIn(true);

    navigate("/");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Login</h1>
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
      </Form.Group>
      {errors && (
        <Form.Group>
          <FloatingLabel className="error-msg" controlId="error">
            {errors}
          </FloatingLabel>
        </Form.Group>
      )}
      <Button type="submit">Login</Button>
    </Form>
  );
};

export default LoginPage;
