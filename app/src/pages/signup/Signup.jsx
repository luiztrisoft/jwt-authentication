import React, {Component} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import './Signup.css';
import authService from '../../services/auth/auth.service';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

class Signup extends Component {    
    constructor() {
        super();
        this.handleRegister = this.handleRegister.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);        
        this.state = {
            form:{
                usuario: undefined,
                senha: undefined,
                email: undefined
            },
            errors:{}
        };
    }

    handleFormChange(e){
        let target = e.target;        
                
        this.setState({
            form:{
                ...this.state.form,
                [target.name]: target.value
            }
        });
    }
   

    handleRegister(e) {
        e.preventDefault();
    
        const {usuario, email, senha} = this.state.form;
    
        if (usuario && email && senha) {
          authService.register(usuario,email,senha).then(
            response => {                
              swal("Parabéns!", "Usuário salvo com sucesso","success");
            },
            error => {
              const msg =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
             swal("Ops!", msg, "error");
            }
          );
        }else{
            swal("Calma...", "Todos os campos devem ser preenchidos", "warning");
        }
      }

    render() {   
        return (  
            // <form submit={this.handleSubmit()} >
            <div className="p-grid p-fluid container">                   
                <div className="p-col-12 p-lg-3">                                                       
                    <div className="p-grid p-fluid">                         
                        
                        <div className="p-col-12 p-md-12 container">
                            <h1> <i className='fas fa-user-plus'/> Signup</h1>
                        </div>  

                        <div className="p-col-12 p-md-12">
                            <InputText 
                                name='usuario'
                                placeholder="User"
                                value={this.state.form.usuario}
                                onChange={this.handleFormChange}                                
                                />
                        </div> 
                        <div className="p-col-12 p-md-12">
                            <InputText 
                                name='email'
                                placeholder="Email"
                                value={this.state.form.email}
                                onChange={this.handleFormChange}                                
                                />
                        </div> 
                        <div className="p-col-12 p-md-12">
                            <InputText 
                                name='senha'
                                placeholder="Password" 
                                type='password'
                                value={this.state.form.senha}
                                onChange={this.handleFormChange}                                
                                />
                        </div>                        
                        <div className="p-col-12 p-md-12" style={{textAlign:'center'}}>
                            <Button label="Acessar" onClick={this.handleRegister}/>                        
                        </div>

                        <div style={{marginTop: "30px"}} className="p-col-12 p-md-12 container">
                            <Link to={"/login"}>Acesse agora mesmo</Link>
                        </div>  
                    </div>      
                </div>                      
            </div>
            // </form>
        )
    }
}


export default Signup;