import React, {Component} from 'react';
import './Forbidden.css';

class Forbidden extends Component {    
    constructor() {
        super();
        this.state = {
          content: undefined
        };
    }

    render() {   
        return (  
            <div className="p-grid p-fluid forbidden">   
                <div className="p-col-12 p-lg-12">        
                    <h1>Ops! Você não tem permissão para acessar este recurso :(</h1>                    
                </div> 
            </div>
        )
    }
}

export default Forbidden;