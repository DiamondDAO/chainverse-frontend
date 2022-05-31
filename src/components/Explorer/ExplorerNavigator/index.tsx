import { subText } from "@/theme";
import { Box } from "@chakra-ui/react";
import React, { FC } from "react";
import * as styles from "./styles";
type Props = {};

const enum WorkspacePaths {
  Sandbox = "/workspace",
  Blocks = "/workspace/blocks",
  Narratives = "/workspace/narratives",
}

export const ExplorerNavigator: FC = () => {
  return (
    <Box sx={styles.NavigatorContainer}>
      <Box sx={styles.SearchText}>Search</Box>
      <Box fontSize={"11px"} color="diamond.gray.3">
        Recent Searches (Coming Soon)
      </Box>
      <Box fontSize={"11px"} color="diamond.gray.3">
        Recommendations (Coming Soon)
      </Box>
    </Box>
  );
};
