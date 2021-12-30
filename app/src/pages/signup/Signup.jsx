import React, {Component} from 'react';
import {InputText} from 'primereact/inputtext';
 import {Button} from 'primereact/button';
//import Button from '../../components/form/button/Button';
import './Signup.css';


class Signup extends Component {    
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);        
        this.state = {
            form:{
                usuario: undefined,
                senha: undefined
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

    handleSubmit(e){
        console.log('State::', this.state)
    }

    render() {   
        return (  
            // <form submit={this.handleSubmit()} >
            <div className="p-grid p-fluid container">                   
                <div className="p-col-12 p-lg-3">                                                       
                    <div className="p-grid p-fluid">                         
                        
                        <div className="p-col-12 p-md-12 container">
                            <h1> <i className='fas fa-add'/> Signup</h1>
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
                                name='senha'
                                placeholder="Password" 
                                type='password'
                                value={this.state.form.senha}
                                onChange={this.handleFormChange}                                
                                />
                        </div>                        
                        <div className="p-col-12 p-md-12" style={{textAlign:'center'}}>
                            <Button label="Acessar" onClick={this.handleSubmit}/>                        
                        </div>
                    </div>      
                </div>                      
            </div>
            // </form>
        )
    }
}


export default Signup;