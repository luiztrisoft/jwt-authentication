import React from "react";
import { Redirect, Route } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";

const PublicRoutes = () => (
	<div className="layout-main">        
        <Route path="/signup" exact component={Signup} />	
		<Route path="/login"  exact component={Login} />		
        <Route render={() => <Redirect to="/login" />} />
	</div>
);
export default PublicRoutes;