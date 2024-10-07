/*eslint-disable*/
import React from "react";
import {
  Flex,
  Link,
  List,
  ListItem,
  Text,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Footer() {
  const textColor = useColorModeValue("gray.400", "white");
  const { toggleColorMode } = useColorMode();
  return (
    <Flex
      zIndex='3'
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent='space-between'
      px={{ base: "30px", md: "50px" }}
      pb='30px'>
      <Text
        color={textColor}
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}>
        {" "}
        &copy; {1900 + new Date().getYear()}
        <Text as='span' fontWeight='500' ms='4px'>
          Smart City Dashboard -
          <Link
            mx='3px'
            color={textColor}
            href='https://github.com/atulm18014/SmartcityDashboard-'
            target='_blank'
            fontWeight='700'>
            GITHUB
          </Link>
        </Text>
      </Text>
      <List display='flex'>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>
          <Link
            fontWeight='500'
            color={textColor}
            href='mailto:atulmaurya18.04@gmail.com'>
            Atul Maurya
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>
           <Link
            fontWeight='500'
            color={textColor}
            href='mailto:abhipsasri8183@gmail.com'>
            Abhipsa Srivastava
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>
          <Link
            fontWeight='500'
            color={textColor}
            href='mailto:shristikushwaha18@gmail.com'>
            Shristi Kushwaha
          </Link>
        </ListItem>
        <ListItem>
        <Link
            fontWeight='500'
            color={textColor}
            href='mailto:prashant23122003@gmail.com'>
            Prashant Singh
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
