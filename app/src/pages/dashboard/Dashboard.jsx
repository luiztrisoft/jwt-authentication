import React, {Component} from 'react';
import { connect } from 'react-redux';
import imgFromAsset from '../../assets/img/oficialasset.png'

import './Dashboard.css';
import trisoft from '../../assets/img/logo.png'
import If from '../../components/if/If';

class Dashboard extends Component {    
    constructor() {
        super();
        this.state = {};
    }

    renderImage(){
        return <img src={trisoft} alt="trisoft" width="20px" />
    }
    
    render() {   
        let mostrarLogo = true;
        return (  
            <div className="p-grid p-fluid">   

                <If test={mostrarLogo}>
                    <div className="p-col-12 p-lg-12">        
                        <img src={imgFromAsset} style={{ width: '100%', marginTop: '1%', marginLeft: '0%'}} alt="TriSoft"/>
                        {/* <img src="img/logo.png" style={{width: '5%', marginTop: '5%'}} alt="TriSoft"/> */}
                    </div>                
                </If>

                {/* Componentizar e usar no changes */}
                <div className="p-col-12 p-lg-12">        
                    <label >                                                 
                        <span style={{marginLeft: '10px', fontSize: '10px'}}>
                            {this.props.v3.name}
                            {this.props.v3.version}
                            - {this.props.v3.date}
                        </span>
                    </label>          
                </div> 
            </div>
        )
    }
}

const mapStateToProps = store => ({
    v3: store.dashboardReducer.dashboardInfoV3    
  });

export default connect(mapStateToProps, null)(Dashboard);