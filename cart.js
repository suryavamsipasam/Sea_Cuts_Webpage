let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count on load
updateCartCount();

document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", () => {
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);
        const img = button.dataset.img;

        const product = { name, price, img, quantity: 1 };

        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert(`${name} added to cart!`);
    });
});

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector("#nav1").innerHTML = `
        <i class="fas fa-shopping-cart me-2"></i>Cart Items (${count})
    `;
}

function clearCart() {
    if (confirm("Are you sure you want to clear the cart?")) {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();

        // Show toast
        const toast = new bootstrap.Toast(document.getElementById('clearToast'));
        toast.show();
    }
}
