import { Box, Heading } from "@chakra-ui/react";
import React, { FC } from "react";
import { AnchorSidebar } from "./AnchorSidebar";

interface IDirectoryHeader {
  title: string;
  description?: string;
  links: { name: string; id: string }[];
}

export const DirectoryHeader: FC<IDirectoryHeader> = ({
  title,
  description,
  links,
}) => {
  return (
    <Box>
      <Box top="20px" position="sticky">
        <Heading as="h1" fontSize="2xl" mb="20px">
          {title}
        </Heading>
        <AnchorSidebar title={title} description={description} links={links} />
      </Box>
    </Box>
  );
};
