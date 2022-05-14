import React from "react";
import { Redirect } from "react-router-dom";
import { Switch, Route } from 'react-router-dom';

import Dashboard from './pages/dashboard/Dashboard.jsx'
import NotFound from "./pages/NotFound.jsx";
import User from "./pages/modulos/User.jsx";
import Admin from "./pages/modulos/Admin.jsx";
import Mod from "./pages/modulos/Mod";
import LoggedUser from "./pages/LoggedUser.jsx";

const Routes = () => {
    return(        
        <div className="layout-main">
            <Switch >           
                <Route exact path='/' component={Dashboard}/>
                <Route exact path='/user' component={User}/>
				<Route exact path='/admin' component={Admin}/>
				<Route exact path='/moderator' component={Mod}/>
                <Route exact path='/logged-user' component={LoggedUser}/>
                                
                <Redirect from='/login' to='/'/> 
                <Redirect from='/signup' to='/'/> 
                
                <Route path='/*' component={NotFound} />
            </Switch>
        </div>
    )
 }
 
 export default Routes;