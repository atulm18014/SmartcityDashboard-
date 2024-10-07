import React, { useState } from "react";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom component
import DefaultAuth from "layouts/auth/Default";
// Assets
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
// Firebase imports
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // For navigation after sign-in

// Firebase configuration (add your own Firebase config here)
const firebaseConfig = {
  apiKey: "AIzaSyDg-RmlXU9cBsQYtE2bnDVG6Pwj06KpYpw",
  authDomain: "smart-city-dashboard-ce2b6.firebaseapp.com",
  projectId: "smart-city-dashboard-ce2b6",
  storageBucket: "smart-city-dashboard-ce2b6.appspot.com",
  messagingSenderId: "937496293880",
  appId: "1:937496293880:web:c3333e5356ab8068f7660d",
  measurementId: "G-MVQLHG2HRX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");

  // React states
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // React Router's navigation hook

  const handleClick = () => setShow(!show);

  const handleSignIn = async () => {
    try {
      // Firebase sign-in
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to home page after successful sign-in
      navigate("/rtl/rtl-default");
    } catch (err) {
      // Log error to console and set error message for UI
      console.error("Sign in error:", err); // Log to console
      setError(err.message); // Display error message in UI
    }
  };

  return (
    <DefaultAuth>
      <Flex
        h="100%"
        w="100%"
        alignItems="center"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        flexDirection="column"
      >
        <Box textAlign="center" mt="20px">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign In
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and password to sign-in to Admin Dashboard
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="mail@simmmple.com"
              mb="24px"
              fontWeight="500"
              size="lg"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            {error && (
              <Text color="red.500" fontSize="sm" mb="24px">
                {error} {/* Error message shown here */}
              </Text>
            )}
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              onClick={handleSignIn} // Trigger sign-in on click
            >
              Sign In
            </Button>
          </FormControl>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
