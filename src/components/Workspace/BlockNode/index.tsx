import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Handle, Position } from "react-flow-renderer";
import reactStringReplace from "react-string-replace";
import { EntitiesIcon } from "@/components/Icons/EntitiesIcon";
import { TagIcon } from "@/components/Icons/TagIcon";
import { Pill } from "@/components/Pill";
import { BlockIcon } from "@/components/Icons/BlockIcon";
import { AddPillsToText } from "@/components/UtilityComponents/AddPillsToText";

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
        <BlockIcon />
      </Box>
      <Text>
        <AddPillsToText text={data.label} />
      </Text>
      <Handle type="target" id="a" position={Position.Left} />
      <Handle type="source" id="b" position={Position.Right} />
    </Box>
  );
};
