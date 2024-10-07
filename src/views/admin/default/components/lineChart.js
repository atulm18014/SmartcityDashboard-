import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import { Card, Flex, Text, useColorModeValue } from '@chakra-ui/react';

const LineChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Process the dataset to extract relevant columns (e.g., year and CO2)
    const processedData = data.map(row => {
      return [new Date(row.year, 0).getTime(), row.co2]; // Month set to 0 for January
    });

    setChartData(processedData);

    const options = {
      series: [{
        name: 'CO2 Emissions (Mt)',
        data: processedData,
      }],
      chart: {
        type: 'line',
        height: 350,
      },
      xaxis: {
        type: 'datetime', // Use datetime for the year values
        title: {
          text: 'Year',
        },
        labels: {
          formatter: function (value) {
            return new Date(value).getFullYear(); // Show only the year
          },
        },
      },
      yaxis: {
        opposite: true,
        title: {
          text: 'CO2 Emissions (Mt)',
        },
      },
      stroke: {
        curve: 'smooth', // Smooth curve for a more visually appealing graph
      },
      markers: {
        size: 0, // Remove markers on each data point
      },
      tooltip: {
        x: {
          format: 'yyyy', // Format the x-axis tooltip
        },
      },
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [data]);

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
          CO2 Emissions Over Time World
        </Text>
      </Flex>
      <div style={{ width: '100%' }}>
        <div id="chart" style={{ width: '95%', height: '350px' }}></div>
      </div>
    </Card>
  );
};

export default LineChart;
