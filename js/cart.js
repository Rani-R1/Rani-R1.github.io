// Shopping cart functionality

document.addEventListener("DOMContentLoaded", () => {
  // Load cart items
  loadCartItems()

  // Add event listener to checkout button
  const checkoutBtn = document.getElementById("checkout-btn")
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      openCheckoutModal()
    })
  }

  // Add event listener to promo code button
  const applyPromoBtn = document.getElementById("apply-promo")
  if (applyPromoBtn) {
    applyPromoBtn.addEventListener("click", () => {
      applyPromoCode()
    })
  }

  // Add event listeners to modal close buttons
  const closeModalButtons = document.querySelectorAll(".close-modal")
  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeAllModals()
    })
  })

  // Add event listener to checkout form
  const checkoutForm = document.getElementById("checkout-form")
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault()
      processOrder()
    })
  }

  // Add event listener to continue shopping button
  const continueShoppingBtn = document.getElementById("continue-shopping")
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener("click", () => {
      closeAllModals()
      window.location.href = "index.html"
    })
  }

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    const checkoutModal = document.getElementById("checkout-modal")
    const confirmationModal = document.getElementById("order-confirmation")

    if (e.target === checkoutModal || e.target === confirmationModal) {
      closeAllModals()
    }
  })
})

// Load cart items from localStorage
function loadCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const cartItemsContainer = document.getElementById("cart-items-container")
  const cartEmptyMessage = document.getElementById("cart-empty")
  const cartContent = document.getElementById("cart-content")

  if (cart.length === 0) {
    // Cart is empty
    cartEmptyMessage.classList.remove("hidden")
    cartContent.classList.add("hidden")
    return
  }

  // Cart has items
  cartEmptyMessage.classList.add("hidden")
  cartContent.classList.remove("hidden")

  // Clear container
  cartItemsContainer.innerHTML = ""

  // Add each item to the container
  cart.forEach((item) => {
    const cartItemElement = createCartItemElement(item)
    cartItemsContainer.appendChild(cartItemElement)
  })

  // Update summary
  updateCartSummary()
}

// Create cart item element
function createCartItemElement(item) {
  const cartItem = document.createElement("div")
  cartItem.className = "cart-item"

  cartItem.innerHTML = `
    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
    <div class="cart-item-details">
      <h3 class="cart-item-title">${item.name}</h3>
      <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
      <div class="cart-item-quantity">
        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
        <button class="quantity-btn increase" data-id="${item.id}">+</button>
      </div>
    </div>
    <button class="cart-item-remove" data-id="${item.id}">
      <i class="fas fa-trash"></i> Remove
    </button>
  `

  // Add event listeners to quantity buttons
  const decreaseBtn = cartItem.querySelector(".decrease")
  const increaseBtn = cartItem.querySelector(".increase")
  const quantityInput = cartItem.querySelector(".quantity-input")
  const removeBtn = cartItem.querySelector(".cart-item-remove")

  decreaseBtn.addEventListener("click", function () {
    const id = this.getAttribute("data-id")
    updateItemQuantity(id, -1)
  })

  increaseBtn.addEventListener("click", function () {
    const id = this.getAttribute("data-id")
    updateItemQuantity(id, 1)
  })

  quantityInput.addEventListener("change", function () {
    const id = this.getAttribute("data-id")
    const newQuantity = Number.parseInt(this.value)
    setItemQuantity(id, newQuantity)
  })

  removeBtn.addEventListener("click", function () {
    const id = this.getAttribute("data-id")
    removeCartItem(id)
  })

  return cartItem
}

// Update item quantity
function updateItemQuantity(id, change) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const itemIndex = cart.findIndex((item) => item.id === id)

  if (itemIndex === -1) return

  cart[itemIndex].quantity += change

  // Ensure quantity is at least 1
  if (cart[itemIndex].quantity < 1) {
    cart[itemIndex].quantity = 1
  }

  // Save updated cart
  localStorage.setItem("cart", JSON.stringify(cart))

  // Reload cart items
  loadCartItems()

  // Update cart count in header
  updateCartCount()
}

// Set item quantity to a specific value
function setItemQuantity(id, quantity) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const itemIndex = cart.findIndex((item) => item.id === id)

  if (itemIndex === -1) return

  // Ensure quantity is at least 1
  cart[itemIndex].quantity = Math.max(1, quantity)

  // Save updated cart
  localStorage.setItem("cart", JSON.stringify(cart))

  // Reload cart items
  loadCartItems()

  // Update cart count in header
  updateCartCount()
}

// Remove item from cart
function removeCartItem(id) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const updatedCart = cart.filter((item) => item.id !== id)

  // Save updated cart
  localStorage.setItem("cart", JSON.stringify(updatedCart))

  // Reload cart items
  loadCartItems()

  // Update cart count in header
  updateCartCount()
}

// Update cart summary
function updateCartSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  // Calculate shipping (free over $50, otherwise $2.00)
  const shipping = subtotal > 50 ? 0 : 2.00
  // Calculate tax (8% of subtotal)
  const tax = subtotal * 0.08

  // Calculate total
  const total = subtotal + shipping + tax

  // Update summary in cart page
  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`
  document.getElementById("shipping").textContent = subtotal > 50 ? "FREE" : `$${shipping.toFixed(2)}`
  document.getElementById("tax").textContent = `$${tax.toFixed(2)}`
  document.getElementById("total").textContent = `$${total.toFixed(2)}`

  // Update summary in checkout modal if it's open
  const modalSubtotal = document.getElementById("modal-subtotal")
  const modalShipping = document.getElementById("modal-shipping")
  const modalTax = document.getElementById("modal-tax")
  const modalTotal = document.getElementById("modal-total")

  if (modalSubtotal && modalShipping && modalTax && modalTotal) {
    modalSubtotal.textContent = `$${subtotal.toFixed(2)}`
    modalShipping.textContent = subtotal > 50 ? "FREE" : `$${shipping.toFixed(2)}`
    modalTax.textContent = `$${tax.toFixed(2)}`
    modalTotal.textContent = `$${total.toFixed(2)}`
  }
}

// Apply promo code
function applyPromoCode() {
  const promoCode = document.getElementById("promo-code").value.trim().toUpperCase()

  // Demo promo codes
  const promoCodes = {
    WELCOME10: 0.1, // 10% off
    SAVE20: 0.2, // 20% off
    FREESHIP: 0, // Free shipping (handled separately)
    ALXHU: 0.99 
  }

  if (promoCode in promoCodes) {
    // Valid promo code
    localStorage.setItem("promoCode", promoCode)
    localStorage.setItem("discount", promoCodes[promoCode])

    alert(`Promo code "${promoCode}" applied successfully!`)
    updateCartSummary()
  } else {
    // Invalid promo code
    alert("Invalid promo code. Please try again.")
  }
}

// Open checkout modal
function openCheckoutModal() {
  // Check if user is logged in
  if (!checkAuth()) {
    alert("Please log in to checkout.")
    window.location.href = "login.html"
    return
  }

  // Get user data
  const user = JSON.parse(localStorage.getItem("user"))

  // Pre-fill checkout form with user data
  document.getElementById("checkout-name").value = `${user.firstName} ${user.lastName}`
  document.getElementById("checkout-address").value = user.address
  document.getElementById("checkout-phone").value = user.phone

  // Update order summary in modal
  updateCartSummary()

  // Show modal
  document.getElementById("checkout-modal").classList.remove("hidden")
}

// Process order
function processOrder() {
  // Get cart data
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  if (cart.length === 0) {
    alert("Your cart is empty.")
    return
  }

  // Create order object
  const order = {
    id: "ORD-" + Date.now(),
    items: cart,
    user: JSON.parse(localStorage.getItem("user")),
    date: new Date().toISOString(),
    status: "Placed",
    payment: {
      cardNumber: document.getElementById("card-number").value,
      cardName: document.getElementById("card-name").value,
      expiryDate: document.getElementById("expiry-date").value,
    },
    shipping: {
      address: document.getElementById("checkout-address").value,
      phone: document.getElementById("checkout-phone").value,
    },
    total: Number.parseFloat(document.getElementById("modal-total").textContent.replace("$", "")),
  }

  // Save order to localStorage
  const orders = JSON.parse(localStorage.getItem("orders")) || []
  orders.push(order)
  localStorage.setItem("orders", JSON.stringify(orders))

  // Clear cart
  localStorage.removeItem("cart")
  localStorage.removeItem("promoCode")
  localStorage.removeItem("discount")

  // Update cart count
  updateCartCount()

  // Close checkout modal
  document.getElementById("checkout-modal").classList.add("hidden")

  // Show order confirmation
  document.getElementById("order-id").textContent = order.id
  document.getElementById("order-confirmation").classList.remove("hidden")
}

// Close all modals
function closeAllModals() {
  document.getElementById("checkout-modal").classList.add("hidden")
  document.getElementById("order-confirmation").classList.add("hidden")
}

// Update cart count function (defined in main.js but needed here too)
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  const cartCountElements = document.querySelectorAll("#cart-count")
  cartCountElements.forEach((element) => {
    element.textContent = cartCount
  })
}

// Check if user is logged in (defined in main.js but needed here too)
function checkAuth() {
  const user = JSON.parse(localStorage.getItem("user"))
  return !!user
}

