import React from "react";
import { Redirect, Route } from "react-router-dom";
import Admin from "./pages/Admin.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Mod from "./pages/Mod.jsx";
import User from "./pages/User.jsx";

const Routes = () => (
	<div className="layout-main">
		<Route exact path="/"  component={Dashboard} />
		<Route exact path="/user"  component={User} />
		<Route exact path="/moderator"  component={Mod} />
		<Route exact path="/admin"  component={Admin} />
		<Route render={() => <Redirect to="/" />} />
	</div>
);
export default Routes;