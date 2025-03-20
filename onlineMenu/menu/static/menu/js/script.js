const cart = {};
const cartCountElement = document.getElementById("cart-count");
const cartItemsElement = document.getElementById("cart-items");

function addToCart(item) {
    // Если товар еще не в корзине, добавляем его с количеством 1
    if (!cart[item]) {
        cart[item] = 1;

        // Показываем управление количеством, когда товар добавлен
        document.querySelector(`.quantity-controls[data-item="${item}"]`).classList.remove("hidden");
        document.querySelector(`button[onclick="addToCart('${item}')"]`).classList.add("hidden");
    }
    // Обновляем корзину после добавления товара
    updateCart();
}

function increaseQuantity(item) {
    cart[item]++;
    updateCart();
}

function decreaseQuantity(item) {
    if (cart[item] > 1) {
        cart[item]--;
    } else {
        delete cart[item];
        // Скрыть управление количеством и вернуть кнопку добавления товара
        document.querySelector(`.quantity-controls[data-item="${item}"]`).classList.add("hidden");
        document.querySelector(`button[onclick="addToCart('${item}')"]`).classList.remove("hidden");
    }
    updateCart();
}

function updateCart() {
    let totalCount = 0;          // Общее количество товаров
    let totalPrice = 0;          // Итоговая сумма заказа
    cartItemsElement.innerHTML = ""; // Очищаем корзину

    for (const [itemId, quantity] of Object.entries(cart)) {
        totalCount += quantity;

        // Получаем данные о товаре
        const item = getItemData(itemId); // Функция для получения информации о товаре по его ID

        // Вычисляем цену для данного товара
        const itemTotalPrice = item.price * quantity;
        totalPrice += itemTotalPrice; // Добавляем цену товара к общей сумме

        // Формируем HTML для этого товара
        const itemHtml = `
            <div class="dish">
                <div class="dish-img-block">
                    <img src="${item.image}" alt="${item.name}" class="dish-image">
                </div>

                <div class="dish-info-block">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="price"><p>${itemTotalPrice}р</p></div> <!-- Итоговая цена для товара -->
                    <div class="dish-controls">
                        <div class="quantity-controls" data-item="${itemId}">
                            <button onclick="decreaseQuantity('${itemId}')" class="change-cnt-btn">-</button>
                            <span id="quantity-${itemId}">${quantity}</span>
                            <button onclick="increaseQuantity('${itemId}')" class="change-cnt-btn">+</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Вставляем HTML в корзину
        cartItemsElement.innerHTML += itemHtml;

        // Обновляем количество товара в корзине
        document.getElementById(`quantity-${itemId}`).textContent = quantity;
    }

    // Обновляем общее количество товаров в корзине
    cartCountElement.textContent = totalCount;

    // Выводим итоговую сумму заказа
    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = `Итоговая сумма: ${totalPrice}р`;
    }
}

// Пример функции получения данных о товаре
function getItemData(itemId) {
    // Пример данных о товарах, которые могут быть получены из базы данных или API
    const items = {
        {% for dish in type.dishes.all %}
            "{{ dish.id }}": { name: "{{dish.name}}", description: "{{ dish.description }}", price: {{ dish.price1 }}, image: "pizza.jpg" },
        {% endfor %}
    };

    return items[itemId];
}



function toggleCart() {
    const cart = document.getElementById("cart");
    const overlay = document.getElementById("overlay");

    // Переключение видимости корзины и фона
    cart.classList.toggle("hidden");
    overlay.classList.toggle("hidden");

    // Если корзина открыта, заблокировать прокрутку
    if (!cart.classList.contains("hidden")) {
        document.body.style.overflow = "hidden";  // Блокируем прокрутку страницы
    } else {
        document.body.style.overflow = "";  // Восстанавливаем прокрутку
    }
}

function closeCart() {
    const cart = document.getElementById("cart");
    const overlay = document.getElementById("overlay");

    // Скрыть корзину и фон
    cart.classList.add("hidden");
    overlay.classList.add("hidden");

    // Восстановить прокрутку страницы
    document.body.style.overflow = "";
}

// Обработчик клика по фону (overlay) для закрытия модального окна
document.getElementById("overlay").addEventListener("click", function() {
    closeCart();  // Закрываем корзину при клике на overlay
});