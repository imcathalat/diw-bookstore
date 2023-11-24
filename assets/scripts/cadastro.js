// Função para lidar com o envio do formulário
async function submitForm(event) {
    event.preventDefault();
  
    // Obter dados do formulário
    const productName = document.getElementById('product-name').value;
    const productDescription = document.getElementById('product-description').value;
    const productCategory = document.getElementById('product-category').value;
    const productImage = document.getElementById('product-image-url').value;
    const productPrice = document.getElementById('product-price').value;
  
    // Realizar validação, se necessário
  
    // Preparar os dados da requisição
    const requestBody = JSON.stringify({
      title: productName,
      price: productPrice,
      description: productDescription,
      category: productCategory,
      image: productImage,
      rating: { rate: 0, count: 0 }
    });
  
    try {
      // Realizar uma requisição POST usando fetch com async/await
      const response = await fetch('https://json-server-e-commerce-diw--imcathalat1.repl.co/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });
  
      if (response.ok) {
        // Produto adicionado com sucesso
        console.log('Produto adicionado com sucesso');
  
        //Redirecionar para a página de home
        window.location.href = 'index.html';
      } else {
        // Lidar com erros
        console.error('Erro ao adicionar o produto:', response.statusText);
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  }
  
  // Função para lidar com a prévia da imagem quando a URL é inserida
  function handleImageUrlInput() {
    const imageUrlInput = document.getElementById('product-image-url');
    const image = document.getElementById('display-image');
  
    imageUrlInput.addEventListener('input', () => {
      const imageUrl = imageUrlInput.value;
  
      if (imageUrl) {
        image.src = imageUrl;
        image.classList.remove('d-none');
      } else {
        image.src = '';
        image.classList.add('d-none');
      }
    });
  }
  
  // Função para carregar as categorias do servidor e preencher o dropdown
  async function loadCategories() {
    const categoryDropdown = document.getElementById('product-category');
  
    try {
      const response = await fetch('https://jsonserver-categories-semana15-diw--imcathalat1.repl.co/categories');
      const categories = await response.json();
  
      // Limpar opções existentes
      categoryDropdown.innerHTML = '';
  
      // Adicionar a opção inicial vazia e desativada
      const initialOption = document.createElement('option');
      initialOption.value = '';
      initialOption.text = 'Selecione uma categoria';
      initialOption.disabled = true;
      initialOption.selected = true;
      categoryDropdown.appendChild(initialOption);
  
      // Adicionar as novas opções
      categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category;
        option.text = category;
        categoryDropdown.appendChild(option);
      });
    } catch (error) {
      console.error('Erro ao carregar as categorias:', error);
    }
  }
  
  // Event listener para o envio do formulário
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', submitForm);
  
    // Chamar a função para lidar com a prévia da imagem
    handleImageUrlInput();
  
    // Chamar a função para carregar as categorias
    loadCategories();
  });
  