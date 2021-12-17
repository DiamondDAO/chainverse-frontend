import { Box, Grid } from "@chakra-ui/react";
import React, { FC } from "react";
import { GraphItem } from "../GraphItem";

interface IGraphGrid {
  graphItems: {
    title: string;
    value: string;
    metric: string;
    reverseSign?: boolean;
    expandable?: boolean;
    onOpen?: () => void;
  }[];
}

export const GraphGrid: FC<IGraphGrid> = ({ graphItems }) => {
  // splits up graphItems so that at max 3 is dispalyed on each row
  const nestedArray = graphItems.reduce((prev, curr, idx) => {
    if (idx % 3 == 0) {
      return [...prev, [curr]];
    } else {
      const indexed = Math.floor(idx / 3);
      prev[indexed].push(curr);
      return prev;
    }
  }, [] as IGraphGrid["graphItems"][]);

  return (
    <>
      {nestedArray.map((graphRow) => {
        return (
          <Box gridRow="span 2" gridColumn="span 3" height="max-content">
            <Grid
              templateColumns={`repeat(${graphRow.length}, 1fr)`}
              gap="20px"
            >
              {graphRow.map((graph) => {
                return (
                  <Box key={graph.title} height="100%">
                    <GraphItem
                      title={graph.title}
                      value={graph.value}
                      metric={graph.metric}
                      reverseSign={graph.reverseSign}
                      expandable={graph.expandable}
                      onOpen={graph.onOpen}
                    />
                  </Box>
                );
              })}
            </Grid>
          </Box>
        );
      })}
    </>
  );
};
