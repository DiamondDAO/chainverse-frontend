import { Box, Grid, Heading, Text } from "@chakra-ui/layout";
import React, { FC } from "react";

interface ISection {
  header: string;
  subheader: string;
  children: React.ReactNode;
}

export const Section: FC<ISection> = ({ header, subheader, children }) => {
  return (
    <>
      <Box maxH="90px" mb="10px">
        <Heading variant="h3" fontSize="xl">
          {header}
        </Heading>
        <Text color="diamond.gray.3" mt="10px" fontSize="lg">
          {subheader}
        </Text>
      </Box>
      <Grid
        gridAutoRows="1fr"
        templateColumns="1fr 1fr 1fr"
        maxWidth="750px"
        gap="20px"
      >
        {children}
      </Grid>
    </>
  );
};
