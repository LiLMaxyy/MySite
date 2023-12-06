

const products = [
    
    { id: 1, name: 'Товар 1', price: 19.99, category: 'Электроника', description: 'Описание товара 1', image: 'product1.jpg' },
    { id: 2, name: 'Товар 2', price: 29.99, category: 'Одежда', description: 'Описание товара 2', image: 'product2.jpg' }
    
];

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function initializePage() {
    displayProducts(products);
    updateCart();
    populateCategoryFilter();
}

function displayProducts(productsToDisplay) {
    const productsSection = document.getElementById('productsSection');
    productsSection.innerHTML = '';

    productsToDisplay.forEach(product => {
        const productElement = createProductElement(product);
        productsSection.appendChild(productElement);
    });
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

    const productCategory = document.createElement('p');
    productCategory.textContent = `Категория: ${product.category}`;

    const productPrice = document.createElement('p');
    productPrice.textContent = `Цена: $${product.price.toFixed(2)}`;

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Добавить в корзину';
    addToCartButton.onclick = function () {
        addToCart(product.id);
    };

    
    const productLink = document.createElement('a');
    productLink.href = `product.html?id=${product.id}`;
    productLink.appendChild(productName);

    productDiv.appendChild(productLink);
    productDiv.appendChild(productImage);
    productDiv.appendChild(productDescription);
    productDiv.appendChild(productCategory);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(addToCartButton);

    return productDiv;
}

function populateCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(products.map(product => product.category))];
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

function clearCart() {
    cartItems = [];
    updateCart();
}

function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const searchQuery = document.getElementById('searchProduct').value.toLowerCase();

    let filteredProducts = products;

    if (categoryFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }

    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery) || product.description.toLowerCase().includes(searchQuery)
        );
    }

    displayProducts(filteredProducts);
}

window.onload = initializePage;