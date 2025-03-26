document.addEventListener("DOMContentLoaded", () => {
  const mapContainer = document.getElementById("map")
  if (mapContainer) {
    if (typeof google !== "undefined" && google.maps) {
      initMap()
    } else {
      window.initMap = initMap
      console.log("Waiting for Google Maps API to load...")
    }
  }
})

function initMap() {
  console.log("Initializing map...")

  const defaultLocation = { lat: 40.7128, lng: -74.006 } 

  const mapContainer = document.getElementById("map")
  if (!mapContainer) {
    console.error("Map container not found")
    return
  }

  const map = new google.maps.Map(mapContainer, {
    center: defaultLocation,
    zoom: 12,
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: true,
    zoomControl: true,
  })

  const marker = new google.maps.Marker({
    position: defaultLocation,
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    title: "Your Location",
  })

  updateLocationFields(marker.getPosition())

  marker.addListener("dragend", () => {
    updateLocationFields(marker.getPosition())
    console.log("Marker dragged to:", marker.getPosition().toString())
  })

  map.addListener("click", (event) => {
    marker.setPosition(event.latLng)
    updateLocationFields(event.latLng)
    console.log("Map clicked at:", event.latLng.toString())
  })

  const getLocationBtn = document.getElementById("get-location")
  if (getLocationBtn) {
    getLocationBtn.addEventListener("click", (e) => {
      e.preventDefault()

      if (navigator.geolocation) {
        getLocationBtn.textContent = "Getting location..."
        getLocationBtn.disabled = true

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }

            map.setCenter(userLocation)
            marker.setPosition(userLocation)
            updateLocationFields(userLocation)

            getLocationBtn.textContent = "Get My Location"
            getLocationBtn.disabled = false

            console.log("Got user location:", userLocation)
          },
          (error) => {
            console.error("Geolocation error:", error)

            getLocationBtn.textContent = "Get My Location"
            getLocationBtn.disabled = false

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

function updateLocationFields(position) {
  const latitudeField = document.getElementById("latitude")
  const longitudeField = document.getElementById("longitude")

  if (latitudeField && longitudeField) {
    if (typeof position.lat === "function") {
      latitudeField.value = position.lat()
      longitudeField.value = position.lng()
    } else {
      latitudeField.value = position.lat
      longitudeField.value = position.lng
    }

    latitudeField.dispatchEvent(new Event("change"))
    longitudeField.dispatchEvent(new Event("change"))
  } else {
    console.error("Latitude or longitude fields not found")
  }
}

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

document.addEventListener("DOMContentLoaded", () => {
  const addressField = document.getElementById("address")
  if (addressField) {
    let timeout = null
    addressField.addEventListener("input", function () {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        const address = this.value.trim()
        if (address.length > 10) {
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
      }, 1000) 
    })
  }
})

