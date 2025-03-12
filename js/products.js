console.log("Products data:", products)

document.addEventListener("DOMContentLoaded", () => {
  // Load products based on current page
  const currentPage = window.location.pathname.split("/").pop()

  console.log("Current page:", window.location.pathname)

  if (currentPage === "grocery.html") {
    loadCategoryProducts("grocery")
  } else if (currentPage === "pharmaceutical.html") {
    loadCategoryProducts("pharmaceutical")
  } else if (currentPage === "stationery.html") {
    loadCategoryProducts("stationery")
  } else if (currentPage === "misc.html") {
    loadCategoryProducts("misc")
  }

  // Add event listener to sort control
  const sortBySelect = document.getElementById("sort-by")

  if (sortBySelect) {
    sortBySelect.addEventListener("change", () => {
      applySortAndFilter()
    })
  }
})

// Load products for a specific category
function loadCategoryProducts(category) {
  console.log("Loading category:", category)
  const productsContainer = document.getElementById(`${category}-products`)
  console.log("Products container:", productsContainer)
  if (productsContainer && products[category]) {
    console.log("Products for category:", products[category])
    loadProducts(productsContainer, products[category])
  } else {
    console.error(`Container for ${category} products not found or products data missing`)
  }
}

// Load products into a container
function loadProducts(container, productList) {
  container.innerHTML = "" // Clear existing products
  productList.forEach((product) => {
    const productCard = createProductCard(product)
    container.appendChild(productCard)
  })
}

// Create a product card element
function createProductCard(product) {
  const productCard = document.createElement("div")
  productCard.className = "product-card"

  // Generate star rating HTML
  const starsHtml = generateStarRating(product.rating)

  productCard.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-details">
      <h3 class="product-title">${product.name}</h3>
      <div class="product-price">$${product.price.toFixed(2)}</div>
      <div class="product-rating">
        ${starsHtml}
        <span>(${product.reviews})</span>
      </div>
      <div class="product-actions">
        <button class="btn primary-btn add-to-cart" data-id="${product.id}">
          Add to Cart
        </button>
      </div>
    </div>
  `

  // Add event listener to the Add to Cart button
  const addToCartBtn = productCard.querySelector(".add-to-cart")
  addToCartBtn.addEventListener("click", function () {
    const productId = this.getAttribute("data-id")
    addToCart(productId, getCurrentCategory())
  })

  return productCard
}

// Generate star rating HTML
function generateStarRating(rating) {
  let starsHtml = ""
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    starsHtml += '<i class="fas fa-star"></i>'
  }

  // Add half star if needed
  if (halfStar) {
    starsHtml += '<i class="fas fa-star-half-alt"></i>'
  }

  // Add empty stars
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)
  for (let i = 0; i < emptyStars; i++) {
    starsHtml += '<i class="far fa-star"></i>'
  }

  return starsHtml
}

// Apply sorting to products
function applySortAndFilter() {
  const category = getCurrentCategory()
  const sortBy = document.getElementById("sort-by").value

  // Get products for the current category
  const sortedProducts = [...products[category]]

  // Apply sort
  if (sortBy === "price-low") {
    sortedProducts.sort((a, b) => a.price - b.price)
  } else if (sortBy === "price-high") {
    sortedProducts.sort((a, b) => b.price - a.price)
  } else if (sortBy === "popularity") {
    sortedProducts.sort((a, b) => b.reviews - a.reviews)
  } else if (sortBy === "newest") {
    // For demo purposes, we'll just reverse the array
    sortedProducts.reverse()
  }

  // Update the products display
  const productsContainer = document.getElementById(`${category}-products`)
  if (productsContainer) {
    loadProducts(productsContainer, sortedProducts)
  }
}

// Get current category based on the page
function getCurrentCategory() {
  const currentPage = window.location.pathname.split("/").pop()
  if (currentPage === "grocery.html") return "grocery"
  if (currentPage === "pharmaceutical.html") return "pharmaceutical"
  if (currentPage === "stationery.html") return "stationery"
  if (currentPage === "misc.html") return "misc"
  return null
}

// Add product to cart
function addToCart(productId, category) {
  // Get cart from localStorage or initialize empty array
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  // Find product in products data
  const product = products[category].find((p) => p.id === productId)

  if (!product) {
    console.error("Product not found")
    return
  }

  // Check if product is already in cart
  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    // Increment quantity if product is already in cart
    existingItem.quantity += 1
  } else {
    // Add new item to cart
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart))

  // Update cart count
  updateCartCount()

  // Show confirmation message
  alert(`${product.name} added to cart!`)
}

// Update cart count in header
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  const cartCountElements = document.querySelectorAll("#cart-count")
  cartCountElements.forEach((element) => {
    element.textContent = cartCount
  })
}

