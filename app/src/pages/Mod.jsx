import React, {Component} from 'react';
import authService from '../services/auth/auth.service';
import userService from '../services/user/user.service';
import Forbidden from './forbidden/Forbidden';

class Mod extends Component {    
    constructor() {
        super();
        this.state = {
            content: undefined,
            forbidden: undefined
        };
    }

    componentDidMount() {
        userService.getModeratorBoard().then(
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
            backgroundColor: '#075B8C',
            color: '#fff',
            padding: '50px',
            borderRadius: '10px'
          }

          return (  
              <div className="p-grid p-fluid" style={style}>   
                  <div className="p-col-12 p-lg-12" >        
                      <h1>Moderator</h1>
                      <p>{this.state.content}</p>
                  </div> 
              </div>
          )
      }
}

export default Mod;