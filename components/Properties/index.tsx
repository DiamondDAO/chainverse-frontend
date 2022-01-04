import { Box, Text, Input, Grid, Link } from "@chakra-ui/react";
import React, { FC } from "react";
import { useMediaBreakpoints } from "../../common/hooks/use-media-breakpoints";
import { borderStyles } from "../../common/theme";

type ColData = {
  title?: string;
  group: { key: string; value: string; link?: string }[];
}[];
interface IList {
  title: string;
  data: {
    title?: string;
    properties: {
      key: string;
      value: string;
      link?: string;
    }[];
  }[];
}

export const Properties: FC<IList> = ({ title, data }) => {
  const {
    mediaBreakpoints: { sm: isSmall },
    ref,
  } = useMediaBreakpoints({
    sm: 250,
    md: 523,
    lg: 790,
  });
  return (
    <Box ref={ref} gridRow="span 4" gridColumn="span 3" {...borderStyles}>
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
      <Box px="20px" py="20px">
        <Grid templateColumns={isSmall ? "1fr" : "1fr 1fr"}>
          {data.map((item, idx) => {
            return (
              <Box key={idx} mb="20px">
                {item.title && (
                  <Text mb="10px" color="diamond.gray.3">
                    {item.title}
                  </Text>
                )}
                {item.properties.map((property) => {
                  return (
                    <Grid templateColumns="1fr 1fr" key={property.key}>
                      <Text color="diamond.gray.4" minWidth="170px">
                        {property.key}
                      </Text>
                      {property.link && (
                        <Link href={property.link}>
                          <Text color="diamond.link">{property.value}</Text>
                        </Link>
                      )}
                      {!property.link && (
                        <Text color="diamond.gray.5">{property.value}</Text>
                      )}
                    </Grid>
                  );
                })}
              </Box>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};
