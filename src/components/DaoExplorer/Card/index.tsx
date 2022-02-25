import { Box, Divider, Grid, Text } from "@chakra-ui/react";
import React, { FC } from "react";

interface IInspectorCard {
  title: string;
  info: { key: string; value: React.ReactElement | string }[];
  selected: boolean;
}

export const InspectorCard: FC<IInspectorCard> = ({
  info,
  selected,
  title,
}) => {
  return (
    <Box
      borderBottom="0.5px solid"
      borderColor="diamond.gray.2"
      p="10px"
      bg={selected ? "diamond.blue.0" : "diamond.white"}
    >
      <Text fontWeight="600" fontSize="sm">
        {title}
      </Text>
      <Divider borderColor="diamond.gray.1" mt="10px" mb="10px" />
      <Grid templateColumns="1fr 1fr" fontSize="sm" gap="10px">
        {info.map((item) => {
          return (
            <React.Fragment key={item.key}>
              <Text color="diamond.gray.4">{item.key}</Text>
              {item.value}
            </React.Fragment>
          );
        })}
      </Grid>
    </Box>
  );
};
