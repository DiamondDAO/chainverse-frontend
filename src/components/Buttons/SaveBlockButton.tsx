import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { SaveBlockIcon } from "../Icons/SaveBlockIcon";

type Props = {};

export const SaveBlockButton = ({
  isLoading,
  bg = "diamond.gray.2",
  onClick,
}: {
  isLoading?: boolean;
  bg?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <Button
      isLoading={isLoading}
      bg={bg}
      maxW="112px"
      maxH="32px"
      color="diamond.white"
      fontSize="0.875rem"
      fontWeight="400"
      borderRadius="5px"
      display="flex"
      px="14px"
      _hover={{ bg }}
      onClick={onClick}
    >
      <Box>
        <SaveBlockIcon />
      </Box>
      <Text ml="5px">Save block</Text>
    </Button>
  );
};
