import { Box, Text, Input, Grid, Link } from "@chakra-ui/react";
import React, { FC } from "react";
import { borderStyles } from "../../common/theme";

type ColData = {
  title?: string;
  group: { key: string; value: string; link?: string }[];
}[];
interface IList {
  title: string;
  leftCol: ColData;
  rightCol: ColData;
}

export const Properties: FC<IList> = ({ title, leftCol, rightCol }) => {
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
          <Text>{title}</Text>
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
        <Grid templateColumns="1fr 1fr">
          {/* Left Col */}
          <Box>
            {leftCol.map((item) => {
              return (
                <>
                  {item.title && <Text> {item.title}</Text>}
                  <Grid templateColumns="1fr 1fr">
                    {item.group.map((property) => {
                      return (
                        <>
                          <Text color="diamond.gray.4">{property.key}</Text>
                          {property.link && (
                            <Link href={property.link}>
                              <Text color="diamond.link">{property.value}</Text>
                            </Link>
                          )}
                          {!property.link && (
                            <Text color="diamond.gray.5">{property.value}</Text>
                          )}
                        </>
                      );
                    })}
                  </Grid>
                </>
              );
            })}
          </Box>
          {/* Right Col */}
          <Box>
            {rightCol.map((item) => {
              return (
                <>
                  {item.title && <Text> {item.title}</Text>}
                  <Grid templateColumns="1fr 1fr">
                    {item.group.map((property) => {
                      return (
                        <>
                          <Text color="diamond.gray.4">{property.key}</Text>
                          {property.link && (
                            <Link href={property.link}>
                              <Text color="diamond.link">{property.value}</Text>
                            </Link>
                          )}
                          {!property.link && (
                            <Text color="diamond.gray.5">{property.value}</Text>
                          )}
                        </>
                      );
                    })}
                  </Grid>
                </>
              );
            })}
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};
