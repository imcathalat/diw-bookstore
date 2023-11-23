
async function fecthProductDetails(productId){
try {
    const productDetails = await fetch(`https://json-server-e-commerce-diw--imcathalat1.repl.co/products/${productId}`);
    const data = await productDetails.json();
    return data;
} catch (error) {
    console.error('Erro ao buscar dados', error);
}
    
}

function updateProductDetails(product){
    if(product){
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productImage').src = product.image;
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('productCategory').textContent = product.pages;
        document.getElementById('productPrice').textContent = product.price;
    }
    else {
        alert("Produto não encontrado.");
    }
    
}

async function renderDetails(){
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const product = await fecthProductDetails(productId);
    console.log(product);
    updateProductDetails(product);
}

renderDetails();
