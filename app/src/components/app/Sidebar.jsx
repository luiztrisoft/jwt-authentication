import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types';
import classNames from 'classnames';

import whiteLogo from '../../assets/img/white-logo.png'

class AppSubmenu extends Component {
    static defaultProps = {
        className: null,
        items: null,
        onMenuItemClick: null,
        root: false
    }

    static propTypes = {
        className: PropTypes.string,
        items: PropTypes.array,
        onMenuItemClick: PropTypes.func,
        root: PropTypes.bool
    }
    
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: null
        };
    }
    
    onMenuItemClick(event, item, index) {
        //avoid processing disabled items
        if(item.disabled) {
            event.preventDefault();
            return true;
        }
                        
        //execute command
        if(item.command) {
            item.command({originalEvent: event, item: item});
        }

        if(index === this.state.activeIndex)
            this.setState({activeIndex: null});    
        else
            this.setState({activeIndex: index});

        if(this.props.onMenuItemClick) {
            this.props.onMenuItemClick({
                originalEvent: event,
                item: item
            });
        }
    }

	renderLinkContent(item) {
		let submenuIcon = item.items && <i className="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>;
		let badge = item.badge && <span className="menuitem-badge">{item.badge}</span>;

		return (
			<React.Fragment>
				<i className={item.icon}></i>
				<span>{item.label}</span>
				{submenuIcon}
				{badge}
			</React.Fragment>
		);
	}

	renderLink(item, i) {
		let content = this.renderLinkContent(item);

		if (item.to) {
			return (
				<NavLink activeClassName="active-route" to={item.to} onClick={(e) => this.onMenuItemClick(e, item, i)} exact target={item.target}>
                    {content}
                </NavLink>
			)
		}
		else {
			return (
				<a href={item.url} onClick={(e) => this.onMenuItemClick(e, item, i)} target={item.target}>
					{content}
				</a>
			);

		}
	}
    
    render() {
        let items = this.props.items && this.props.items.map((item, i) => {
            let active = this.state.activeIndex === i;
            let styleClass = classNames(item.badgeStyleClass, {'active-menuitem': active && !item.to});

            return (
                <li className={styleClass} key={i}>
                    {item.items && this.props.root===true && <div className='arrow'></div>}
					{this.renderLink(item, i)}
                    <AppSubmenu items={item.items} onMenuItemClick={this.props.onMenuItemClick}/>
                </li>
            );
        });
        
        return items ? <ul className={this.props.className}>{items}</ul> : null;
    }
}

export class Sidebar extends Component {

    static defaultProps = {
        model: null,
        onMenuItemClick: null
    }

    static propTypes = {
        model: PropTypes.array,
        onMenuItemClick: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            layoutMode: 'static',
            layoutColorMode: 'dark',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false
        };
        this.createMenu();
    }
     
    createMenu() {
        /**
         * 
         * https://www.primefaces.org/diamond/icons.xhtml
         * 
         */
        this.menu = [
            {label: 'Dashboard', icon: 'pi pi-home', command: () => {window.location = '/'}},            
            {
                label: 'Modulos', icon: 'pi pi-users',
                items: [
                    {label: 'User (lv. I)', to: '/user'},
                    {label: 'Moderator (lv. II)', to: '/moderator'},
                    {label: 'Admin (lv. III)', to: '/admin'}
                    
                ]
            } ,
            {label: 'Dados do usuário', icon: 'pi pi-user', to: '/logged-user'}  
        ];
    }

    render() {
        const sidebarClassName = classNames("layout-sidebar", {
            'layout-sidebar-dark': this.state.layoutColorMode === 'dark',
            'layout-sidebar-light': this.state.layoutColorMode === 'light'
        });

        return (
            <div ref={(el) => this.sidebar = el} className={sidebarClassName} onClick={this.onSidebarClick}>
                <div className="layout-logo">
                    <img src={whiteLogo} style={{width: '8em'}} alt="TriSoft" />                    
                </div>
                           
                <div className="layout-menu-container">                    
                    <AppSubmenu items={this.menu} className="layout-menu" onMenuItemClick={this.onMenuItemClick} root={true}/>
                </div>
            </div>
        );
    }
}
export default Sidebar;
