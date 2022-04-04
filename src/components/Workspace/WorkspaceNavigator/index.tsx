import { Loader } from "@/components/Loader";
import { GET_WORKSPACES } from "@/services/Apollo/Queries";
import { useQuery } from "@apollo/client";
import { Box, ListItem, UnorderedList } from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import React, { useMemo, useState } from "react";

type Props = {};

const enum WorkspacePaths {
  Sandbox = "/workspace",
  Blocks = "/workspace/blocks",
  Narratives = "/workspace/narratives",
}

export const WorkspaceNavigator = (props: Props) => {
  const router = useRouter();
  const [selected, setSelected] = useState("/workspace");

  const { data: workspaceData } = useQuery(GET_WORKSPACES);

  const workspaces = workspaceData?.workspaces;

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
          ...(router.asPath === WorkspacePaths.Sandbox && {
            bg: "diamond.blue.0",
            fontWeight: "500",
          }),
        }}
        onClick={() => Router.push("/workspace")}
      >
        Sandbox
      </Box>
      <Box>
        My Workspaces
        <UnorderedList
          color="diamond.gray.3"
          styleType="none"
          marginLeft={"2px"}
          sx={{ "li:before": { content: '"> "', paddingRight: "5px" } }}
        >
          {workspaces?.map((workspace) => (
            <ListItem
              onClick={() => Router.push(`/workspace/${workspace.uuid}`)}
              key={workspace.uuid}
              sx={{
                ...(router.asPath === `/workspace/${workspace.uuid}` && {
                  bg: "diamond.blue.0",
                  fontWeight: "500",
                }),
              }}
            >
              {workspace.name}
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
      <Box
        onClick={() => Router.push("/workspace/blocks")}
        sx={{
          ...(router.asPath === WorkspacePaths.Blocks && {
            bg: "diamond.blue.0",
            fontWeight: "500",
          }),
        }}
      >
        My Blocks
      </Box>
      <Box
        onClick={() => setSelected("narratives")}
        sx={{
          ...(router.asPath === WorkspacePaths.Narratives && {
            bg: "diamond.blue.0",
            fontWeight: "500",
          }),
        }}
      >
        My Narratives (Coming soon)
      </Box>
    </Box>
  );
};
