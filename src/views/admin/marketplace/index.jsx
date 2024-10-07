import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox styles
import { Box, useColorModeValue } from "@chakra-ui/react";

// Set your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibXJjaGVlc2UyMyIsImEiOiJjbTFqbGl5b2YwYnl6MmpzZWYyYWtjYnhsIn0.-NMoLX7OlT_LAsuzQRTZSg';

export default function Marketplace() {
  const mapContainerRef = useRef(null);
  
  useEffect(() => {
    // Initialize Mapbox
    const map = new mapboxgl.Map({
      container: mapContainerRef.current, // Container ID
      style: 'mapbox://styles/mrcheese23/cm1lanc25005501pl4k99gjgm', // Stylesheet location
      center: [30, 15], // Starting position [lng, lat]
      zoom: 1, // Starting zoom
    });

    // Add navigation controls to the map
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Cleanup on unmount
    return () => map.remove();
  }, []); // Only run on first render

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");

  return (
    <Box
      ref={mapContainerRef}
      w="100%"
      h="800px"
      borderRadius="20px"
      bg="white"
      mt="80px"
    />
  );
}
