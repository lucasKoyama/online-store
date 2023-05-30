// Requisito 1 - acessando API do Mercado Livre
export async function getCategories() {
  // Implemente aqui
  return fetch(('https://api.mercadolibre.com/sites/MLB/categories'))
    .then((response) => response.json())
    .then((data) => data);
}

// Requisito 1 - acessando API do Mercado Livre
export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const data = await response.json();
  return data;
}

export async function getProductById(productId) {
  const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  const data = await response.json();
  return data;
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
