import Axios from "axios";
import React, { useState, useEffect, useCallback } from "react";

// import api from "../../services/api";

// import {
//   div,
//   div,
//   div,
//   div,
//   div,
// } from "./styles"

function DanieleLeao() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadProducts() {
      //const response = await api.get(`/products?page=${currentPage}&limit=${limit}`);
      const response = await Axios.get(`http://servicodados.ibge.gov.br/api/v3/noticias?page${currentPage}&limit=${limit}`);
      setTotal(response.headers["x-total-count"]);
      const totalPages = Math.ceil(total / limit);

      const arrayPages = [];
      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }

      setPages(arrayPages);
      setProducts(response.data.items);
    }

    loadProducts();
  }, [currentPage, limit, total]);

  const limits = useCallback((e) => {
    setLimit(e.target.value);
    setCurrentPage(1);
  }, []);

  return (
    <div>
      <h3>Tabela de produtos</h3>
      <select onChange={limits}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="100">100</option>
      </select>
      <div>
        <thead>
          <tr>
            <th>#</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Imagem</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
                <td>{product.tipo}</td>
                {/* <td>{product.noticia}</td> */}
              {/* <td>{product._id}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.image}</td> */}
            </tr>
          ))}
        </tbody>
      </div>
      <div>
        <div>Qtd {total}</div>
        <div>
          {currentPage > 1 && (
            <div onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
            </div>
          )}
          {pages.map((page) => (
            <div
              isSelect={page === currentPage}
              key={page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </div>
          ))}
          {currentPage < pages.length && (
            <div onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DanieleLeao;