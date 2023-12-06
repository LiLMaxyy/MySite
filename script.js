

const products = [
    
    { name: 'Товар 1', price: 19.99, description: 'Описание товара 1', image: 'product1.jpg' },
    { name: 'Товар 2', price: 29.99, description: 'Описание товара 2', image: 'product2.jpg' }
    
];

let cartItems = [];

function initializePage() {
    displayProducts(products);
    updateCart();
}

function updateCart() {
    const cartElement = document.getElementById('cart');
    const totalPriceElement = document.getElementById('totalPrice');
    let totalPrice = 0;

    cartElement.innerHTML = '';

    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartElement.appendChild(listItem);

        totalPrice += item.price;
    });

    totalPriceElement.textContent = `Общая стоимость: $${totalPrice.toFixed(2)}`;
}

function addNewProduct() {
    const productName = document.getElementById('productName').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productDescription = document.getElementById('productDescription').value;
    const productImage = document.getElementById('productImage').value;

    if (productName && !isNaN(productPrice) && productDescription && productImage) {
        const newProduct = {
            name: productName,
            price: productPrice,
            description: productDescription,
            image: productImage
        };

        products.push(newProduct);
        displayProducts(products);

        cartItems.push(newProduct);
        updateCart();
    } else {
        alert('Пожалуйста, заполните все поля формы.');
    }
}

function addToCart(productName, price) {
    const product = products.find(p => p.name === productName);

    if (product) {
        cartItems.push(product);
        updateCart();
    }
}

function createProductElement(product) {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    const productName = document.createElement('h2');
    productName.textContent = product.name;

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.name;

    const productDescription = document.createElement('p');
    productDescription.textContent = product.description;

    const productPrice = document.createElement('p');
    productPrice.textContent = `Цена: $${product.price.toFixed(2)}`;

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Добавить в корзину';
    addToCartButton.onclick = function () {
        addToCart(product.name,addToCart(product.name, product.price);
    };

    productDiv.appendChild(productName);
    productDiv.appendChild(productImage);
    productDiv.appendChild(productDescription);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(addToCartButton);

    return productDiv;
}

function clearCart() {
    cartItems = [];
    updateCart();
}

window.onload = initializePage;