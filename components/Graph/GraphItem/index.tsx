import { Box, Text, Image } from "@chakra-ui/react";
import React, { FC } from "react";
import { borderStyles } from "../../../common/theme";
import { ExpandableIcon } from "../../Icons/ExpandableIcon";

interface IGraphItem {
  title: string;
  value: string;
  metric: string;
  reverseSign?: boolean;
  expandable?: boolean;
  onOpen?: () => void;
}

export const GraphItem: FC<IGraphItem> = ({
  title,
  value,
  metric,
  reverseSign,
  expandable,
  onOpen,
}) => {
  return (
    <Box p="20px" {...borderStyles} position="relative">
      {expandable && (
        <Box
          position="absolute"
          right="10px"
          top="10px"
          cursor="pointer"
          onClick={onOpen}
        >
          <ExpandableIcon onHover="diamond.link" />
        </Box>
      )}
      <Text color="diamond.gray.3" fontSize="xs">
        {title}
      </Text>
      <Text mt="7px" fontSize="lg">
        {value}
      </Text>
      <Text
        mt="7px"
        fontSize="xs"
        color={
          metric.charAt(0) === (reverseSign === true ? "-" : "+")
            ? "chart.green"
            : "chart.red"
        }
      >
        {metric}
      </Text>
      <Image
        width="100%"
        alt="temp-graph"
        mt="10px"
        src="./img/temp-graph.png"
      />
    </Box>
  );
};
