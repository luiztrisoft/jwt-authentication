import React, {Component} from 'react';
import imgFromAsset from '../../assets/img/oficialasset.png'

import './Dashboard.css';
import trisoft from '../../assets/img/logo.png'
import If from '../../components/if/If';
import authService from '../../services/auth/auth.service';

class Dashboard extends Component {    
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
    
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })
      }

    renderImage(){
        return <img src={trisoft} alt="trisoft" width="20px" />
    }
    
    render() {   
        let mostrarLogo = true;
        const { currentUser } = this.state;
        return (  
            <div className="p-grid p-fluid">   

                <If test={mostrarLogo}>
                    <div className="p-col-12 p-lg-12">        
                        <img src={imgFromAsset} style={{ width: '20%', marginTop: '1%', marginLeft: '0%'}} alt="TriSoft"/>                       
                    </div>                
                </If>
                
            <div className="p-col-12 p-lg-6 ">     
                {(this.state.userReady) ?
                <div className='dashboard-container'>                
                <h1>
                    {/* <strong>{currentUser.username}</strong> Profile */}
                    <strong>Usuário: {currentUser.username}</strong>
                </h1>
               
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
                
            </div>
        )
    }
}

export default Dashboard;