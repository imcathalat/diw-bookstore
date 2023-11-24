
function renderCard(product){
    const cardDiv = document.createElement('div');
    cardDiv.className = 'col-sm-6 col-md-3 d-flex justify-content-center p-2';

    cardDiv.innerHTML = `
    <div class="card mb-2" style="width:380px;">
        <img src="${product.image}" class="card-img-top object-fit-cover" alt="..." height="300px">
        <div class="card-body position-relative">
            <h5 class="card-title">${product.name}</h5>
            <p> ${product.author}</p>
            <p>Avaliação: ${createStarRating(product.rating.rate)}</p>
            <p class="card-text">${product.description}</p>
            <p>R$${product.price}</p>
            <button type="button" class="card-button btn btn-dark" id="btnAdicionar" data-action="add">Add ao carrinho</button>
            <br>
           <a href="./details.html?id=${product.id}" class="btn btn-primary-outline">Ver detalhes</a>
           <button type="button" class="btn position-relative" id="btnDelete" ><i class="fa-solid fa-trash-arrow-up trash btnDelete" id="${product.id}"></i></button>
        </div>
    </div>
    `;

    const cardButton = cardDiv.querySelector('.card-button');
    cardButton.addEventListener("click", function(){
        toggleCardButton(cardButton, cardDiv);

    });

    const id = `${product.id}`;
    const deleteButton = cardDiv.querySelector('.btnDelete');
    deleteButton.addEventListener("click", function () {
        // Coloque aqui a lógica que você deseja executar ao clicar no botão de exclusão
        getId(id);
    });


    return cardDiv;
}

function createStarRating(rate){
    const roundedRate = Math.round(rate);

    const filedStar = '★';
    const emptyStar = '☆';

    let starRating = '';

    for(let i = 0; i < 5; i++){
        if(i < roundedRate){
            starRating += filedStar;
        } else {
            starRating += emptyStar;
        }
    }

    return starRating;
}

var spanCounter = 0;

function updateCounter(){
    let counter = document.querySelector('.counter');
    counter.textContent = spanCounter;
}

function toggleCardButton(cardButton, cardDiv){
    const action = cardButton.getAttribute('data-action');
    
    if (action == 'add') {
        cardButton.textContent = "Remover do carrinho";
        cardDiv.classList.add('added');
        cardButton.classList.remove("btn-dark");
        cardButton.classList.add("btn-secondary");
        cardButton.setAttribute("data-action", "remove");

        //* chamar função de mais um

        spanCounter++;
        updateCounter();

    } else {
        cardButton.textContent = "Adicionar ao carrinho";
        cardDiv.classList.remove("added");
        cardButton.classList.remove("btn-secondary");
        cardButton.classList.add("btn-dark");
        cardButton.setAttribute("data-action", "add");

        // chamar função de menos um
        
        spanCounter--;
        updateCounter();
        
        
    }
}

async function renderCardSection(){
    const cardContainer = document.getElementById('card-container');

    let data = await fetchProductData();
    //console.log(data.length);

    for(let i=0; i<= data.length; i++){
        const card = renderCard(data[i]); //a variavel card recebe a variavel cardDiv que a função renderCard() retorna com os lugares preenchidos pelo json
        cardContainer.appendChild(card); // aqui, a variavel cardContainer adiciona aquele html de card da função renderCard com as informações vindas do json no html do index
    }

    
}

async function fetchProductData() {
    const response = await fetch("https://json-server-e-commerce-diw--imcathalat1.repl.co/products"); // fetch é um método pra ler api
    let data = await response.json(); // response.json() é um metodo pra pegar apenas o json da api, isso pq o fetch retorna mts informações além de só o json (acho)
    return data;
}

renderCardSection();

async function fecthProduct(productId){
    try {
        const productDetails = await fetch(`https://json-server-e-commerce-diw--imcathalat1.repl.co/products/${productId}`);
        const data = await productDetails.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados', error);
    }
        
}

async function deleteProduct(productId) {    
    try {
        // Realizar uma requisição POST usando fetch com async/await
        const response = await fetch(`https://json-server-e-commerce-diw--imcathalat1.repl.co/products${productId}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
        });
    
        if (response.ok) {
            // Produto adicionado com sucesso
            console.log('Produto excluído com sucesso');
    
            //Redirecionar para a página de home
            window.location.href = 'index.html';
        } else {
            // Lidar com erros
            console.error('Erro ao deletar produto', response.statusText);
        }
        } catch (error) {
            console.error('Ocorreu um erro:', error);
        }
}

async function getId(productId){
    if (productId) {
    // Chama a função para obter os detalhes do produto usando o ID
        const product = await fecthProduct(productId);
    // Chama outra função e passa o objeto do produto como parâmetro
    console.log(product);
    deleteProduct(productId);
    } else {
        console.error('ID do produto não encontrado');
    }
}

