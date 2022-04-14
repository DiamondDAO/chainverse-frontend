import { IconVariants } from "@/common/types";
import { generateDateString } from "@/common/utils";
import { EntitiesIcon } from "@/components/Icons/EntitiesIcon";
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
  useToast,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { RiNodeTree } from "react-icons/ri";

interface ITagDrawer {
  isOpen: boolean;
  onClose: () => void;
  nodeData: any;
}

export const TagDrawer: FC<ITagDrawer> = ({ isOpen, onClose, nodeData }) => {
  const dateObj = generateDateString(new Date(nodeData?.createdAt));
  if (!nodeData) return null;
  return (
    <Drawer isOpen={isOpen} placement="right" size="xs" onClose={onClose}>
      <DrawerOverlay bg="transparent" />
      <DrawerContent
        _focus={{ boxShadow: "-2px 0px 15px #C3C3C3 !important" }}
        boxShadow={"-2px 0px 15px #C3C3C3"}
        sx={{ top: "50px !important" }}
      >
        <DrawerCloseButton />
        <DrawerHeader display="flex" alignItems="center">
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
            <Box display="flex" sx={{ columnGap: "4px" }}>
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
          <Box mt="16px" display="flex" justifyContent="space-between">
            <Text color="diamond.blue.3" fontWeight={500}>
              DATE CREATED
            </Text>
            <Text color="diamond.gray.4">
              {dateObj.month + "/" + dateObj.day + "/" + dateObj.year}
            </Text>
          </Box>
          <Box mt="3px" display="flex" justifyContent="space-between">
            <Text color="diamond.blue.3" fontWeight={500}>
              BLOCKS CONNECTED
            </Text>
            <Text color="diamond.gray.4">
              {nodeData?.blocksConnection.totalCount}
            </Text>
          </Box>
          <Divider mt="16px" />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
