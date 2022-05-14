import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Form extends Component {
    constructor() {
        super();
        this.state = {
            pessoas:[
                {id: 59, nome: "Helia", descricao: "Mãe"},
                {id: 67, nome: "Eva", descricao: "Tia"},
                {id: 88, nome: "Barbara", descricao: "Esposa"},
                {id: 87, nome: "André", descricao: "Amigo"},
                {id: 86, nome: "Denis", descricao: "Amigo"}
            ]
        };

    }

    render() {
        return (
            <div>                                
                <div className="col-12" >
                  <div className="alert alert-success" role="alert">
                    Registro cadastrado com sucesso!
                  </div>
                </div>

                <div className="mb-3 col-5">
                    <label for="exampleFormControlInput1" className="form-label"><strong>Nome*</strong></label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Gerald de Rivia"/>                    
                </div>
                <div className="mb-3 col-12">
                    <label for="exampleFormControlTextarea1" className="form-label"><strong>Descrição*</strong></label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className="mb-4 col-auto">
                    <button type="submit" className="btn btn-primary mb-3">Confirmar</button>
                </div>

                <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Descrição</th>
                        <th scope="col"></th>                        
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.pessoas.map(p =>(
                      <tr>
                        <td scope="row">{p.id}</td>
                        <td>{p.nome}</td>
                        <td>{p.descricao}</td>  
                        <td><Link to={`/pessoa/${p.id}`}>Detalhes</Link></td>                      
                      </tr>  
                    ))}                      
                    </tbody>
                </table>

               <nav aria-label="Page navigation example">
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
                </nav>
            </div>
        );
    }
}

export default Form;


                  