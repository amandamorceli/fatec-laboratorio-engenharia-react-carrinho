import { useEffect, useState } from "react";
import Carrinho from "./components/Carrinho";
import Produtos from "./components/Produtos";
import "./App.css";

/**
 * Função para chamar API
 * @param {string} url caminho da função
 * @param {string} method método da função
 * @param {*} body objeto de resposta
 * @returns objeto de resposta
 */
async function api(url, method, body = undefined) {
  return await fetch(`http://localhost:4000${url}`, {
    body: body !== undefined ? JSON.stringify(body) : body,
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

/**
 * Busca todos os produtos da API
 * @returns lista de produtos
 */
async function apiGetProducts() {
  const data = await api("/products", "GET");
  console.log("apiGetProducts: ", data);
  return data.products;
}

/**
 * Salva o carrinho de compras na API
 * @param {Object[]} products lista de produtos
 */
async function apiSubmitCart(products) {
  const response = await api("/purchases", "POST", { products });
  console.log("Compra realizada com sucesso:", response);
  return response;
}

function App() {
  const [productsLoading, setProductsLoading] = useState(false); // Status do loading de produtos
  const [products, setProducts] = useState([]); // Lista de produtos
  const [cart, setCart] = useState([]); // Lista de produtos no carrinho
  const [cartLoading, setCartLoading] = useState(false); // Status do loading do carrinho

  // Busca os produtos
  async function getProducts() {
    setProductsLoading(true); // Ativa loading de produtos
    setProducts(await apiGetProducts()); // Salva lista de produtos na variável global
    setProductsLoading(false); // Desativa loading de produtos
  }

  // Salva o carrinho
  async function submitCart() {
    setCartLoading(true); // Ativa loading do carrinho
    const resultado = await apiSubmitCart(cart); // Salva o carrinho
    if (resultado != null) {
      alert("Compra realizada com sucesso!");
    }
    setCart([]); // Limpa o carrinho
    setCartLoading(false); // Desativa loading do carrinho

    getProducts(); // Busca os produtos novamente
  }

  /**
   * Altera unidades do produto
   */
  function setProduct(product, change) {
    const products = cart.filter(({ id }) => {
      return id !== product.id;
    });

    product.units += change;
    if (product.units > 0) {
      setCart(() => [...products, product]);
    } else {
      setCart(() => [...products]);
      setProducts((lastProducts) => [...lastProducts, product]);
    }
  }

  /**
   * Adiciona produto no carrinho
   */
  function addProduct(product) {
    product.units = 1;
    setCart(() => [...cart, product]);

    setProducts(() =>
      products.filter(({ id }) => {
        return id !== product.id;
      })
    );
  }

  useEffect(() => {
    getProducts(); // Busca os produtos ao carregar a página
  }, []);

  return (
    <div className="w-full h-full grid grid-cols-[300px_1fr] grid-rows-[1fr]">
      <Carrinho
        produtos={cart}
        onChange={setProduct}
        onClick={submitCart}
        carregando={cartLoading}
      />
      <Produtos
        produtos={products}
        onClick={addProduct}
        carregando={productsLoading}
      />
    </div>
  );
}

export default App;
