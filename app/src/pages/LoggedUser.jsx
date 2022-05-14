import React, {Component} from 'react';
import If from '../components/If' 
import authService from '../services/auth/auth.service';

import imgFromAsset from '../assets/img/oficialasset.png'
import trisoft from '../assets/img/logo.png'
import Signup from './signup/Signup';

class LoggedUser extends Component {    
    constructor(props) {
        super(props);
    
        this.state = {
          redirect: null,
          userReady: false,
          currentUser: { username: "" }
        };
      }
    
      componentDidMount() {
        const currentUser = authService.getCurrentUser();
    
        if (!currentUser) this.setState({ redirect: "/login" });
        this.setState({ currentUser: currentUser, userReady: true })
      }

    renderImage(){
        return <img src={trisoft} alt="trisoft" width="20px" />
    }
    
    renderLoggedUser() {   
        let mostrarLogo = true;
        const { currentUser } = this.state;

        return (              
            <div>
                <div className='mb-5'>
                <If test={mostrarLogo}>
                    <div>        
                        <img src={imgFromAsset} style={{ width: '20%', marginTop: '1%', marginLeft: '0%'}} alt="TriSoft"/>                       
                    </div>                
                </If>
                </div>
                
            {/* <div className="col-12">      */}
                {(this.state.userReady) ?
                <div  className="alert alert-primary">                
                <label>
                    {/* <strong>{currentUser.username}</strong> Profile */}
                    <strong>Usuário: {currentUser.username}</strong>
                </label>
               
                <p>
                    <strong>Token:</strong>{" "}
                    {currentUser.accessToken.substring(0, 20)} ...{" "}
                    {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                </p>
                <p>
                    <strong>Id:</strong>{" "}{currentUser.id}
                </p>
                <p>
                    <strong>Email:</strong>{" "}{currentUser.email}
                </p>
                <strong>Authorities:</strong>
                <ul>
                {currentUser.roles && currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                </ul>
                </div>: null}
                </div>        
                
            // </div>
        )

    }
    render(){
        let page = !this.state.currentUser ? <Signup/> : this.renderLoggedUser()
        return page              
      }
}

export default LoggedUser;