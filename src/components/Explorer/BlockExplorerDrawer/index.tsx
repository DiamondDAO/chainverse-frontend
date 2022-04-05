import { AddWorkspaceType, IconVariants } from "@/common/types";
import { generateDateString, truncateAddress } from "@/common/utils";
import { BlockIcon } from "@/components/Icons/BlockIcon";
import { CreateSnapshotIcon } from "@/components/Icons/CreateSnapshotIcon";
import { EntitiesIcon } from "@/components/Icons/EntitiesIcon";
import { PlusIcon } from "@/components/Icons/PlusIcon";
import { TagIcon } from "@/components/Icons/TagIcon";
import { Pill } from "@/components/Pill";
import { AddPillsToText } from "@/components/UtilityComponents/AddPillsToText";
import { GET_WORKSPACE_OWNED } from "@/services/Apollo/Queries";
import { bodyText } from "@/theme";
import { useLazyQuery, useQuery } from "@apollo/client";
import { ChevronDownIcon } from "@chakra-ui/icons";
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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { RiNodeTree } from "react-icons/ri";
import { useAccount, useEnsLookup } from "wagmi";
interface IBlockDrawer {
  addBlockHandler: (
    row: any,
    type: AddWorkspaceType,
    workspaceUuid?: string
  ) => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
  nodeData: any;
}

export const BlockExplorerDrawer: FC<IBlockDrawer> = ({
  addBlockHandler,
  isOpen,
  onClose,
  nodeData,
}) => {
  const nodeDataValues = nodeData?.original;

  const [{ data: walletData }] = useAccount();
  const [getWorkspaceOwned, { data: workspaceData, loading }] =
    useLazyQuery(GET_WORKSPACE_OWNED);
  useEffect(() => {
    if (walletData?.address) {
      getWorkspaceOwned({
        variables: { where: { wallet: { address: walletData?.address } } },
      });
    }
  }, [walletData?.address]);
  const workspaces = workspaceData?.workspaces;
  const [{ data: ENS }] = useEnsLookup({
    address: nodeData?.wallet?.address,
  });
  const dateObj = generateDateString(new Date(nodeDataValues?.createdAt));

  if (!nodeData) {
    return null;
  }
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
            <BlockIcon variant={IconVariants.White} />
          </Box>
          <Box ml="8px" as="span" fontWeight="500">
            Block
          </Box>
        </DrawerHeader>

        <DrawerBody fontSize="12px">
          <Box>
            <Text color="diamond.blue.3" fontWeight={500}>
              ACTIONS
            </Text>
            <Box display="flex" sx={{ columnGap: "4px" }}>
              <Menu>
                <MenuButton
                  as={Button}
                  leftIcon={
                    <PlusIcon width="11px" height="11px" fill="white" />
                  }
                  fontSize="12px"
                  variant="primary"
                >
                  Add to workspace
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      addBlockHandler(nodeData, AddWorkspaceType.Sandbox);
                      onClose();
                    }}
                  >
                    Sandbox
                  </MenuItem>
                  {workspaces?.map((workspace) => (
                    <MenuItem
                      onClick={() => {
                        addBlockHandler(
                          nodeData,
                          AddWorkspaceType.Workspace,
                          workspace.uuid
                        );
                        onClose();
                      }}
                      key={workspace.uuid}
                    >
                      {workspace.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
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
              DATE CREATED
            </Text>
            <Text color="diamond.gray.4">
              {dateObj.month + "/" + dateObj.day + "/" + dateObj.year}
            </Text>
          </Box>
          <Box mt="3px" display="flex" justifyContent="space-between">
            <Text color="diamond.blue.3" fontWeight={500}>
              CREATED BY
            </Text>
            <Text color="diamond.gray.4">
              {ENS ||
                "0x" +
                  truncateAddress(nodeDataValues?.wallet.address.slice(2), 4)}
            </Text>
          </Box>
          <Divider mt="16px" />
          <Box mt="16px">
            <Box color="diamond.blue.3" fontWeight={500}>
              BLOCK TEXT
            </Box>
            <Box>
              {nodeDataValues?.text && (
                <AddPillsToText text={nodeDataValues?.text} />
              )}
            </Box>
          </Box>
          {(nodeDataValues?.entities.length > 0 ||
            nodeDataValues?.tags.length > 0) && (
            <>
              <Divider mt="16px" />
              <Box mt="16px" color="diamond.blue.3" fontWeight={500}>
                LINKED TO
              </Box>
              <Box
                display="flex"
                flexWrap="wrap"
                sx={{ columnGap: "4px", rowGap: "4px" }}
              >
                {nodeDataValues?.tags.map((tag: { tag: string }, idx) => (
                  <Pill key={idx} asButton icon={<TagIcon />}>
                    <Text color="diamond.blue.5" fontSize={bodyText}>
                      {tag.tag}
                    </Text>
                  </Pill>
                ))}
                {nodeDataValues?.entities.map(
                  (entity: { name: string }, idx) => (
                    <Pill key={idx} asButton icon={<EntitiesIcon />}>
                      <Text color="diamond.blue.5" fontSize={bodyText}>
                        {entity.name}
                      </Text>
                    </Pill>
                  )
                )}
              </Box>
            </>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
