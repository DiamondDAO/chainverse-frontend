import { Box, Image } from "@chakra-ui/react";
import React, { FC } from "react";
import * as styles from "./styles";
export const Loader: FC = () => {
  return (
    <Box sx={styles.Loader}>
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
