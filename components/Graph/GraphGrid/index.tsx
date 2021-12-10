import { Box, Grid } from "@chakra-ui/react";
import React, { FC } from "react";
import { GraphItem } from "../GraphItem";

interface IGraphGrid {
  graphItems: {
    title: string;
    value: string;
    metric: string;
  }[];
}

export const GraphGrid: FC<IGraphGrid> = ({ graphItems }) => {
  return (
    <Box gridRow="span 2" gridColumn="span 3" height="max-content">
      <Grid templateColumns={`repeat(${graphItems.length}, 1fr)`} gap="20px">
        {graphItems.map(
          (graph: { title: string; value: string; metric: string }) => {
            return (
              <Box key={graph.title}>
                <GraphItem
                  title={graph.title}
                  value={graph.value}
                  metric={graph.metric}
                />
              </Box>
            );
          }
        )}
      </Grid>
    </Box>
  );
};
