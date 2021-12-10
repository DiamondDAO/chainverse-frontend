import { Box, Text, Image } from "@chakra-ui/react";
import React, { FC } from "react";
import { borderStyles } from "../../../common/theme";

interface IGraphItem {
  title: string;
  value: string;
  metric: string;
  reverseSign?: boolean;
}

export const GraphItem: FC<IGraphItem> = ({
  title,
  value,
  metric,
  reverseSign,
}) => {
  return (
    <Box p="20px" {...borderStyles}>
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
          metric.charAt(0) === (reverseSign ? "+" : "-")
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
