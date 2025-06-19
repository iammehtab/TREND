window.onload = function () {
  displayCart();
};

function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    const price = parseFloat(item.currentprice);
    const quantity = item.quantity || 1;
    const itemTotal = price * quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="item-info">
        <p><strong>${item.name}</strong></p>

        <p class="quantity-box">
          <span class="minus" onclick="changeQuantity(${index}, -1)">&lt;</span>
          <span class="quantity">${quantity}</span>
          <span class="plus" onclick="changeQuantity(${index}, 1)">&gt;</span>
        </p>

        <div class="price-line">
          <span class="discounted-price">₹${item.currentprice}</span>
          <span class="original-price"><del>₹${item.originalprice}</del></span>
          <p class="item-total">Total: ₹${itemTotal.toFixed(2)}</p>
        </div>
      </div>

      <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
    `;

    cartItems.appendChild(div);
  });

  // Add cart summary and re-attach checkout click
  const cartSummary = document.querySelector(".cart-summary");
  cartSummary.innerHTML = `
    <h3>Cart Total: ₹${total.toFixed(2)}</h3>
    <button class="checkout-btn" id="checkout-btn">Proceed to Checkout</button>
  `;

  // Attach event listener after re-rendering
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", handleCheckoutClick);
  }
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function changeQuantity(index, change) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cart[index].quantity) cart[index].quantity = 1;

  cart[index].quantity += change;
  if (cart[index].quantity < 1) cart[index].quantity = 1;

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function handleCheckoutClick() {
  window.location.href = "billing.html";
}
