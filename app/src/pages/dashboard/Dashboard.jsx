import React, {Component} from 'react';
import Form from '../../pages-sample/Form';
import FormComplex from '../../pages-sample/FormComplex';
import LoggedUser from '../LoggedUser';

import axios from 'axios'
import Table from '../../components/table/Table';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import Grid from '../../components/Grid';
import DanieleLeao from '../../components/DanieleLeao';
import DataTableLazyDemo from '../../components/primereact/DataTableLazyDemo'

class Dashboard extends Component {

    constructor() {
		super();
		this.state = {
            data:{
                items: [],
                count: 0,
                page: 0,
                nextPage:0,
                previousPage: 0,
                totalPages: 0,
                showingFrom: 0,
                showingTo: 0
            }
		};
	}

    componentDidMount(){
        //https://servicodados.ibge.gov.br/api/docs/noticias?versao=3
        axios.get('http://servicodados.ibge.gov.br/api/v3/noticias/?qtd=10&page=1').then(
            resp => {
                this.setState({
                    ...this.state,
                    data: resp.data
                })
                //console.log(this.state.data)
            }
        ).catch(e => console.log(e))
    }
    

    

    render() {
        
        return (
            <div className="container">                                
                <div className="mb-3 col-12" >
                  <h1>Dashboard</h1>
                </div>

                {/* <Table/> */}
                <Grid/>
                {/* <DanieleLeao/> */}

                {/* <DataTableLazyDemo/> */}

                


                {/* <Table
                    columns={['ID', 'Tipo', 'Titulo']}
                    data={this.state.data.items}
                    /> */}

                {/* <DataTable
                    value={this.state.data.items} 
                    style={{fontFamily:"Ubuntu", fontSize: "12px", margin: 0, padding: 0}}                            
                    paginator
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    // currentPageReportTemplate="Resultado {first} a {last} de {totalRecords}" 
                    currentPageReportTemplate="" 
                    rows={10} 
                    rowsPerPageOptions={[5, 10, 20]}>

                        <Column field="id" header="#" sortable={true} style={{textAlign:'center', width: '10em'}}/>
                        <Column field="tipo" header="TYPE" style={{textAlign:'center', width: '10em'}}/>
                        <Column field="titulo" header="TITLE"/>
                
                </DataTable> */}


                {/* <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end pagination-sm">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">4</a></li>
                    <li className="page-item"><a className="page-link" href="#">5</a></li>
                    <li className="page-item"><a className="page-link" href="#">6</a></li>
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav> */}

                {/* <table className="table table-striped">
                 <thead>
                <tr>
                    <th>Header</th>
                    <th>Header</th>
                    <th>Header</th>                   
                </tr>
                </thead>

                <tbody>
                
                    {this.state.data.items.map(i => (
                        <tr>
                            <td scope="row">{i.id}</td>
                            <td scope="row">{i.tipo}</td>
                            <td scope="row">{i.titulo}</td>
                        </tr>
                    ))}            
                </tbody>
                
            </table>     */}

                              

                    {/* {
                        this.state.data && 
                        this.state.data.items && 
                        this.state.data.items.map(i =>(
                            <h4 scope="row">{i.titulo}</h4>
                      
                    ))}       */}
                
                {/* <Form/>  */}
                {/* <FormComplex/> */}
                {/* <LoggedUser/> */}
            </div>
        );
    }
}

export default Dashboard;


                  