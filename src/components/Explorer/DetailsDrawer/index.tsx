import { IconVariants } from "@/common/types";
import { EntitiesIcon } from "@/components/Icons/EntitiesIcon";
import { PlusIcon } from "@/components/Icons/PlusIcon";
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

interface IDetailDrawer {
  isOpen: boolean;
  onClose: () => void;
  rowData: any;
}

export const DetailDrawer: FC<IDetailDrawer> = ({
  isOpen,
  onClose,
  rowData,
}) => {
  if (!rowData) return null;
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
            <EntitiesIcon variant={IconVariants.White} />
          </Box>
          <Box ml="8px" as="span" fontWeight="500">
            {rowData?.values?.name}
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
              <Button
                onClick={() => {}}
                leftIcon={<RiNodeTree size="12px" />}
                variant="primary"
              >
                View graph
              </Button>
            </Box>
          </Box>
          <Divider mt="16px" />
          <Box mt="16px" display="flex" justifyContent="space-between">
            <Text color="diamond.blue.3" fontWeight={500}>
              ID
            </Text>
            <Text color="diamond.gray.4">{rowData?.values?.id}</Text>
          </Box>
          <Box mt="3px" display="flex" justifyContent="space-between">
            <Text color="diamond.blue.3" fontWeight={500}>
              NETWORK
            </Text>
            <Text color="diamond.gray.4">{rowData?.values?.network}</Text>
          </Box>
          <Box mt="3px" display="flex" justifyContent="space-between">
            <Text color="diamond.blue.3" fontWeight={500}>
              ONLY MEMBER?
            </Text>
            <Text color="diamond.gray.4">{rowData?.values?.onlyMembers}</Text>
          </Box>
          <Box mt="3px" display="flex" justifyContent="space-between">
            <Text color="diamond.blue.3" fontWeight={500}>
              SYMBOL
            </Text>
            <Text color="diamond.gray.4">{rowData?.values?.symbol}</Text>
          </Box>
          <Box mt="3px" display="flex" justifyContent="space-between">
            <Text color="diamond.blue.3" fontWeight={500}>
              YTD PROPOSALS
            </Text>
            <Text color="diamond.gray.4">
              {rowData?.values?.proposalsAggregate.count}
            </Text>
          </Box>
          <Divider mt="16px" />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
