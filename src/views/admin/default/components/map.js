import React, { useRef } from 'react';
import { IgrGeographicMapModule, IgrGeographicMap } from 'igniteui-react-maps';
import { IgrDataChartInteractivityModule } from 'igniteui-react-charts';

// Register the necessary modules
IgrGeographicMapModule.register();
IgrDataChartInteractivityModule.register();

// Marketplace Component
const Marketplace = ({ width = "1600px", height = "800px", initialZoom = { left: 0, top: 0, width: 0.4, height: 0.4 } }) => {
  const mapRef = useRef(null);

  // Handle zoom level restrictions
  const handleWindowRectChanged = (event) => {
    const map = mapRef.current;

    if (map) {
      let { left, top, width, height } = map.windowRect;
      
      const minZoom = 0.05;   // Maximum zoom-in level
      const maxZoomOut = 0.4; // Maximum zoom-out level

      // Restrict zoom-in and zoom-out levels
      if (width < minZoom) width = minZoom;
      if (width > maxZoomOut) width = maxZoomOut;
      if (height < minZoom) height = minZoom;
      if (height > maxZoomOut) height = maxZoomOut;

      // Update the map's zoom level
      map.windowRect = { left, top, width, height };
    }
  };

  return (
    <div 
      style={{
        height: "100%", 
        width: "100%", 
        marginTop: "50px", 
        borderRadius: "30px",   // Apply border radius
        overflow: "hidden",     // Ensure map respects the border radius
      }}
    >
      <IgrGeographicMap
        ref={mapRef}
        width={width}
        height={height}
        zoomable={true}
        windowRect={initialZoom} // Use the passed initial zoom level
        windowRectChanged={handleWindowRectChanged} // Event handler for zoom boundaries
      />
    </div>
  );
};

// Exporting the Marketplace component
export default Marketplace;
