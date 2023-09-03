const itemList = document.querySelectorAll(".add-to-cart");
const cartList = document.getElementById("cart-list");
const totalElement = document.getElementById("total");
const taxElement = document.getElementById("tax");
const grandTotalElement = document.getElementById("grand-total");
const addItemButtons = document.querySelectorAll(".add-to-cart");
const removeItemButtons = document.querySelectorAll(".remove-from-cart");

let cart = [];



removeItemButtons.forEach((item) => {
    item.addEventListener("click", () => {
        const itemName = item.parentElement.querySelector(".item-name").textContent;
        const itemPrice = parseFloat(item.getAttribute("data-price"));
        removeFromCart(itemName, itemPrice);
        updateCart();
    });
});

itemList.forEach((item) => {
    item.addEventListener("click", () => {
        const itemName = item.parentElement.querySelector(".item-name").textContent;
        const itemPrice = parseFloat(item.getAttribute("data-price"));
        addToCart(itemName, itemPrice);
        updateCart();
    });
});

function addToCart(name, price) {
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1,
        });
    }
}

function removeFromCart(name, price) {
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
        if (existingItem.quantity > 0) {
            existingItem.quantity--;
        } else {
            cart = cart.filter((item) => item.name !== name);
        }
    }
}

function updateCart() {
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} x${item.quantity} - $${item.price * item.quantity}`;
        cartList.appendChild(li);
        total += item.price * item.quantity;
    });

    const taxRate = 0.11; // Pajak 11%
    const tax = total * taxRate;
    const grandTotal = total + tax;

    totalElement.textContent = total.toFixed(2);
    taxElement.textContent = tax.toFixed(2);
    grandTotalElement.textContent = grandTotal.toFixed(2);
}
