import { Box, Image, Text, Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import Router from "next/router";
import React from "react";

const Home: NextPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="90vh"
    >
      <Image
        alt="diamond-logo"
        mb="10px"
        width="65px"
        src="./img/diamond_logo.png"
      />
      <Text fontSize="4xl" fontWeight="600">
        Chainverse
      </Text>
      <Text mt="10px" fontSize="sm">
        Welcome to your DAO Dashboard.
      </Text>

      <Button
        mt="20px"
        bg="diamond.blue.3"
        color="diamond.white"
        onClick={() => Router.push("/discover")}
      >
        ENTER
      </Button>
    </Box>
  );
};

export default Home;
