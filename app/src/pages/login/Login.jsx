import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

import authService from '../../services/auth/auth.service';
import Input from '../../components/form/Input';

import { bindActionCreators } from 'redux';
import {setLoading} from '../../store/actions/LoadAction'

import { connect } from 'react-redux';


import './Login.css';


class Login extends Component {
	constructor() {
		super();
		this.handleFormChange = this.handleFormChange.bind(this);
		this.state = {
			form: {
				usuario: undefined,
				senha: undefined
			},
			submited: false
			
		};
	}
	
	handleFormChange(e) {
		let target = e.target;

		this.setState({
			form: {
				...this.state.form,
				[target.name]: target.value
			}
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();

		this.setState({
			...this.state,
			submited: true
		});

		const { usuario, senha } = this.state.form;

		if (usuario && senha) {
			this.props.setLoading(true);
			authService.login(usuario, senha).then(
				() => {
					this.props.history.push('/');
					window.location.reload();
					this.props.setLoading(false);
				},
				(error) => {
					const resMessage =
						(error.response && error.response.data && error.response.data.message) ||
						error.message ||
						error.toString();
					this.props.setLoading(false);
					swal('Ops!', resMessage, 'error');
				}
			);
		} else {
			this.props.setLoading(false);
			//swal("Calma...", "Insira o usuario e a senha corretamente", "warning")
		}
	};

	render() {
		return (
			<form>				
				<div className="login-container ">
					<div className=" border border-secondary shadow p-3 mb-5 bg-body rounded">
						<h5 className="text-dark mb-4 col-12"><i className='fas fa-user'/> Login</h5>

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

						<div className="login-container mb-0">
							<button type="submit" onClick={this.handleSubmit} className="btn btn-primary mb-3">
								Acessar
							</button>
						</div>
                        
                        <div className="login-container mb-4">
                            <Link className='text-primary' to={'/signup'}>Não possui cadastro? Inscreva-se</Link>
                        </div>

					</div>
				</div>
			</form>
		);
	}
}


const mapDispatchToProps = (dispatch) =>
	bindActionCreators({
			setLoading
		},dispatch
	);


export default connect(null,mapDispatchToProps)(Login);
