btnDelete = document.getElementById('btnDelete');

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Verifica se o ID do produto está presente na URL
if (productId) {
  // Chama a função para obter os detalhes do produto usando o ID
  const product = await fetchProductDetails(productId);

  // Chama outra função e passa o objeto do produto como parâmetro
  anotherFunction(product);
} else {
  console.error('ID do produto não encontrado na URL');
}

async function fetchProduct(productId) {
    
    const response = await fetch(`https://json-server-e-commerce-diw--imcathalat1.repl.co/products${productId}`);
    const product = await response.json();
    return product;
}
  

function deleteProduct(idAjuda, refreshFunction) {
    fetch(`${apiUrl}/${idAjuda}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Contato removido com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao remover contato via API JSONServer:', error);
            displayMessage("Erro ao remover contato");
        });
}



btnDelete.addEventListener('click', deleteProduct())