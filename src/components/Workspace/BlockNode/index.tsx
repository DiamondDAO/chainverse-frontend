import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Handle, Position } from "react-flow-renderer";
import { BlockIcon } from "@/components/Icons/BlockIcon";
import { AddPillsToText } from "@/components/UtilityComponents/AddPillsToText";
import { IconVariants } from "@/common/types";

type Props = {};

export const BlockNode = ({ data }) => {
  return (
    <Box
      cursor={"pointer"}
      p="8px"
      fontSize="12px"
      width="220px"
      borderRadius="2px"
      minH="76px"
      border="1px solid #000000"
      bg="rgba(0, 0, 0, 0.05)"
      display="grid"
      gridTemplateColumns="1fr 5fr"
    >
      <Box>
        <BlockIcon variant={IconVariants.Black} />
      </Box>
      <Text>
        <AddPillsToText text={data.label} />
      </Text>
      <Handle type="target" id="a" position={Position.Left} />
      <Handle type="source" id="b" position={Position.Right} />
    </Box>
  );
};
