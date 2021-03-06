import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const CreateAccountPage = () => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
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

    navigate("/user/verifyAccount");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Create Account</h1>
      <Form.Group>
        <FloatingLabel controlId="full-name" label="Full Name">
          <Form.Control
            type="full-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
        </FloatingLabel>
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
