import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
        
    return <div className={`mb-2 col-${props.cols ? props.cols : '12'}`}>
                <label 
                    style={{marginBottom: 0}}
                    for={props.id ? props.id : undefined}                     
                    className={props.validation ? 'text-danger' : 'text-dark'}
                >
                    {props.label} {props.required ? '*' : ''}                    
                    <label style={{fontSize: 10, marginBottom: 0, marginLeft: '5px'}} className='text-danger'>{props.validation ? `(O campo ${props.label} é obrigatório)`: ''}</label>
                </label>
                
                <input 
                    id={props.id ? props.id : undefined} 
                    type={props.type ? props.type : 'text'} 
                    className={`form-control ${props.validation ? ' is-invalid' : ''}`}
                    placeholder={props.placeholder ? props.placeholder : ''}
                    name={props.name}
                    value={props.value}
                    disabled={props.disabled}
                    onChange={props.onChange}
                    //pristine onblur                    
                    />                    
                    {/* <span style={{fontSize: 9}} className={props.validation ? 'text-danger' : 'text-success'}>{props.validation ? `O campo ${props.label} é obrigatório`: ''}</span>                     */}
                    
            </div>
};

// Input.propTypes = { olhar o If
//     test: PropTypes.any
// };

export default Input;