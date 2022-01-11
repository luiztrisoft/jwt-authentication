import React, {Component, Fragment} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import './Login.css';
import authService from '../../services/auth/auth.service';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import Load from '../../components/load/Load';

class Login extends Component {    
    constructor() {
        super();
        this.handleFormChange = this.handleFormChange.bind(this);        
        this.state = {
            form:{
                usuario: undefined,
                senha: undefined
            },
            errors:{},
            loading: false
        };
    }

    loading(status){
        this.setState({
            loading: status
        })
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

    handleSubmit = (e) =>{
        e.preventDefault();
        const {usuario, senha} = this.state.form;
        
        if(usuario && senha){
          this.loading(true);
          authService.login(usuario, senha).then(
              ()=>{                  
                  this.props.history.push("/form")
                  window.location.reload()
                  this.loading(false);
              },error =>{
                  const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
                this.loading(false);
                swal("Ops!", resMessage, "error");
              }
          )  
        }else{
            this.loading(false);
            swal("Calma...", "Insira o usuario e a senha corretamente", "warning")
        }
    }

    renderFormulario(){
        return <Fragment>
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
                    name='senha'
                    placeholder="Password" 
                    type='password'
                    value={this.state.form.senha}
                    onChange={this.handleFormChange}                                
                    />
            </div>                        
            <div className="p-col-12 p-md-12" style={{textAlign:'center'}}>
                <Button type='submit' label="Acessar" onClick={this.handleSubmit}/>                        
            </div>
            <div style={{marginTop: "30px"}} className="p-col-12 p-md-12 container ">
                <Link className='link' to={"/signup"}>Inscreva-se</Link>
            </div>
        </Fragment>
    }

    render() {
        return <div className="p-grid p-fluid container">                   
            <div className="p-col-12 p-lg-3">                                                       
                <div className="p-grid p-fluid">    
                    <div className="p-col-12 p-md-12 container">
                        <h1> <i className='fas fa-user'/> Login</h1>
                    </div>
                    {this.state.loading ? <Load/> : this.renderFormulario()}                                        
                </div>      
            </div>                      
        </div>
    }
}

export default Login;