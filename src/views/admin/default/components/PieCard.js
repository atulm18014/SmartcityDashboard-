import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import { Card, Flex, Text, useColorModeValue } from '@chakra-ui/react';

// Fetch air quality data from the JSON file
async function fetchAirQualityData() {
  const response = await fetch("../default/hourdata.json"); // Ensure the correct path to the public folder
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

// Simple prediction function for GHG emissions
function predictGHGEmissions(data) {
  // Weights for pollutants based on their contribution to GHG emissions
  const weights = {
    NO: 0.1, // Adjust these weights based on research
    NO2: 0.2,
    CO: 0.3,
    SO2: 0.4,
  };

  let totalEmission = 0;

  // Calculate total GHG emission using a weighted sum
  data.forEach((entry) => {
    totalEmission +=
      entry.NO * weights.NO +
      entry.NO2 * weights.NO2 +
      entry.CO * weights.CO +
      entry.SO2 * weights.SO2;
  });

  return totalEmission;
}

const DonutChart = () => {
  const [series, setSeries] = useState([44, 55, 13, 33]); // Default series data (placeholders)
  const [predictedValue, setPredictedValue] = useState(0); // Predicted value to be displayed

  // Fetch and predict emissions when the component is mounted
  useEffect(() => {
    async function simulateRealTimePrediction() {
      try {
        const airQualityData = await fetchAirQualityData(); // Fetch data
        const latestData = airQualityData[airQualityData.length - 1]; // Get the latest data point

        const predictedEmissions = predictGHGEmissions([latestData]);

        // Update the chart series with the latest gas data
        const gasSeries = [
          latestData.NO || 34,  // NO value
          latestData.NO2 || 0.5, // NO2 value
          latestData.CO || 43,  // CO value
          latestData.SO2 || 3, // SO2 value
        ];

        setSeries(gasSeries); // Update the series with gas data
        setPredictedValue(predictedEmissions.toFixed(2)); // Update predicted emissions
      } catch (error) {
        console.error("Error fetching the data:", error);
      }
    }

    simulateRealTimePrediction();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Chart options
  const options = {
    chart: {
      type: "donut",
      width: 380,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "22px",
              fontWeight: 600,
              color: "#373d3f",
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: "22px",
              fontWeight: 600,
              color: "#373d3f",
              offsetY: 10,
              formatter: () => `${predictedValue} units`, // Display predicted value in the center
            },
            total: {
              show: true,
              label: "Predicted GHG",
              color: "#373d3f",
              fontSize: "18px",
              formatter: () => `${predictedValue} units`, // Display predicted value
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    labels: ["NO", "NO2", "CO", "SO2"], // Labels for each gas
    legend: {
      position: "right",
      offsetY: 0,
      height: 230,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Card align='center' direction='column' w='100%' borderRadius='20px'>
       <Flex w='100%' mx='10px' flexDirection='column' align='start' px='10px' pt='5px'>
        <Text
          px='20px'
          py='10px'
          color={textColor}
          fontSize='34px'
          fontWeight='700'
          lineHeight='100%'
        >
         Current GHG Emission
        </Text>
        </Flex>
    <div>
      <div id="chart">
        <ApexCharts options={options} series={series} type="donut" width={380} />
      </div>
    </div>
    </Card>
  );
};

export default DonutChart;
