import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/auth/auth.service';
import swal from 'sweetalert';
import Input from '../../components/form/Input';


import { bindActionCreators } from 'redux';
import {setLoading} from '../../store/actions/LoadAction'

import { connect } from 'react-redux';

import './Signup.css';

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
            submited: false
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

        this.setState({
			...this.state,
			submited: true
		});
    
        const {usuario, email, senha} = this.state.form;
    
        if (usuario && email && senha) {
            this.props.setLoading(true);
            authService.register(usuario,email,senha).then(
                response => {                
                swal("Parabéns!", "Usuário salvo com sucesso","success");
                this.setState({
                    form:{
                        usuario: '',
                        senha: '',
                        email: ''
                    },
                    submited: false
                });
                this.props.setLoading(false);
            },
            error => {
              const msg =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
                this.props.setLoading(false);
                swal("Ops!", msg, "error");
            }
          );
        }else{
            this.props.setLoading(false);
            // swal("Calma...", "Todos os campos devem ser preenchidos", "warning");
        }
      }

    render() {   
        return (  
            <form>
                <div className="signup-container ">
                    <div className=" border border-secondary shadow p-3 mb-5 bg-body rounded">
				        <h5 className="text-dark mb-4 col-12"><i className='fas fa-plus'/> Signup</h5>

                        <Input
					    	cols="12"
					    	id={'usuario'}
					    	label={'Usuário'}
					    	name="usuario"
					    	type={'text'}
					    	placeholder={''}
					    	required={true}
					    	disabled={false}
					    	value={this.state.form.usuario}
					    	onChange={this.handleFormChange}
					    	validation={!this.state.form.usuario && this.state.submited}
					    />

                        <Input
					    	cols="12"
					    	id={'email'}
					    	label={'E-mail'}
					    	name="email"
					    	type={'email'}
					    	placeholder={''}
					    	required={true}
					    	disabled={false}
					    	value={this.state.form.email}
					    	onChange={this.handleFormChange}
					    	validation={!this.state.form.email && this.state.submited}
					    />

                        <Input
							cols="12"
							id={'password'}
							label={'Senha'}
							name="senha"
							type={'password'}
							placeholder={''}
							required={true}
							disabled={false}
							value={this.state.form.senha}
							onChange={this.handleFormChange}
							validation={!this.state.form.senha && this.state.submited}
						/>

                        <div className="mb-4" />

                        <div className="signup-container mb-0">
                            <button type="submit" onClick={this.handleRegister} className="btn btn-primary mb-3">
                                Cadastrar
                            </button>
                        </div>

                        <div className="signup-container mb-4">
                            <Link className='text-primary' to={'/login'}>Acesse</Link>
                        </div>
                    </div>
                </div>
            </form>            
        )
    }
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({
			setLoading
		},dispatch
	);


export default connect(null,mapDispatchToProps)(Signup);
