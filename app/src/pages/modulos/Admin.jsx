import React, {Component} from 'react';

import authService from '../../services/auth/auth.service';
import userService from '../../services/user/user.service';
import Forbidden from '../Forbidden';

import { bindActionCreators } from 'redux';
import {setLoading} from '../../store/actions/LoadAction'

import { connect } from 'react-redux';

class Admin extends Component {    
    constructor() {
        super();
        this.state = {
          content: undefined,
          forbidden: undefined
        };
    }

    componentDidMount() {
      this.props.setLoading(true)
        userService.getAdminBoard().then(
          response => {
            this.setState({
              content: response.data
            });

            this.props.setLoading(false)
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
            this.props.setLoading(false)
          }
        );
      }

    render(){
      let page = this.state.forbidden ? <Forbidden/> : this.renderPage()
      return page              
    }

    renderPage() {   
       //#772953
        return (  
            <div className="col-12" >
                  <div className="alert alert-warning" role="alert">
                  <h1 className='text-black-50'>Admin</h1>
                  {this.state.content}
                  </div>
                </div>
             
        )
    }
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({
			setLoading
		},dispatch
	);

export default connect(null,mapDispatchToProps)(Admin);