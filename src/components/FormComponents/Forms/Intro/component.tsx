import { Box, Heading, Text, Image } from "@chakra-ui/react";
import React, { FC } from "react";

export const IntroContent: FC = () => {
  return (
    <>
      <Heading textAlign="center" mb="30px">
        Welcome to Diamond DAO!
      </Heading>
      <Text>
        {`Thank you for helping build Chainverse. Let's start with some
        path-finding questions to understand what you are looking for in
        community and the types of communities you're passionate about.`}
      </Text>
      <Box display="flex" justifyContent="center">
        <Image
          alt="rotating-diamond"
          maxHeight="15rem"
          src="./img/animation_diamond.gif"
        />
      </Box>
    </>
  );
};
