import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => {
    
    return (
        <div className="col-12">
            <div className="alert alert-danger" role="alert">
                <h1 className='text-black-50'>Recurso proibido! </h1>
                <p>Você não tem permissão para acessar este recurso</p>
                <Link to='/' className='text-danger'>{`<< Voltar para página principal`}</Link>
            </div>
        </div>
    )
}

export default Forbidden;