import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { Handle, Position } from "react-flow-renderer";
import { BlockIcon } from "@/components/Icons/BlockIcon";
import { AddPillsToText } from "@/components/UtilityComponents/AddPillsToText";
import { IconVariants } from "@/common/types";
import { EntitiesIcon } from "@/components/Icons/EntitiesIcon";
import { convertIPFSURLs } from "@/common/utils";

type Props = {};

export const EntityNode = ({
  data,
}: {
  data: {
    title: string;
    about?: string;
    avatar?: string;
    dim: boolean;
  };
}) => {
  return (
    <Box
      cursor={"pointer"}
      p="8px"
      fontSize="10px"
      maxW="200px"
      borderRadius="8px"
      border="1px solid #000000"
      borderColor="diamond.magenta"
      bg="rgba(149, 67, 141, 0.1)"
      display="flex"
      sx={{ ...(data.dim && { opacity: 0.2, bg: "rgba(0, 0, 0, 0.05)" }) }}
    >
      <Box mr="4px" userSelect="none">
        {data?.avatar ? (
          <Box width="22px" height="22px">
            <Image
              borderRadius="100%"
              alt="entitiy-logo"
              src={convertIPFSURLs(data?.avatar)}
            />
          </Box>
        ) : (
          <Box p="4px" bg="diamond.magenta" borderRadius="100%">
            <EntitiesIcon variant={IconVariants.White} />
          </Box>
        )}
      </Box>
      <Box verticalAlign="middle">
        <Text fontWeight="500" color="diamond.black">
          {data.title}
        </Text>
        <Text color="diamond.gray.5">{data.about}</Text>
      </Box>
      <Handle type="target" id="a" position={Position.Left} />
      <Handle type="source" id="b" position={Position.Right} />
    </Box>
  );
};
