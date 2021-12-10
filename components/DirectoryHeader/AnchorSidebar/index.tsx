import { Box, Text } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import Router from "next/router";
import { borderStyles } from "../../../common/theme";

interface IAnchorSidebar {
  title: string;
  description?: string;
  links: { name: string; id: string }[];
}

export const AnchorSidebar: FC<IAnchorSidebar> = ({
  title,
  description,
  links,
}) => {
  const [selected, setSelected] = useState(links[0].name ?? "");
  return (
    <Box maxW="190px">
      <Box {...borderStyles}>
        {links.map((link) => {
          const isSelected = selected === link.name;
          return (
            <Box
              key={link.id}
              onClick={() => {
                Router.push(link.id);
                setSelected(link.name);
              }}
              cursor="pointer"
              p="10px"
              bg={isSelected ? "diamond.blue.0" : "diamond.white"}
            >
              <Text>{link.name}</Text>
            </Box>
          );
        })}
      </Box>
      {description && (
        <>
          <Box my="20px" borderTop="0.5px solid" borderColor="diamond.gray.2" />
          <Box>
            <Text>About {title}</Text>
            <Text color="diamond.gray.3" mt="10px">
              {description}
            </Text>
          </Box>
        </>
      )}
    </Box>
  );
};
