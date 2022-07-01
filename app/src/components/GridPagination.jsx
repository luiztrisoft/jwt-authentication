import React, { Component } from 'react';

class GridPagination extends Component {
    render() {
        const {lazyParams, totalRecords, pageNumbers} = this.props;
        const{page, rows, first} = lazyParams;

		return (
			<div className="container ">
				<nav>
					<ul className="pagination  pagination-sm justify-content-center">
						{/********************************* 

                        Primeiro
                        
                        *********************************/}
						<li key={'first'} className="page-item ">
							<a
								onClick={page > 1 ? () => this.props.loadLazyData({ first: 0, rows, page: 1 }) : undefined}
								className={page > 1 ? 'page-link text-primary' : 'page-link text-secondary'}
							>
								{'<<'}
							</a>
						</li>

						{/********************************* 

                        -20
          
                        *********************************/}
						<li key={'twenty-minus'} className="page-item ">
							<a
								onClick={
									page > 1 ? (
										() =>
											this.props.loadLazyData({
												first: page <= 20 ? 0 : (page - 20) * rows,
												rows,
												page: page > 20 ? page - 20 : 1
											})
									) : (
										undefined
									)
								}
								className={page > 1 ? 'page-link text-primary' : 'page-link text-secondary'}
							>
								{'-20'}
							</a>
						</li>

						{/********************************* 

                        -10
                        
                        *********************************/}

						<li key={'ten-minus'} className="page-item ">
							<a
								onClick={
									page > 1 ? (
										() =>
											this.props.loadLazyData({
												//Se as rows forem 10 funciona. Rever quando as rows forem dinamicas
												first: page <= 10 ? 0 : (page - rows) * rows - rows,
												rows,
												page: page > 10 ? page - 10 : 1
											})
									) : (
										undefined
									)
								}
								className={page > 1 ? 'page-link text-primary' : 'page-link text-secondary'}
							>
								{'-10'}
							</a>
						</li>

						{/********************************* 

                        -1
                        
                        *********************************/}
						<li key={'one-minus'} className="page-item ">
							<a
								onClick={
									page > 1 ? (
										() =>
											this.props.loadLazyData({
												first: page === 1 ? 0 : (page - 1) * rows - rows,
												rows,
												page: page > 1 ? page - 1 : 1
											})
									) : (
										undefined
									)
								}
								className={page > 1 ? 'page-link text-primary' : 'page-link text-secondary'}
							>
								{'<'}
							</a>
						</li>

						{/********************************* 

                        CENTRAL ATIVO 
                        
                        *********************************/}
						<li key={'current'} className="page-item active">
							<label className="page-link ">
								<strong>
									{' '}
									{page} de {pageNumbers.length}{' '}
								</strong>
							</label>
						</li>

						{/* {next.map(number => (    
            <li key={number} className='page-item'>          
              <a className='page-link ' onClick={() => this.props.loadLazyData({ first, rows,number: number + 1 + page})}><strong> {number + 1 + page} </strong></a>
            </li>						
          ))} */}

						{/********************************* 

                        +1
                        
                        *********************************/}
						<li key={'one-plus'} className="page-item ">
							<a
								onClick={
									first + rows < totalRecords ? (
										() =>
											this.props.loadLazyData({
												first: first + rows >= totalRecords ? totalRecords - rows : page * rows,
												rows,
												page: page < pageNumbers.length ? page + 1 : pageNumbers.length
											})
									) : (
										undefined
									)
								}
								className={
									first + rows < totalRecords ? 'page-link text-primary' : 'page-link text-secondary'
								}
							>
								{'>'}
							</a>
						</li>

						{/********************************* 

                        +10
                        
                        *********************************/}
						<li key={'ten-plus'} className="page-item ">
							<a
								onClick={
									first + rows < totalRecords ? (
										() =>
											this.props.loadLazyData({
												first:
													page + 10 < pageNumbers.length
														? (page + (rows - 1)) * rows
														: totalRecords - rows,
												rows,
												page: page + 10 < pageNumbers.length ? page + 10 : pageNumbers.length
											})
									) : (
										undefined
									)
								}
								className={
									first + rows < totalRecords ? 'page-link text-primary' : 'page-link text-secondary'
								}
							>
								{'+10'}
							</a>
						</li>

						{/********************************* 

                        +20
                        
                        *********************************/}
						<li key={'twenty-plus'} className="page-item ">
							<a
								onClick={
									first + rows < totalRecords ? (
										() =>
											this.props.loadLazyData({
												first:
													page + 20 < pageNumbers.length
														? (page + (rows - 1)) * rows
														: totalRecords - rows,
												rows,
												page: page + 20 < pageNumbers.length ? page + 20 : pageNumbers.length
											})
									) : (
										undefined
									)
								}
								className={
									first + rows < totalRecords ? 'page-link text-primary' : 'page-link text-secondary'
								}
							>
								{'+20'}
							</a>
						</li>
						{/********************************* 

                        Ultimo
                        
                        *********************************/}
						<li key={'last'} className="page-item ">
							<a
								onClick={() =>
									this.props.loadLazyData({
										first: totalRecords - rows,
										rows,
										page: pageNumbers.length
									})}
								className="page-link text-primary"
							>
								{'>>'}
							</a>
						</li>
						<br />
						{/* <p className="justify-content-center"> */}
							{/* {page} de {pageNumbers.length} */}
						{/* </p> */}
					</ul>                    
				</nav>
			</div>
		);
	}
}

export default GridPagination;
