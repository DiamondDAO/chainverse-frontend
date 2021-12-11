import { Box, Grid, Text, Image } from "@chakra-ui/react";
import React, { FC } from "react";
import { borderStyles } from "../../common/theme";
import { ExpandableIcon } from "../Icons/ExpandableIcon";

interface ISummaryBanner {
  summaryFacts: { key: string; value: string }[];
  expandable?: boolean;
  onOpen?: () => void;
}

export const SummaryBanner: FC<ISummaryBanner> = ({
  summaryFacts,
  expandable,
  onOpen,
}) => {
  const factLength = summaryFacts.length;
  return (
    <Box gridColumn="span 3" position="relative">
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
      <Grid
        templateColumns={`repeat(${factLength}, 1fr)`}
        py="20px"
        px="30px"
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
