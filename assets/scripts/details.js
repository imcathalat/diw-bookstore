console.log(renderDetails());
async function fecthProductDetails(productId){
try {
    const productDetails = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const data = await productDetails.json();
    return data;
} catch (error) {
    console.error('Erro ao buscar dados', error);
}
    
}

function updateProductDetails(product){
    if(product){
        document.getElementById('productName').textContent = product.title;
        document.getElementById('productImage').src = product.image;
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('productCategory').textContent = product.category;
        document.getElementById('productPrice').textContent = product.price;
    }
    else {
        alert("Produto não encontrado.");
    }
    
}

async function renderDetails(){
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    console.log(productId);
    const product = await fecthProductDetails(productId);
    console.log(product);
    updateProductDetails(product);
}
