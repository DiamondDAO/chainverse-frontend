import { Box, ListItem, UnorderedList } from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import React, { useState } from "react";

type Props = {};

const enum WorkspacePaths {
  Sandbox = "/workspace",
  Blocks = "/workspace/blocks",
  Narratives = "/workspace/narratives",
}

export const WorkspaceNavigator = (props: Props) => {
  const router = useRouter();
  const [selected, setSelected] = useState("/workspace");
  return (
    <Box
      border="0.5px solid black"
      borderColor="diamond.gray.2"
      display="flex"
      flexDir="column"
      cursor={"pointer"}
      fontSize={"0.875rem"}
      bg="white"
      borderRadius="5px"
      sx={{ "&> *": { padding: "10px" } }}
    >
      <Box
        borderTopLeftRadius="5px"
        borderTopRightRadius="5px"
        sx={{
          ...(router.pathname === WorkspacePaths.Sandbox && {
            bg: "diamond.blue.0",
            fontWeight: "500",
          }),
        }}
        onClick={() => Router.push("/workspace")}
      >
        Sandbox
      </Box>
      <Box>
        Workspaces
        <UnorderedList
          color="diamond.gray.3"
          styleType="none"
          marginLeft={"2px"}
          sx={{ "li:before": { content: '"> "', paddingRight: "5px" } }}
        >
          <ListItem>Test</ListItem>
          <ListItem>Test</ListItem>
          <ListItem>Test</ListItem>
        </UnorderedList>
      </Box>
      <Box
        onClick={() => Router.push("/workspace/blocks")}
        sx={{
          ...(router.pathname === WorkspacePaths.Blocks && {
            bg: "diamond.blue.0",
            fontWeight: "500",
          }),
        }}
      >
        All blocks
      </Box>
      <Box
        onClick={() => setSelected("narratives")}
        sx={{
          ...(router.pathname === WorkspacePaths.Narratives && {
            bg: "diamond.blue.0",
            fontWeight: "500",
          }),
        }}
      >
        All narratives
      </Box>
    </Box>
  );
};
