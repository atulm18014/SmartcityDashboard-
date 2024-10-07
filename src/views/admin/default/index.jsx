import React, { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  useColorModeValue,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import {
  WiDaySunny,
  WiStrongWind,
  WiHumidity,
  WiDust,
  WiBarometer,
  WiCloudy,
} from "react-icons/wi";
import { SearchIcon } from "@chakra-ui/icons";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import co2Data from '../default/data.json';
import co2India from '../default/Co2india.json';

import DailyTraffic from "views/admin/default/components/DailyTraffic";
import DonutChart from "views/admin/default/components/PieCard";
import LineChart from "views/admin/default/components/lineChart";
import Indiaco2 from "views/admin/default/components/Indiaco2";
import Map from "views/admin/default/components/Indiaco2";

export default function UserReports() {
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const api = {
    key: process.env.REACT_APP_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const [weatherData, setWeatherData] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("London");
  const [predictedValue, setPredictedValue] = useState(0);

  const fetchWeatherData = async (city) => {
    try {
      const url = `${api.base}weather?q=${city}&units=metric&appid=${api.key}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        const { lon, lat } = data.coord;
        fetchAQI(lat, lon);
      } else {
        console.error("Error fetching weather data:", data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchAQI = async (lat, lon) => {
    try {
      const aqiUrl = `${api.base}air_pollution?lat=${lat}&lon=${lon}&appid=${api.key}`;
      const aqiResponse = await fetch(aqiUrl);
      const aqiData = await aqiResponse.json();

      if (aqiResponse.ok) {
        setAqi(aqiData.list[0].main.aqi);
      } else {
        console.error("Error fetching AQI:", aqiData.message);
      }
    } catch (error) {
      console.error("AQI Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (search) {
      setCity(search);
      setSearch("");
    }
  };

  const getAQIStatus = (aqiValue) => {
    switch (aqiValue) {
      case 1:
        return "Good";
      case 2:
        return "Fair";
      case 3:
        return "Moderate";
      case 4:
        return "Poor";
      case 5:
        return "Very Poor";
      default:
        return "Unknown";
    }
  };

  useEffect(() => {
    const simulatePrediction = () => {
      const randomPredictedValue = (Math.random() * 100).toFixed(2);
      setPredictedValue(randomPredictedValue);
    };

    simulatePrediction();
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <InputGroup mb="20px" maxW="200px">
        <Input
          placeholder="Enter city name..."
          value={search}
          onChange={handleSearchInput}
        />
        <InputRightElement>
          <Button onClick={handleSearchSubmit} variant="ghost">
            <SearchIcon />
          </Button>
        </InputRightElement>
      </InputGroup>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }} gap="20px" mb="20px">
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={WiDaySunny} color={brandColor} />}
            />
          }
          name="Today's Temperature"
          value={weatherData ? `${weatherData.main.temp}°C` : "Loading..."}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={WiStrongWind} color={brandColor} />}
            />
          }
          name="Wind Speed"
          value={weatherData ? `${weatherData.wind.speed} Km/h` : "Loading..."}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={WiHumidity} color={brandColor} />}
            />
          }
          name="Humidity"
          value={weatherData ? `${weatherData.main.humidity}%` : "Loading..."}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
              icon={<Icon w="32px" h="32px" as={WiDust} color={brandColor} />}
            />
          }
          name="AQI"
          value={aqi ? aqi : "Loading..."}
          growth={aqi ? getAQIStatus(aqi) : ""}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={WiBarometer} color={brandColor} />}
            />
          }
          name="Air Pressure"
          value={weatherData ? `${weatherData.main.pressure} hPa` : "Loading..."}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={WiCloudy} color={brandColor} />}
            />
          }
          name="CO2 Emission"
          value={weatherData ? `${weatherData.main.pressure} ppm` : "Loading..."} 
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <DailyTraffic />
        <LineChart data={co2Data} />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <Indiaco2 data={co2India} />
        <DonutChart predictedValue={predictedValue} />
      </SimpleGrid>
     </Box>
  );
}
