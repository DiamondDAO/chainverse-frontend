import { Box, Text } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import Router from "next/router";
import { borderStyles } from "../../common/theme";

interface IAnchorSidebar {
  links: { name: string; id: string }[];
}

export const AnchorSidebar: FC<IAnchorSidebar> = ({ links }) => {
  const [selected, setSelected] = useState(links[0].name ?? "");
  return (
    <Box maxWidth="170px" {...borderStyles}>
      {links.map((link) => {
        const isSelected = selected === link.name;
        return (
          <Box
            key={link.id}
            onClick={() => {
              Router.push(link.id);
              setSelected(link.name);
            }}
            p="10px"
            bg={isSelected ? "diamond.blue.0" : "diamond.white"}
          >
            <Text>{link.name}</Text>
          </Box>
        );
      })}
    </Box>
  );
};
