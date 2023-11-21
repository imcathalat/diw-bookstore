
function renderCard(product){
    const cardDiv = document.createElement('div');
    cardDiv.className = 'col-sm-6 col-md-3 d-flex justify-content-center p-2';

    cardDiv.innerHTML = `
    <div class="card mb-2" style="width:380px;">
        <img src="${product.image}" class="card-img-top object-fit-cover" alt="..." height="300px">
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p> ${product.author}</p>
            <p>Avaliação: ${createStarRating(product.rating.rate)}</p>
            <p class="card-text">${product.description}</p>
            <p>R$${product.price}</p>
            <button type="button" class="card-button btn btn-dark" id="btnAdicionar" data-action="add">Add ao carrinho</button>
            <br>
           <a href="./details.html?id=${product.id}" class="btn btn-primary-outline">Ver detalhes</a>
        </div>
    </div>
    `;

    const cardButton = cardDiv.querySelector('.card-button');
    cardButton.addEventListener("click", function(){
        toggleCardButton(cardButton, cardDiv);

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

    for(let i=1; i<= data.length; i++){
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