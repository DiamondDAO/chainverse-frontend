import React, { FC } from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { Handle, Position } from "react-flow-renderer";
import { IconVariants } from "@/common/types";
import { EntitiesIcon } from "@/components/Icons/EntitiesIcon";
import { convertIPFSURLs } from "@/common/utils";
import * as styles from "./styles";
interface IEntityNode {
  data: {
    title: string;
    about?: string;
    avatar?: string;
    dim: boolean;
  };
}

export const EntityNode: FC<IEntityNode> = ({ data }) => {
  return (
    <Box sx={styles.EntityNodeContainer(data.dim)}>
      <Box mr="4px" userSelect="none">
        {data?.avatar ? (
          <Box sx={styles.ImageContainer}>
            <Image
              borderRadius="100%"
              alt="entitiy-logo"
              src={convertIPFSURLs(data?.avatar)}
            />
          </Box>
        ) : (
          <Box sx={styles.AvatarIcon}>
            <EntitiesIcon variant={IconVariants.White} />
          </Box>
        )}
      </Box>
      <Box verticalAlign="middle">
        <Text sx={styles.EntityTitle}>{data.title}</Text>
        <Text color="diamond.gray.5">{data.about}</Text>
      </Box>
      <Handle type="target" id="a" position={Position.Left} />
      <Handle type="source" id="b" position={Position.Right} />
    </Box>
  );
};
