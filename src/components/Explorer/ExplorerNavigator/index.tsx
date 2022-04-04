import { subText } from "@/theme";
import { Box, ListItem, UnorderedList } from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import React, { useState } from "react";

type Props = {};

const enum WorkspacePaths {
  Sandbox = "/workspace",
  Blocks = "/workspace/blocks",
  Narratives = "/workspace/narratives",
}

export const ExplorerNavigator = (props: Props) => {
  const router = useRouter();
  return (
    <Box
      border="0.5px solid black"
      borderColor="diamond.gray.2"
      display="flex"
      flexDir="column"
      fontSize={subText}
      bg="white"
      borderRadius="5px"
      sx={{ "&> *": { padding: "10px" } }}
    >
      <Box
        fontWeight={"500"}
        borderTopLeftRadius="5px"
        borderTopRightRadius="5px"
        sx={{
          bg: "diamond.blue.0",
        }}
      >
        Search
      </Box>
      <Box fontSize={"11px"} color="diamond.gray.3">
        Recent Searches (Coming Soon)
      </Box>
      <Box fontSize={"11px"} color="diamond.gray.3">
        Recommendations (Coming Soon)
      </Box>
    </Box>
  );
};
