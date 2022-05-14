// import React, { useState, useEffect } from 'react';
import React, { Component } from 'react';
import axios from 'axios';

class Grid extends Component {
	constructor() {
		super();
		this.state = {
			records: [],
			totalRecords: 0,
			lazyParams: {
				first: 0, //DE ONDE COMEÇA A CONTAGEM DE REGISTROS
				rows: 10, //NUMERO DE LINHAS QUE APARECEM NA TABELA
				page: 1 //INFORMA A PAGINA APENAS TODO IMPLEMENTAR A CONTAGEM
			}
		};

		this.loadLazyData = this.loadLazyData.bind(this);
	}

	componentDidMount() {
		// axios.get('https://jsonplaceholder.typicode.com/posts').then(
		//BUSCAR O VALOR COM O LAZY PARAMS POR DEFAULT
		this.loadLazyData(this.state.lazyParams);
	}

	loadLazyData(params) {
		//TODO LOADING
		console.log('PARAMS', params);

		//CONTROLA O NUMERO DA PAGINA
		this.setState({
			...this.state,
			lazyParams: {
				...this.state.lazyParams,
				page: params.page,
        first: params.first
			}
		});

		const queryParams = params
			? Object.keys(params).map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&')
			: '';
		axios
			.get('https://www.primefaces.org/data/customers?' + queryParams)
			.then((res) => {
				this.setState({
					totalRecords: res.data.totalRecords,
					records: res.data.customers
					//loading: false
				});
			})
			.catch((e) => console.log('ERRO: ', e));
	}

	render() {
		const pageNumbers = [];
		for (let i = 1; i <= Math.ceil(this.state.totalRecords / this.state.lazyParams.rows); i++) {
			pageNumbers.push(i);
		}

    const {lazyParams, totalRecords} = this.state;
    const{page, rows, first} = lazyParams;

    //A LOGICA TA CERTA, FALTA AJUSTAR O PAGINADOR NA TELA
    const base = 8
    let qtdNext = base - 1; //8 - page 2 = 6 //restaria 1
    let qtdPrevious = 7 - qtdNext; //7 - next 6 = 1

    let previous = []
    for (let i = 0; i < qtdPrevious; i++) {
			previous.push(i);
		} 

    let next = []
    for (let i = 0; i < qtdNext; i++) {
			next.push(i);
		} 


		return (
			<div className="container mt-5">
				{/* <ul class="pagination">
					<li class="page-item"><a class="page-link" href="#">Previous</a></li>
					<li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item active"><a class="page-link" href="#">2</a></li>
					<li class="page-item"><a class="page-link" href="#">3</a></li>
					<li class="page-item"><a class="page-link" href="#">Next</a></li>
				</ul> */}

				{/* <p>PAGE {page} DE {pageNumbers.length}</p>
        <p>FIRST {first}</p>
        <p>TOTAL {totalRecords}</p>
         */}
        <p>Prev {previous.length}</p>
         	<p>Next {next.length}</p>
        
        
        <nav>
					<ul className="pagination  pagination-sm justify-content-center">
          <li key={'first'} className='page-item '>          
            <a onClick={() => this.loadLazyData({first: 0,rows,page: 1})} className='page-link text-primary'>
              {'<<'}
            </a>
          </li>

          {/* OK */}
          <li key={'one-minus'} className='page-item '>          
            <a onClick={() => this.loadLazyData({              
              first: page === 1 ? 0 : ((page - 1) * rows - rows), rows, page: page > 1 ? page - 1 : 1})} 
              className='page-link text-primary'>
              {'<'}
            </a>
          </li>

          {/********************************* 

          CENTRAL ATIVO 
          
          *********************************/}  
                  
          <li key={'current'} className='page-item active'>          
            <label className='page-link '><strong> {page} </strong></label>
          </li>

          {/* {next.map(number => (    
            <li key={number} className='page-item'>          
              <a className='page-link ' onClick={() => this.loadLazyData({ first, rows,number: number + 1 + page})}><strong> {number + 1 + page} </strong></a>
            </li>						
          ))} */}
        
        



          <li key={'one-plus'} className='page-item '>          
            <a onClick={() => this.loadLazyData({
              first: (first + rows) >= totalRecords ? totalRecords - rows : page * rows, rows, page: page < pageNumbers.length ? page + 1 : pageNumbers.length})} 
              className='page-link text-primary'>
              {'>'}
            </a>
          </li>

          <li key={'last'} className='page-item '>
            <a onClick={() => this.loadLazyData({
              first: totalRecords - rows, rows, page: pageNumbers.length})} 
              className='page-link text-primary'>
              {'>>'}
            </a>
          </li>
          <br></br>
          <p className='justify-content-center'>{page} de {pageNumbers.length}</p>
						
					</ul>
				</nav>



				{/* <nav>
					<ul className="pagination  pagination-sm justify-content-center">

          <li key={'first'} className='page-item '>          
            <a onClick={() => this.loadLazyData({first: 0,rows: this.state.lazyParams.rows,page: 1})} className='page-link'>
              {'<<'}
            </a>
          </li>
							

						{pageNumbers.map((number) => (              
							<li
								key={number}
								className={`page-item ${this.state.lazyParams.page === number ? 'active' : ''} `}
							>
								<a
									onClick={() => this.loadLazyData({first: (number - 1) * this.state.lazyParams.rows,rows: this.state.lazyParams.rows,page: number})} //href='!#'
									className={`page-link ${this.state.lazyParams.page === number ? '' : 'text-primary'}`}
								>
									{number}
								</a>
							</li>
						))}
					</ul>
				</nav> */}

				{/* <Posts posts={currentPosts} loading={loading} /> */}
				<table className="table table-striped">
					<thead>
						<tr>
							<th>ID</th>
							<th>Title</th>
						</tr>
					</thead>
					<tbody>
						{this.state.records.map((post) => (
							<tr key={post.id}>
								<td>{post.id} </td>
								<td> {post.name}</td>
								{/* <td > {post.title}</td> */}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Grid;
