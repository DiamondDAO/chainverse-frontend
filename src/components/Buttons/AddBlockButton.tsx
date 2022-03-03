import { Box, Button, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { AddBlockIcon } from "../Icons/AddBlockIcon";

interface IButton {
  onClick: () => void;
}

export const AddBlockButton: FC<IButton> = ({ onClick }) => {
  return (
    <Button
      bg="diamond.blue.5"
      maxH="32px"
      color="diamond.white"
      fontSize="0.875rem"
      fontWeight="400"
      display="flex"
      onClick={onClick}
      _hover={{ bg: "diamond.blue.5" }}
    >
      <Box>
        <AddBlockIcon />
      </Box>
      <Text ml="5px">Add block</Text>
    </Button>
  );
};
