import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { AddBlockIcon } from "../Icons/AddBlockIcon";
import { CreateSnapshotIcon } from "../Icons/CreateSnapshotIcon";

type Props = {};

export const CreateSnapshotButton = (props: Props) => {
  return (
    <Button
      bg="diamond.blue.5"
      maxH="32px"
      color="diamond.white"
      fontSize="0.875rem"
      fontWeight="400"
      display="flex"
      _hover={{ bg: "diamond.blue.5" }}
    >
      <Box>
        <CreateSnapshotIcon />
      </Box>
      <Text ml="5px">Create Snapshot</Text>
    </Button>
  );
};
