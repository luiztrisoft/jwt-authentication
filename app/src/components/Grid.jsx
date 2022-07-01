// import React, { useState, useEffect } from 'react';
import React, { Component } from 'react';
import axios from 'axios';
import GridPagination from './GridPagination';

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

		const { lazyParams, totalRecords } = this.state;
		const { page, rows, first } = lazyParams;

		//A LOGICA TA CERTA, FALTA AJUSTAR O PAGINADOR NA TELA
		const base = 8;
		let qtdNext = base - 1; //8 - page 2 = 6 //restaria 1
		let qtdPrevious = 7 - qtdNext; //7 - next 6 = 1

		let previous = [];
		for (let i = 0; i < qtdPrevious; i++) {
			previous.push(i);
		}

		let next = [];
		for (let i = 0; i < qtdNext; i++) {
			next.push(i);
		}

		return (
			<div className="container ">
				<GridPagination
					lazyParams={lazyParams}
					totalRecords={totalRecords}
					page={page}
					rows={rows}
					first={first}
					pageNumbers={pageNumbers}
					loadLazyData={this.loadLazyData}
				/>

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
				{/* <p>Prev {previous.length}</p>
         	<p>Next {next.length}</p> */}

				{/* <p>{first + rows}</p>
			<p>FIRST {first}</p>
			 <p>PAGE {page}</p>
			 <p>ROWS {rows}</p>
			 <p>PAGE NUMBER {pageNumbers.length}</p>
			 <p>TOTAL RECORDS {totalRecords}</p> */}

				<nav>
					<ul className="pagination  pagination-sm justify-content-center">
						<p className="justify-content-center">
							{page} de {pageNumbers.length}
						</p>
					</ul>
				</nav>

				<h2 className="justify-content-center">
					{page} de {pageNumbers.length}
				</h2>

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
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Grid;
