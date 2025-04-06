import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const MAPBOX_ACCESS_TOKEN = "YOUR_MAPBOX_ACCESS_TOKEN";

const Searchmap = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [places, setPlaces] = useState([]);
  const [searchLocation, setSearchLocation] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [77.209, 28.6139], // Default center (Delhi, India)
      zoom: 12,
    });

    // Add Mapbox Search Box
    const geocoder = new MapboxGeocoder({
      accessToken: MAPBOX_ACCESS_TOKEN,
      mapboxgl: mapboxgl,
      marker: false, // We will add a custom marker
      placeholder: "Search for a location...",
    });

    // Append search box to map
    map.addControl(geocoder, "top-left");

    geocoder.on("result", (event) => {
      const { center } = event.result;
      setSearchLocation(center);
      fetchNearbyPlaces(center);
    });

    mapRef.current = map;
    return () => map.remove();
  }, []);

  const fetchNearbyPlaces = async (center) => {
    const [lng, lat] = center;
    const query = `fertilizer store`; // Searching for fertilizer stores
    const radius = 5000; // 5km radius

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=${lng},${lat}&access_token=${MAPBOX_ACCESS_TOKEN}`
      );
      const data = await response.json();
      setPlaces(data.features);

      // Clear existing markers
      document.querySelectorAll(".mapboxgl-marker").forEach((marker) => marker.remove());

      // Add new markers
      data.features.forEach((place) => {
        new mapboxgl.Marker()
          .setLngLat(place.center)
          .setPopup(new mapboxgl.Popup().setText(place.text))
          .addTo(mapRef.current);
      });

      // Re-center map
      mapRef.current.flyTo({ center: [lng, lat], zoom: 14 });
    } catch (error) {
      console.error("Error fetching nearby places:", error);
    }
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {/* Map Container */}
      <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />

      {/* Results List */}
      <div style={styles.results}>
        {places.map((place) => (
          <div key={place.id} style={styles.placeItem}>
            <h3 style={styles.placeName}>{place.text}</h3>
            <p style={styles.placeAddress}>{place.place_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles
const styles = {
  results: {
    position: "absolute",
    top: "80px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    maxHeight: "200px",
    overflowY: "auto",
  },
  placeItem: {
    padding: "10px",
    borderBottom: "1px solid #ccc",
  },
  placeName: {
    margin: "0",
    fontSize: "16px",
  },
  placeAddress: {
    margin: "5px 0 0",
    color: "#555",
    fontSize: "14px",
  },
};

export default Searchmap;
