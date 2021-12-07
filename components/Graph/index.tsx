import { Box, Text, Image } from "@chakra-ui/react";
import React, { FC } from "react";
import { borderStyles } from "../../common/theme";

interface IGraph {
  title: string;
  value: string;
  metric: string;
}

export const Graph: FC<IGraph> = ({ title, value, metric }) => {
  return (
    <Box p="20px" {...borderStyles}>
      <Text color="diamond.gray.3" fontSize="xs">
        {title}
      </Text>
      <Text mt="7px" fontSize="lg">
        {value}
      </Text>
      <Text mt="7px" fontSize="xs" color="chart.green">
        {metric}
      </Text>
      <Image mt="10px" src="./img/temp-graph.png" />
    </Box>
  );
};
