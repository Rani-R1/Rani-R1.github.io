
const featuredProducts = [
  {
    id: 1,
    name: "Product 1",
    image: "image1.jpg",
    price: 19.99,
    rating: 4.5,
    reviews: 100,
    category: "electronics",
  },
  {
    id: 2,
    name: "Product 2",
    image: "image2.jpg",
    price: 29.99,
    rating: 4,
    reviews: 50,
    category: "clothing",
  },
  // Add more products as needed
]


// Load products into a container
function loadProducts(container, productsArray) {
  container.innerHTML = ""

  productsArray.forEach((product) => {
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
      <div class="product-category">${product.category}</div>
      <h3 class="product-title">${product.name}</h3>
      <div class="product-price">$${product.price.toFixed(2)}</div>
      <div class="product-rating">
        ${starsHtml}
        <span>(${product.reviews})</span>
      </div>
      <div class="product-actions">
        <button class="btn primary-btn add-to-cart" data-id="${product.id}" data-category="${getProductCategory(product)}">
          Add to Cart
        </button>
      </div>
    </div>
  `

  // Add event listener to the Add to Cart button
  const addToCartBtn = productCard.querySelector(".add-to-cart")
  addToCartBtn.addEventListener("click", function () {
    const productId = this.getAttribute("data-id")
    const category = this.getAttribute("data-category")
    addToCart(productId, category)
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

// Determine product category
function getProductCategory(product) {
  for (const category in products) {
    if (products[category].some((p) => p.id === product.id)) {
      return category
    }
  }
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
      category: product.category,
      productCategory: category,
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

// Check if user is logged in
function checkAuth() {
  const user = JSON.parse(localStorage.getItem("user"))
  if (user) {
    // User is logged in
    document.getElementById("login-btn").classList.add("hidden")
    document.getElementById("signup-btn").classList.add("hidden")
    document.getElementById("user-profile").classList.remove("hidden")
    document.getElementById("username").textContent = `${user.firstName}`
    return true
  } else {
    // User is not logged in
    document.getElementById("login-btn").classList.remove("hidden")
    document.getElementById("signup-btn").classList.remove("hidden")
    document.getElementById("user-profile").classList.add("hidden")
    return false
  }
}

