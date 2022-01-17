import React, {Component} from 'react';
import userService from '../services/user/user.service';
// import EventBus from '../config/EventBus'
import authService from '../services/auth/auth.service';
import Forbidden from './forbidden/Forbidden';

class Admin extends Component {    
    constructor() {
        super();
        this.state = {
          content: undefined,
          forbidden: undefined
        };
    }

    componentDidMount() {
        userService.getAdminBoard().then(
          response => {
            this.setState({
              content: response.data
            });
          },
          error => {
            this.setState({
              forbidden:
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString()
            });
    
            if (error.response && error.response.status === 401) {
              authService.logout()
              this.props.history.push("login") 
              window.location.reload() 
            }
          }
        );
      }

    render(){
      let page = this.state.forbidden ? <Forbidden/> : this.renderPage()
      return page        
    }

    renderPage() {   
        const style = {
          display: 'flex', 
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          backgroundColor: '#772953',
          color: '#fff',
          padding: '50px',
          borderRadius: '10px'
        }
        return (  this.state.content ?
            <div className="p-grid p-fluid" style={style}>   
                <div className="p-col-12 p-lg-12">        
                    <h1>Admin</h1>
                    <p>{this.state.content}</p>
                </div> 
            </div>
            :
            <div>carregando...</div>
        )
    }
}

export default Admin;