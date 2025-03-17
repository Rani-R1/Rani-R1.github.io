// Map functionality for signup page

// Initialize map when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // Check if we're on the signup page
  const mapContainer = document.getElementById("map")
  if (mapContainer) {
    // If Google Maps API is loaded, initialize the map
    if (typeof google !== "undefined" && google.maps) {
      initMap()
    } else {
      // If Google Maps API isn't loaded yet, wait for it
      window.initMap = initMap
      console.log("Waiting for Google Maps API to load...")
    }
  }
})

// Initialize map
function initMap() {
  console.log("Initializing map...")

  // Default location (center of the map)
  const defaultLocation = { lat: 40.7128, lng: -74.006 } // New York City

  // Get map container
  const mapContainer = document.getElementById("map")
  if (!mapContainer) {
    console.error("Map container not found")
    return
  }

  // Create map
  const map = new google.maps.Map(mapContainer, {
    center: defaultLocation,
    zoom: 12,
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: true,
    zoomControl: true,
  })

  // Create marker for selected location
  const marker = new google.maps.Marker({
    position: defaultLocation,
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    title: "Your Location",
  })

  // Update hidden form fields with marker position
  updateLocationFields(marker.getPosition())

  // Add event listener for marker drag end
  marker.addListener("dragend", () => {
    updateLocationFields(marker.getPosition())
    console.log("Marker dragged to:", marker.getPosition().toString())
  })

  // Add event listener for map click
  map.addListener("click", (event) => {
    marker.setPosition(event.latLng)
    updateLocationFields(event.latLng)
    console.log("Map clicked at:", event.latLng.toString())
  })

  // Add event listener for "Get My Location" button
  const getLocationBtn = document.getElementById("get-location")
  if (getLocationBtn) {
    getLocationBtn.addEventListener("click", (e) => {
      e.preventDefault() // Prevent form submission

      if (navigator.geolocation) {
        // Show loading indicator or message
        getLocationBtn.textContent = "Getting location..."
        getLocationBtn.disabled = true

        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Success callback
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }

            // Center map on user's location
            map.setCenter(userLocation)
            marker.setPosition(userLocation)
            updateLocationFields(userLocation)

            // Reset button
            getLocationBtn.textContent = "Get My Location"
            getLocationBtn.disabled = false

            console.log("Got user location:", userLocation)
          },
          (error) => {
            // Error callback
            console.error("Geolocation error:", error)

            // Reset button
            getLocationBtn.textContent = "Get My Location"
            getLocationBtn.disabled = false

            // Show error message
            let errorMessage = "Could not get your location. "

            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage += "You denied the request for geolocation."
                break
              case error.POSITION_UNAVAILABLE:
                errorMessage += "Location information is unavailable."
                break
              case error.TIMEOUT:
                errorMessage += "The request to get your location timed out."
                break
              case error.UNKNOWN_ERROR:
                errorMessage += "An unknown error occurred."
                break
            }

            alert(errorMessage)
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          },
        )
      } else {
        alert("Geolocation is not supported by this browser.")
      }
    })
  }

  console.log("Map initialized successfully")
}

// Update hidden form fields with location coordinates
function updateLocationFields(position) {
  const latitudeField = document.getElementById("latitude")
  const longitudeField = document.getElementById("longitude")

  if (latitudeField && longitudeField) {
    // Check if position is a LatLng object or a simple object
    if (typeof position.lat === "function") {
      latitudeField.value = position.lat()
      longitudeField.value = position.lng()
    } else {
      latitudeField.value = position.lat
      longitudeField.value = position.lng
    }

    // Trigger change event to notify any listeners
    latitudeField.dispatchEvent(new Event("change"))
    longitudeField.dispatchEvent(new Event("change"))
  } else {
    console.error("Latitude or longitude fields not found")
  }
}

// Geocode an address to get coordinates
function geocodeAddress(address, callback) {
  if (!address || typeof google === "undefined") return

  const geocoder = new google.maps.Geocoder()

  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK" && results[0]) {
      const location = results[0].geometry.location
      callback(location)
    } else {
      console.error("Geocoding failed:", status)
      alert("Could not find coordinates for this address. Please select your location on the map.")
    }
  })
}

// Handle address field changes to update map
document.addEventListener("DOMContentLoaded", () => {
  const addressField = document.getElementById("address")
  if (addressField) {
    // Add a debounced event listener for address changes
    let timeout = null
    addressField.addEventListener("input", function () {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        const address = this.value.trim()
        if (address.length > 10) {
          // Only geocode if address is substantial
          geocodeAddress(address, (location) => {
            if (typeof google !== "undefined" && google.maps) {
              const mapContainer = document.getElementById("map")
              const map = new google.maps.Map(mapContainer, {
                center: location,
                zoom: 12,
                mapTypeControl: true,
                streetViewControl: false,
                fullscreenControl: true,
                zoomControl: true,
              })

              const marker = new google.maps.Marker({
                position: location,
                map: map,
                draggable: true,
                animation: google.maps.Animation.DROP,
                title: "Your Location",
              })

              mapContainer.map = map
              mapContainer.marker = marker

              updateLocationFields(location)
            }
          })
        }
      }, 1000) // Wait 1 second after typing stops
    })
  }
})

