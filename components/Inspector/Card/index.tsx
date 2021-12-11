import { Box, Divider, Grid, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { borderStyles } from "../../../common/theme";

interface IInspectorCard {
  title: string;
  info: { key: string; value: string }[];
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
      bg={selected ? "rgba(232, 244, 255, 0.75)" : ""}
    >
      <Text fontSize="xs">{title}</Text>
      <Divider borderColor="diamond.gray.1" mt="10px" mb="10px" />
      <Grid templateColumns="1fr 1fr" fontSize="sm" gap="10px">
        {info.map((item) => {
          return (
            <React.Fragment key={item.key}>
              <Text color="diamond.gray.4">{item.key}</Text>
              <Text>{item.value}</Text>
            </React.Fragment>
          );
        })}
      </Grid>
    </Box>
  );
};
