import { Box, Image } from "@chakra-ui/react";
import React from "react";

type Props = {};

export const Loader = () => {
  return (
    <Box
      position="fixed"
      left="0"
      right="0"
      top="0"
      bottom="0"
      display="flex"
      justifyContent={"center"}
      alignItems="center"
    >
      <Box>
        <Image
          alt="rotating-diamond"
          maxHeight="15rem"
          src="/img/animation_diamond.gif"
        />
      </Box>
    </Box>
  );
};
