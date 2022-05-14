import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    
    return (
        <div className="container">
            <div className='col-12'>
                <h1 className='text-info'>Oops! Página não encontrada :(</h1>
                <Link to='/' className='text-primary'>{`<< Voltar para página principal`}</Link>
            </div>
        </div>
    )
}

export default NotFound;