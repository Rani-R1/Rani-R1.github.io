// Map functionality for signup page

// Initialize map
function initMap() {
  // Default location (Tirana)
  const defaultLocation = { lat: 41, lng: 19 }

  // Create map centered at default location
  const map = new google.maps.Map(document.getElementById("map"), {
    center: defaultLocation,
    zoom: 12,
  })

  // Create marker for selected location
  const marker = new google.maps.Marker({
    position: defaultLocation,
    map: map,
    draggable: true,
  })

  // Update hidden form fields with marker position
  updateLocationFields(marker.getPosition())

  // Add event listener for marker drag end
  marker.addListener("dragend", () => {
    updateLocationFields(marker.getPosition())
  })

  // Add event listener for map click
  map.addListener("click", (event) => {
    marker.setPosition(event.latLng)
    updateLocationFields(event.latLng)
  })

  // Add event listener for "Get My Location" button
  const getLocationBtn = document.getElementById("get-location")
  if (getLocationBtn) {
    getLocationBtn.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }

            // Center map on user's location
            map.setCenter(userLocation)
            marker.setPosition(userLocation)
            updateLocationFields(userLocation)
          },
          () => {
            alert("Error: The Geolocation service failed.")
          },
        )
      } else {
        alert("Error: Your browser doesn't support geolocation.")
      }
    })
  }
}

// Update hidden form fields with location coordinates
function updateLocationFields(position) {
  document.getElementById("latitude").value = position.lat()
  document.getElementById("longitude").value = position.lng()
}

