// User authentication functionality

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

// Initialize auth state
document.addEventListener("DOMContentLoaded", () => {
  checkAuth()

  // Logout functionality
  const logoutBtn = document.getElementById("logout-btn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user")
      localStorage.removeItem("cart")
      window.location.href = "index.html"
    })
  }

  // Login form submission
  const loginForm = document.getElementById("login-form")
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const phone = document.getElementById("phone").value
      const password = document.getElementById("password").value

      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || []

      // Find user with matching phone and password
      const user = users.find((u) => u.phone === phone && u.password === password)

      if (user) {
        // Login successful
        localStorage.setItem("user", JSON.stringify(user))
        window.location.href = "index.html"
      } else {
        // Login failed
        alert("Invalid phone number or password. Please try again.")
      }
    })
  }

  // Signup form submission
  const signupForm = document.getElementById("signup-form")
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const firstName = document.getElementById("first-name").value
      const lastName = document.getElementById("last-name").value
      const phone = document.getElementById("phone").value
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      const confirmPassword = document.getElementById("confirm-password").value
      const address = document.getElementById("address").value
      const latitude = document.getElementById("latitude").value
      const longitude = document.getElementById("longitude").value

      // Validate password match
      if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.")
        return
      }

      // Get existing users or initialize empty array
      const users = JSON.parse(localStorage.getItem("users")) || []

      // Check if user with phone already exists
      if (users.some((u) => u.phone === phone)) {
        alert("A user with this phone number already exists. Please login or use a different phone number.")
        return
      }

      // Create new user object
      const newUser = {
        id: Date.now().toString(),
        firstName,
        lastName,
        phone,
        email,
        password,
        address,
        location: {
          latitude,
          longitude,
        },
        createdAt: new Date().toISOString(),
      }

      // Add user to users array
      users.push(newUser)

      // Save updated users array to localStorage
      localStorage.setItem("users", JSON.stringify(users))

      // Auto-login the new user
      localStorage.setItem("user", JSON.stringify(newUser))

      // Redirect to home page
      window.location.href = "index.html"
    })
  }
})

