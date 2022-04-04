import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Handle, Position } from "react-flow-renderer";
import { BlockIcon } from "@/components/Icons/BlockIcon";
import { AddPillsToText } from "@/components/UtilityComponents/AddPillsToText";
import { IconVariants } from "@/common/types";

type Props = {};

export const BlockNode = ({
  data,
}: {
  data: { label: string; dim: boolean; selectNode: () => void };
}) => {
  return (
    <Box
      cursor={"pointer"}
      p="8px"
      onDoubleClick={data.selectNode}
      fontSize="10px"
      maxW="200px"
      borderRadius="8px"
      border="1px solid #000000"
      bg="rgba(0, 0, 0, 0.05)"
      display="flex"
      sx={{ ...(data.dim && { opacity: 0.2, bg: "rgba(0, 0, 0, 0.05)" }) }}
    >
      <Box mr="4px">
        <Box
          p="4px"
          width={"fit-content"}
          height="fit-content"
          bg="black"
          borderRadius="100%"
        >
          <BlockIcon variant={IconVariants.White} />
        </Box>
      </Box>
      <Box verticalAlign="middle">
        <AddPillsToText text={data.label} />
      </Box>
      <Handle type="target" id="a" position={Position.Left} />
      <Handle type="source" id="b" position={Position.Right} />
    </Box>
  );
};
