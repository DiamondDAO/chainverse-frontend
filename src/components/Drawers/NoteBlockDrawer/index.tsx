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
  Tooltip,
} from "@chakra-ui/react";
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
import * as styles from "../styles";

interface INoteBlockDrawer {
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

export const NoteBlockDrawer: FC<INoteBlockDrawer> = ({
  isOpen,
  onClose,
  nodeData,
  actions,
}) => {
  nodeData = nodeData?.original ?? nodeData;

  // Wallet Data
  const [{ data: walletData }] = useAccount();
  const [{ data: ENS }] = useEnsLookup({
    address: nodeData?.wallet?.address,
  });

  const [deletingBlock, setDeletingBlock] = useState(false);

  useEffect(() => {
    if (walletData?.address) {
      getWorkspaceOwned({
        variables: { where: { wallet: { address: walletData?.address } } },
      });
    }
  }, [walletData?.address]);


  // Workspace data
  const [getWorkspaceOwned, { data: workspaceData }] =
    useLazyQuery(GET_WORKSPACE_OWNED);
  const workspaces = workspaceData?.workspaces;

  // Date of Block Creation
  const dateObj = generateDateString(new Date(nodeData?.createdAt));
  if (!nodeData || Object.keys(nodeData).length === 0) {
    return null;
  }

  return (
    <Drawer isOpen={isOpen} placement="right" size="xs" onClose={onClose}>
      <DrawerOverlay bg="transparent" />
      <DrawerContent sx={styles.DrawerContentStyles}>
        <DrawerCloseButton />
        <DrawerHeader sx={styles.DrawerHeader}>
          <Box sx={styles.BlockIconBg}>
            <BlockIcon variant={IconVariants.White} />
          </Box>
          <Box as="span" sx={styles.BlockIconText}>
            Block
          </Box>
        </DrawerHeader>

        <DrawerBody fontSize="12px">
          <Box>
            <Text color="diamond.blue.3" fontWeight={500}>
              ACTIONS
            </Text>
            <Box sx={styles.TagsAndEntities}>
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
          <Box sx={styles.DateCreated}>
            <Text color="diamond.blue.3" fontWeight={500}>
              DATE CREATED
            </Text>
            <Text color="diamond.gray.4">
              {dateObj.month + "/" + dateObj.day + "/" + dateObj.year}
            </Text>
          </Box>
          <Box sx={styles.CreatedBy}>
            <Text color="diamond.blue.3" fontWeight={500}>
              CREATED BY
            </Text>
            <Text color="diamond.gray.4">
              {ENS ||
                "0x" + truncateAddress(nodeData?.wallet?.address.slice(2), 4)}
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
          {nodeData?.sources.length === 0 && (
            <>
              {"No source attributed"}
            </>
          )}
          {nodeData?.sources.length > 0 && (
            <>
            <Divider mt="16px" />
            <Box  mt="16px" color="diamond.blue.3" fontWeight={500}>
              SOURCES
            </Box>
              {nodeData?.sources.map((s) => (
                <Tooltip label={s.source} fontSize="xs">
                  <span
                    //@ts-ignore
                    rel="noopener noreferrer"
                    style={{ textDecoration: "underline" }}
                    onClick={() => window.open(s.source, "_blank")}
                  >
                    {s.source + ", "}
                  </span>
                </Tooltip>
              ))}
            </>
          )}
          {(nodeData?.entities.length > 0 || nodeData?.tags.length > 0) && (
            <>
              <Divider mt="16px" />
              <Box sx={styles.LinkedTo}>TAGS</Box>
              <Box sx={styles.TagsAndEntities}>
                {nodeData?.tags.map((tag: { tag: string }, idx) => (
                  <Pill key={idx} asButton icon={<TagIcon />}>
                    <Text color="diamond.blue.5" fontSize={bodyText}>
                      {tag.tag}
                    </Text>
                  </Pill>
                ))}
              </Box>
              <Divider mt="16px" />
              <Box sx={styles.LinkedTo}>LINKED TO</Box>
              <Box sx={styles.TagsAndEntities}>
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
