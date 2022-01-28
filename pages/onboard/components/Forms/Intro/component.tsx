import { Box, Heading, Text, Image } from "@chakra-ui/react";
import React, { FC } from "react";

export const IntroContent: FC = () => {
  return (
    <>
      <Heading textAlign="center" mb="30px">
        Welcome to Diamond DAO!
      </Heading>
      <Text>
        Before you begin on this journey, we have some pathfinding questions to
        figure out what DAO will best serve you. You can always change these
        preferences later in the preference page.
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
