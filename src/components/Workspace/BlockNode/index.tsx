import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Handle, Position } from "react-flow-renderer";
import { BlockIcon } from "@/components/Icons/BlockIcon";
import { AddPillsToText } from "@/components/UtilityComponents/AddPillsToText";
import { IconVariants } from "@/common/types";
import * as styles from "./styles";
interface IBlockNode {
  data: { label: string; dim: boolean };
}

export const BlockNode: FC<IBlockNode> = ({ data }) => {
  return (
    <Box sx={styles.BlockNodeContainer(data.dim)}>
      <Box mr="4px">
        <Box sx={styles.IconStyle}>
          <BlockIcon variant={IconVariants.White} />
        </Box>
      </Box>
      <Box sx={styles.PillText}>
        <AddPillsToText text={data.label} />
      </Box>
      <Handle type="target" id="a" position={Position.Left} />
      <Handle type="source" id="b" position={Position.Right} />
    </Box>
  );
};
