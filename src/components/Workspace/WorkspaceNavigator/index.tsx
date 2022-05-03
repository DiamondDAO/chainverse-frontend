import { Loader } from "@/components/Loader";
import { GET_WORKSPACE_OWNED } from "@/services/Apollo/Queries";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Box, ListItem, UnorderedList } from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import * as styles from "./styles";
type Props = {};

const enum WorkspacePaths {
  Sandbox = "/workspace",
  Blocks = "/workspace/blocks",
  Narratives = "/workspace/narratives",
}

export const WorkspaceNavigator = (props: Props) => {
  const router = useRouter();

  const [{ data: walletData }] = useAccount();
  const [getWorkspaceOwned, { data: workspaceData }] =
    useLazyQuery(GET_WORKSPACE_OWNED);
  useEffect(() => {
    if (walletData?.address) {
      getWorkspaceOwned({
        variables: { where: { wallet: { address: walletData?.address } } },
      });
    }
  }, [walletData?.address]);
  const workspaces = workspaceData?.workspaces;

  return (
    <Box sx={styles.NavigatorContainer}>
      <Box
        sx={styles.SandboxStyle(router.asPath === WorkspacePaths.Sandbox)}
        onClick={() => Router.push("/workspace")}
      >
        Sandbox
      </Box>
      <Box>
        My Workspaces
        <UnorderedList sx={styles.WorkspaceContainer}>
          {workspaces?.map((workspace) => (
            <ListItem
              onClick={() => Router.push(`/workspace/${workspace.uuid}`)}
              key={workspace.uuid}
              sx={styles.SelectedStyle(
                router.asPath === `/workspace/${workspace.uuid}`
              )}
            >
              {workspace.name}
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
      <Box
        onClick={() => Router.push("/workspace/blocks")}
        sx={styles.SelectedStyle(router.asPath === WorkspacePaths.Blocks)}
      >
        My Blocks
      </Box>
      {/* <Box
        onClick={() => setSelected("narratives")}
        sx={{
          ...(router.asPath === WorkspacePaths.Narratives && {
            bg: "diamond.blue.0",
            fontWeight: "500",
          }),
        }}
      >
        My Narratives (Coming soon)
      </Box> */}
    </Box>
  );
};
