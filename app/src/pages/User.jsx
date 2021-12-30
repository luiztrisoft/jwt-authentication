import React, {Component} from 'react';

class User extends Component {    
    constructor() {
        super();
        this.state = {};
    }

    render() {   
        return (  
            <div className="p-grid p-fluid">   
                <div className="p-col-12 p-lg-12">        
                    <h1>User</h1>
                </div> 
            </div>
        )
    }
}

export default User;