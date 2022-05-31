import { IconVariants } from "@/common/types";
import { generateDateString } from "@/common/utils";
import { PlusIcon } from "@/components/Icons/PlusIcon";
import { TagIcon } from "@/components/Icons/TagIcon";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Text,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import React, { FC, useMemo } from "react";
import * as styles from "../styles";
interface ITagDrawer {
  isOpen: boolean;
  onClose: () => void;
  nodeData: any;
}

export const TagDrawer: FC<ITagDrawer> = ({ isOpen, onClose, nodeData }) => {
  const dateObj = generateDateString(new Date(nodeData?.createdAt));
  const tagData = useMemo(
    () => [
      {
        title: "DATE CREATED",
        data: dateObj.month + "/" + dateObj.day + "/" + dateObj.year,
      },
      {
        title: "BLOCKS CONNECTED",
        data: nodeData?.blocksConnection.totalCount,
      },
    ],
    [
      dateObj.day,
      dateObj.month,
      dateObj.year,
      nodeData?.blocksConnection.totalCount,
    ]
  );

  if (!nodeData) return null;
  return (
    <Drawer isOpen={isOpen} placement="right" size="xs" onClose={onClose}>
      <DrawerOverlay bg="transparent" />
      <DrawerContent sx={styles.DrawerContentStyles}>
        <DrawerCloseButton />
        <DrawerHeader sx={styles.DrawerHeader}>
          <Box bg="diamond.magenta" borderRadius="100%" padding="5px">
            <TagIcon variant={IconVariants.White} />
          </Box>
          <Box ml="8px" as="span" fontWeight="500">
            {nodeData?.tag}
          </Box>
        </DrawerHeader>

        <DrawerBody fontSize="12px">
          <Box>
            <Text color="diamond.blue.3" fontWeight={500}>
              ACTIONS
            </Text>
            <Box sx={styles.RowContainer}>
              <Button
                leftIcon={<PlusIcon width="11px" height="11px" fill="white" />}
                variant="primary"
              >
                Add to workspace
              </Button>
              {/* <Button
                onClick={() => {}}
                leftIcon={<RiNodeTree size="12px" />}
                variant="primary"
              >
                View graph
              </Button> */}
            </Box>
          </Box>
          <Divider mt="16px" />
          <Box mt="16px">
            {tagData.map((dataItem, idx) => {
              return (
                <Box key={idx} sx={styles.DataContainer}>
                  <Text color="diamond.blue.3" fontWeight={500}>
                    {dataItem.title}
                  </Text>
                  {typeof dataItem.data === "string" ? (
                    <Text color="diamond.gray.4">{dataItem.data}</Text>
                  ) : (
                    dataItem.data
                  )}
                </Box>
              );
            })}
          </Box>
          <Divider mt="16px" />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
