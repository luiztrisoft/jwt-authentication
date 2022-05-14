import React, {Component} from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {Navbar} from './Navbar';
import Sidebar from './Sidebar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '../../styles/layout.scss';
import './App.css';
import authService from '../../services/auth/auth.service';
import Routes from '../../Routes';
import PublicRoutes from '../../PublicRoutes';

import Spinner from 'react-spinkit';
import If from '../If';

class App extends Component {
    constructor() {
        super();
        this.state = {
            layoutMode: 'static',
            // layoutColorMode: 'dark',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,

            modProfile: false,
            adminProfile: false,
            currentUser: undefined
        };

        this.onWrapperClick = this.onWrapperClick.bind(this);
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.onSidebarClick = this.onSidebarClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        // this.createMenu();
    }

    onWrapperClick(event) {
        if (!this.menuClick) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            });
        }

        this.menuClick = false;
    }

    onToggleMenu(event) {
        this.menuClick = true;
        
        if (this.isDesktop()) {
            if (this.state.layoutMode === 'overlay') {
                this.setState({
                    overlayMenuActive: !this.state.overlayMenuActive
                });
            }
            else if (this.state.layoutMode === 'static') {
                this.setState({
                    staticMenuInactive: !this.state.staticMenuInactive
                });
            }
        }
        else {
            const mobileMenuActive = this.state.mobileMenuActive;
            this.setState({
                mobileMenuActive: !mobileMenuActive
            });
        }
       
        event.preventDefault();
    }

    onSidebarClick(event) {
        this.menuClick = true;
    }

    onMenuItemClick(event) {
        if(!event.item.items) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            })
        }
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    componentDidMount(){
        const user = authService.getCurrentUser();

        if (user) {
            this.setState({
              currentUser: user,
              modProfile: user.roles.includes("ROLE_MODERATOR"),
              adminProfile: user.roles.includes("ROLE_ADMIN"),
            });
          }
    }

    logOut(event) {
        authService.logout()
       // this.props.history.push("/login")  
        window.location.reload() 
    }

    renderLoading(){
        return (
            <If test={this.props.loading}>
                <div id="loading" className="spinner-parent">
				   <Spinner
				   	className="custom-spinner-div"
				   	name="ball-spin-fade-loader"
				   	fadeIn="none"
				   	color="lightcyan"
				   />
				</div>
             </If>
        )
    }

    render() {
        const wrapperClass = classNames('layout-wrapper', {
            'layout-overlay': this.state.layoutMode === 'overlay',
            'layout-static': this.state.layoutMode === 'static',
            'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
            'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
            'layout-mobile-sidebar-active': this.state.mobileMenuActive
        });
        
		return(
		    this.state.currentUser ? (                  
                <div>   
                    {this.renderLoading()}

                    <div className={wrapperClass} onClick={this.onWrapperClick}>
                       <Navbar onToggleMenu={this.onToggleMenu} logOut={this.logOut}/>                
                       <Sidebar/>
                       <Routes/>
                    </div>            
                </div>
            ) : 
                <div>   
                   {this.renderLoading()}
                    <PublicRoutes/> 
                </div>
        );
    }
}

const mapStateToProps = (state) => ({
	loading: state.loadReducer.loading
});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
