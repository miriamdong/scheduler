import React, { useRef, useState } from "react";
import { Form, Button, Alert, Nav } from "react-bootstrap";
import { useAuth } from "../../hooks/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			history.push("/");
		} catch {
			setError("Failed to log in");
		}

		setLoading(false);
	}

	return (
		<>
			<Nav>
				{error && <Alert variant="danger">{error}</Alert>}
				<Form inline onSubmit={handleSubmit} id="LoginForm">
					<Form.Group id="email">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" ref={emailRef} required />
					</Form.Group>
					<Form.Group id="password">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" ref={passwordRef} required />
					</Form.Group>
					<Button disabled={loading} className="btn" type="submit">
						Log In
					</Button>
				</Form>{" "}
				<Link to="/forgot-password" className="btn">
					Forgot Password?
				</Link>
				<Link to="/signup" className="btn">
					Sign Up
				</Link>{" "}
			</Nav>
		</>
	);
}
