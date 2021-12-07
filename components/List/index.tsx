import { Box, Text, Input, Grid, Link } from "@chakra-ui/react";
import React, { FC } from "react";
import { borderStyles } from "../../common/theme";

interface IList {
  name: string;
  listItems: {
    title: string;
    items: { key: string; value: string; link?: string }[];
    col: number;
  }[];
}

export const List: FC<IList> = ({ name, listItems }) => {
  return (
    <Box gridRow="span 4" gridColumn="span 3" {...borderStyles}>
      <Box bg="diamond.blue.0">
        <Box
          fontSize="sm"
          display="flex"
          width="100%"
          px="17px"
          pt="12px"
          pb="14px"
        >
          <Text flexGrow="1">{name}</Text>
          <Text mr="15px">Show: All</Text>
          <Text>Sorty By: Recent</Text>
        </Box>
      </Box>
      <Box
        px="20px"
        py="20px"
        maxHeight="393px"
        sx={{
          overflow: "scroll",
          scrollbarWidth: "none",
          "-ms-overflow-style": "none",
          "&::-webkit-scrollbar": {
            width: 0,
            height: 0,
          },
        }}
      >
        <Input {...borderStyles} mb="20px" placeholder="Search..." />
        {listItems.map((listItem, idx) => {
          return (
            <Box
              key={listItem.title + idx}
              p="10px"
              mb="20px"
              {...borderStyles}
            >
              <Text
                color="diamond.gray.3"
                fontSize="xs"
                fontWeight="500"
                pb="10px"
                borderBottom="1px solid"
                borderColor="diamond.gray.2"
              >
                {listItem.title}
              </Text>
              <Grid templateColumns={`repeat(${listItem.col}, 1fr)`} mt="10px">
                {listItem.items.map((item) => {
                  return (
                    <>
                      <Text color="diamond.gray.4">{item.key}</Text>
                      {item.link && (
                        <Link href={item.link}>
                          <Text color="diamond.link">{item.value}</Text>
                        </Link>
                      )}
                      {!item.link && (
                        <Text color="diamond.gray.5">{item.value}</Text>
                      )}
                    </>
                  );
                })}
              </Grid>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
