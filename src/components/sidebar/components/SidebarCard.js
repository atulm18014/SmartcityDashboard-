import {
  Button,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export default function SidebarDocs() {
  const bgColor = " #4318FF ";
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignIn = () => {
    navigate("/auth/sign-in"); // Programmatically navigate to the sign-in page
  };

  return (
    <Flex
      justify='center'
      direction='column'
      align='center'
      bg={bgColor}
      borderRadius='15px'
      color={"white"}
      position='relative'>
        {/* <Button
          onClick={handleSignIn} // Use onClick to navigate
          bg='whiteAlpha.30'
          _hover={{ bg: "whiteAlpha.20" }}
          _active={{ bg: "whiteAlpha.20" }}
          color={"white"}
          fontWeight='regular'
          fontSize='sm'
         >
          Sign-IN to Admin Dashboard
        </Button> */}
    </Flex>
  );
}
