import React, {Component} from 'react';
import authService from '../services/auth/auth.service';
import userService from '../services/user/user.service';

class User extends Component {    
    constructor() {
        super();
        this.state = {
            content: undefined
        };
    }

    componentDidMount() {
        userService.getUserBoard().then(
          response => {
            this.setState({
              content: response.data
            });
          },
          error => {
            this.setState({
              content:
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

    render() {   //#0f9d58
        const style = {
            display: 'flex', 
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            backgroundColor: '#0F9D58',
            color: '#fff',
            padding: '50px',
            borderRadius: '10px'
        }

        return (  
            <div className="p-grid p-fluid" style={style}>   
                <div className="p-col-12 p-lg-12">        
                    <h1>User</h1>
                    <p>{this.state.content}</p>
                </div> 
            </div>
        )
    }
}

export default User;