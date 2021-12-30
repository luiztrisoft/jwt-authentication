import React, {Component} from 'react';
import userService from '../services/user/user.service';

class Admin extends Component {    
    constructor() {
        super();
        this.state = {};
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
              content:
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString()
            });
    
            // if (error.response && error.response.status === 401) {
            //   EventBus.dispatch("logout");
            // }
          }
        );
      }

    render() {   
        return (  
            <div className="p-grid p-fluid">   
                <div className="p-col-12 p-lg-12">        
                    <h1>Admin</h1>
                </div> 
            </div>
        )
    }
}

export default Admin;