import React, { useRef } from 'react';
import { IgrGeographicMapModule, IgrGeographicMap, IgrGeographicShapeSeries } from 'igniteui-react-maps';
import { IgrDataChartInteractivityModule } from 'igniteui-react-charts';

// Register the necessary modules
IgrGeographicMapModule.register();
IgrDataChartInteractivityModule.register();

const shapesData = [
  {
    name: "Polygon1",
    shape: [
      { latitude: 37.7749, longitude: -122.4194 }, // San Francisco
      { latitude: 34.0522, longitude: -118.2437 }, // Los Angeles
      { latitude: 36.7783, longitude: -119.4179 }, // California
      { latitude: 37.7749, longitude: -122.4194 }  // Closing the polygon
    ],
    fill: "#FF0000",  // Red fill color
  },
  {
    name: "Polygon2",
    shape: [
      { latitude: 40.7128, longitude: -74.0060 }, // New York
      { latitude: 39.7392, longitude: -104.9903 }, // Denver
      { latitude: 38.2527, longitude: -85.7585 }, // Louisville
      { latitude: 40.7128, longitude: -74.0060 }  // Closing the polygon
    ],
    fill: "#0000FF",  // Blue fill color
  }
];

export default function Marketplace() {
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
        width="1600px"
        height="800px"
        zoomable={true}
        windowRect={{ left: 0, top: 0, width: 0.4, height: 0.4 }} // Initial zoom level
        windowRectChanged={handleWindowRectChanged}               // Event handler for zoom boundaries
      >
        <IgrGeographicShapeSeries
          name="shapes"
          dataSource={shapesData}
          shapeMemberPath="shape"
          fillMemberPath="fill"
        />
      </IgrGeographicMap>
    </div>
  );
}
