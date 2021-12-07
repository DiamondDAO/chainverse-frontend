import {
  Box,
  Image,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { borderStyles } from "../../common/theme";

interface Props {}

export const ComingSoonCard = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Image mb="40px" width="65px" src="./img/diamond_logo.png" />
      <Text fontSize="xl" fontWeight="600">
        This Dashboard is coming soon.
      </Text>
      <Text mt="10px" fontSize="sm">
        Enter email below to be notified.
      </Text>
      <InputGroup mt="10px" maxWidth="400px" {...borderStyles}>
        <Input type={"email"} placeholder="YOUR EMAIL" />
        <InputRightElement width="5rem">
          <Button bg="diamond.link" color="diamond.white" onClick={() => {}}>
            SUBMIT
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};
