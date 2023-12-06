// Дополнительная логика для работы магазина

let products = JSON.parse(localStorage.getItem('products')) || [];
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function initializePage() {
    displayProducts(products);
    updateCart();
    populateCategoryFilter();
}

function addNewProduct() {
    const productName = document.getElementById('productName').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productDescription = document.getElementById('productDescription').value;
    const productImage = document.getElementById('productImage').value;
    const productCategory = document.getElementById('productCategory').value;

    if (productName && !isNaN(productPrice) && productDescription && productImage && productCategory) {
        const newProduct = {
            id: products.length + 1,
            name: productName,
            price: productPrice,
            description: productDescription,
            image: productImage,
            category: productCategory,
        };

        products.push(newProduct);
        displayProducts(products);
        populateCategoryFilter();
        updateLocalStorage();

        // Очищаем форму после добавления товара
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productDescription').value = '';
        document.getElementById('productImage').value = '';
        document.getElementById('productCategory').value = '';
    } else {
        alert('Пожалуйста, заполните все поля для добавления товара.');
    }
}

function deleteProduct(productId) {
    products = products.filter(product => product.id !== productId);
    displayProducts(products);
    populateCategoryFilter();
    updateLocalStorage();
}

function displayProducts(productsToDisplay) {
    const productsSection = document.getElementById('productsSection');
    productsSection.innerHTML = '';

    productsToDisplay.forEach(product => {
        const productElement = createProductElement(product);
        productsSection.appendChild(productElement);
    });
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

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить товар';
    deleteButton.onclick = function () {
        deleteProduct(product.id);
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
    productDiv.appendChild(deleteButton);

    return productDiv;
}

function populateCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">Все категории</option>';

    const categories = [...new Set(products.map(product => product.category))];
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
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

function updateLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function updateCart() {
    const cartElement = document.getElementById('cart');
    const totalPriceElement = document.getElementById('totalPrice');
    let totalPrice = 0;

    cartElement.innerHTML = '';

    cartItems.forEach(item => {
        const listItem = document.createElement('li');

        const itemName = document.createElement('span');
        itemName.textContent = `${item.name} - $${item.price.toFixed(2)}`;

        const itemQuantity = document.createElement('span');
        itemQuantity.textContent = ` x ${item.quantity}`;

        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.onclick = () => changeQuantity(item.id, 1);

        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.onclick = () => changeQuantity(item.id, -1);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Удалить';
        removeButton.onclick = () => removeFromCart(item.id);

        listItem.appendChild(itemName);
        listItem.appendChild(itemQuantity);
        listItem.appendChild(increaseButton);
        listItem.appendChild(decreaseButton);
        listItem.appendChild(removeButton);

        cartElement.appendChild(listItem);

        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Общая стоимость: $${totalPrice.toFixed(2)}`;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (product) {
        const cartItem = cartItems.find(item => item.id === productId);

        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cartItems.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
            });
        }

        updateCart();
        updateLocalStorage();
    }
}

function changeQuantity(productId, change) {
    const itemIndex = cartItems.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity += change;

        if (cartItems[itemIndex].quantity <= 0) {
            cartItems.splice(itemIndex, 1);
        }

        updateCart();
        updateLocalStorage();
    }
}

function removeFromCart(productId) {
    const itemIndex = cartItems.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        updateCart();
        updateLocalStorage();
    }
}

function clearCart() {
    cartItems = [];
    updateCart();
    updateLocalStorage();
}

// Вызываем инициализацию страницы при загрузке
initializePage();

