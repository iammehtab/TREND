window.onload = () => {
  updatecart();
};

const addtocart = document.querySelectorAll(".add-to-cart");

addtocart.forEach((button) => {
  button.addEventListener("click", () => {
    const product = {
      id: button.dataset.id,
      name: button.dataset.name,
      currentprice: button.dataset.currentprice,
      originalprice: button.dataset.originalprice,
      image: button.dataset.image,
      quantity: 1,
    };
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingitem = cart.findIndex((item) => item.id === product.id);

    if (existingitem !== -1) {
      cart[existingitem].quantity += 1;
    } else {
      cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updatecart();

    console.log(product);
  });
});

function updatecart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalQuantity = 0;

  cart.forEach((item) => {
    totalQuantity += item.quantity || 0;
  });

  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.innerText = totalQuantity;
  }
}
