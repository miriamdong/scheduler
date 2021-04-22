import React, { useRef, useState } from "react";
import { Form, Button, Nav, Alert } from "react-bootstrap";
import { useAuth } from "../../hooks/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
	const emailRef = useRef();
	const { resetPassword } = useAuth();
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setMessage("");
			setError("");
			setLoading(true);
			await resetPassword(emailRef.current.value);
			setMessage("Check your inbox for further instructions");
		} catch {
			setError({ error });
		}

		setLoading(false);
	}

	return (
		<>
			<Nav>
				{error && <Alert variant="danger">{error}</Alert>}{" "}
				<Form inline onSubmit={handleSubmit}>
					{message && <Alert variant="success">{message}</Alert>}
					<Form.Group id="email">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" ref={emailRef} required />
					</Form.Group>
					<Button disabled={loading} className="btn" type="submit">
						Reset Password
					</Button>
					<li className="w-100 text-center mt-3" />
					<Link to="/login" className="btn">
						Login
					</Link>
					<Link to="/signup" className="btn">
						Sign Up
					</Link>
				</Form>
			</Nav>
		</>
	);
}
