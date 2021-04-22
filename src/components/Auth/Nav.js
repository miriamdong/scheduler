import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../../hooks/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserProfile from "./UserProfile";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";

function Nav() {
	return (
		<Container fluid="md">
			<Router>
				<AuthProvider>
					<Switch>
						<PrivateRoute exact path="/" component={UserProfile} />
						<PrivateRoute path="/update-profile" component={UpdateProfile} />
						<Route path="/signup" component={Signup} />
						<Route path="/login" component={Login} />
						<Route path="/forgot-password" component={ForgotPassword} />
					</Switch>
				</AuthProvider>
			</Router>
		</Container>
	);
}

export default Nav;
