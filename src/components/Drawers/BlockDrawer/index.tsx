import React, { FC, useEffect, useState } from "react";
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
import { RiNodeTree } from "react-icons/ri";
import { useAccount, useEnsLookup } from "wagmi";

import { BlockIcon } from "@/components/Icons/BlockIcon";
import { EntitiesIcon } from "@/components/Icons/EntitiesIcon";
import { PlusIcon } from "@/components/Icons/PlusIcon";
import { TagIcon } from "@/components/Icons/TagIcon";
import { Pill } from "@/components/Pill";
import { AddPillsToText } from "@/components/UtilityComponents/AddPillsToText";

import { GET_WORKSPACE_OWNED } from "@/services/Apollo/Queries";
import { useLazyQuery } from "@apollo/client";

import { AddWorkspaceType, Block, IconVariants } from "@/common/types";
import { generateDateString, truncateAddress } from "@/common/utils";
import { bodyText } from "@/theme";
import { CreateSnapshotIcon } from "@/components/Icons/CreateSnapshotIcon";

interface IBlockDrawer {
  isOpen: boolean;
  onClose: () => void;
  nodeData: any;
  actions: {
    addBlockToWorkspace?: (
      block: Block,
      type: AddWorkspaceType,
      workspaceUuid?: string
    ) => Promise<void>;
    editBlock?: () => void;
    deleteBlock?: (block: Block) => Promise<void>;
  };
}

export const BlockDrawer: FC<IBlockDrawer> = ({
  isOpen,
  onClose,
  nodeData,
  actions,
}) => {
  nodeData = nodeData?.original ?? nodeData;

  // Wallet Data
  const [{ data: walletData }] = useAccount();
  const [{ data: ENS }] = useEnsLookup({
    address: nodeData?.wallet?.address.toLowerCase(),
  });

  const [deletingBlock, setDeletingBlock] = useState(false);

  useEffect(() => {
    if (walletData?.address) {
      getWorkspaceOwned({
        variables: {
          where: { wallet: { address: walletData?.address.toLowerCase() } },
        },
      });
    }
  }, [walletData?.address]);

  // Workspace data
  const [getWorkspaceOwned, { data: workspaceData }] =
    useLazyQuery(GET_WORKSPACE_OWNED);
  const workspaces = workspaceData?.workspaces;

  // Date of Block Creation
  const dateObj = generateDateString(new Date(nodeData?.createdAt));
  console.log(nodeData);
  if (!nodeData || Object.keys(nodeData).length === 0) {
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
          <Box bg="diamond.black" borderRadius="100%" padding="5px">
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
            <Box
              display="flex"
              flexWrap="wrap"
              sx={{ rowGap: "4px", columnGap: "4px" }}
            >
              {actions?.addBlockToWorkspace && (
                <Menu>
                  <MenuButton
                    as={Button}
                    leftIcon={
                      <PlusIcon width="11px" height="11px" fill="white" />
                    }
                    variant="primary"
                  >
                    Add to workspace
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        actions?.addBlockToWorkspace(
                          nodeData,
                          AddWorkspaceType.Sandbox
                        );
                        onClose();
                      }}
                    >
                      Sandbox
                    </MenuItem>
                    {workspaces?.map((workspace) => (
                      <MenuItem
                        onClick={() => {
                          actions?.addBlockToWorkspace(
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
              )}
              {actions?.editBlock && (
                <Button
                  onClick={actions?.editBlock}
                  leftIcon={<CreateSnapshotIcon />}
                  variant="primary"
                >
                  Edit Block
                </Button>
              )}
              {actions?.deleteBlock && (
                <Button
                  disabled={deletingBlock}
                  isLoading={deletingBlock}
                  onClick={async () => {
                    setDeletingBlock(true);
                    await actions?.deleteBlock(nodeData);
                    setDeletingBlock(false);
                  }}
                  leftIcon={<CreateSnapshotIcon />}
                  variant="primary"
                >
                  Delete Block
                </Button>
              )}
              {/* TODO: add view graph func */}
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
              CREATED BY
            </Text>
            <Text color="diamond.gray.4">
              {ENS ||
                "0x" +
                  truncateAddress(
                    nodeData?.wallet?.address.toLowerCase().slice(2),
                    4
                  )}
            </Text>
          </Box>
          <Divider mt="16px" />
          <Box mt="16px">
            <Box color="diamond.blue.3" fontWeight={500}>
              BLOCK TEXT
            </Box>
            <Box>
              {nodeData?.text && <AddPillsToText text={nodeData?.text} />}
            </Box>
          </Box>
          {(nodeData?.entities.length > 0 || nodeData?.tags.length > 0) && (
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
                {nodeData?.tags.map((tag: { tag: string }, idx) => (
                  <Pill key={idx} asButton icon={<TagIcon />}>
                    <Text color="diamond.blue.5" fontSize={bodyText}>
                      {tag.tag}
                    </Text>
                  </Pill>
                ))}
                {nodeData?.entities.map((entity: { name: string }, idx) => (
                  <Pill key={idx} asButton icon={<EntitiesIcon />}>
                    <Text color="diamond.blue.5" fontSize={bodyText}>
                      {entity.name}
                    </Text>
                  </Pill>
                ))}
              </Box>
            </>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
