import { Box, Grid, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { borderStyles } from "../../common/theme";

interface ISummaryBanner {
  summaryFacts: { key: string; value: string }[];
}

export const SummaryBanner: FC<ISummaryBanner> = ({ summaryFacts }) => {
  const factLength = summaryFacts.length;
  return (
    <Box gridColumn="span 3">
      <Grid
        templateColumns={`repeat(${factLength}, 1fr)`}
        py="20px"
        px="20px"
        {...borderStyles}
      >
        {summaryFacts.map((fact) => {
          return (
            <Box key={fact.key}>
              <Text fontWeight="500" color="diamond.gray.3" fontSize="11px">
                {fact.key}
              </Text>
              <Text fontWeight="500" fontSize="lg">
                {fact.value}
              </Text>
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
};
