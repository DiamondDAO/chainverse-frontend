import {
  Text,
  Image,
  Menu,MenuButton,MenuDivider,MenuGroup,MenuItem,MenuList,
  Box,
  Spinner,
  useTheme,
  useDisclosure,
  useToast
} from "@chakra-ui/react";

import Router from "next/router";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { useAccount } from "wagmi";
import * as styles from "./styles";
import { Layout } from "@/components/Layout";
import { filterUniqueObjects } from "@/common/utils";
import { bodyText, subText } from "@/theme";
import { Block } from "@/common/types";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

import { NoteBlockDrawer } from "@/components/Drawers/NoteBlockDrawer";
import { PartnershipBlockDrawer } from "@/components/Drawers/PartnershipBlockDrawer";
import { EntityDrawer } from "@/components/Drawers/EntityDrawer";

import { borderStyles } from "@/theme";
import { AccountMenu } from "./AccountMenu";
import { NavPages } from "./NavPages";
import { AddBlockTypeModal } from "@/components/AddBlockTypeModal";
import { CreateSnapshotIcon } from "@/components/Icons/CreateSnapshotIcon";
import { BlockIcon } from "../Icons/BlockIcon";

import {
  GET_ALL_NOTES,
  GET_NOTES,
  GET_PARTNERSHIPS,
  GET_ALL_PARTNERSHIPS,
  GET_ALL_BLOCKS,
  GET_SANDBOX,
  GET_TAGS_AND_ENTITIES,
  GET_WORKSPACE_OWNED,
} from "@/services/Apollo/Queries";
import {
  ADD_SANDBOX_TO_WALLET,
  CREATE_WORKSPACES,
  DELETE_NOTES,
  RESET_SANDBOX,
  UPDATE_SANDBOX,
} from "@/services/Apollo/Mutations";

export const AddBlockMenu: FC = () => {
  const { space } = useTheme();
  const blockTypes = ['Entity', 'Note', 'Partnership'];
  const [blockType, setBlockType] = useState("")

  const [currentNode, setCurrentNode] = useState(null);
  const [date, setDate] = useState("");
  const [{ data: walletData }] = useAccount();
  const { data: tagAndEntitiesData } = useQuery(GET_TAGS_AND_ENTITIES);

  const [addSandboxToWallet, { error: addBlockError }] = useMutation(
    ADD_SANDBOX_TO_WALLET,
    {
      refetchQueries: [],
    }
  );
  const [getSandbox, { data: sandboxData }] = useLazyQuery(GET_SANDBOX);
  const [addBlockToSandbox, { error: addBlockToSandboxError }] = useMutation(
    UPDATE_SANDBOX,
    {
      refetchQueries: [
        {
          query: GET_SANDBOX,
          variables: {
            where: { wallet: { address: walletData?.address } },
            directed: false,
          },
        },
      ],
    }
  );
  const [createWorkspace, { error: createWorkspaceError }] =
    useMutation(CREATE_WORKSPACES);
  const [resetSandbox, { error: resetSandboxError }] = useMutation(
    RESET_SANDBOX,
    {
      refetchQueries: [
        {
          query: GET_SANDBOX,
          variables: {
            where: { wallet: { address: walletData?.address } },
            directed: false,
          },
        },
        {
          query: GET_WORKSPACE_OWNED,
          variables: { where: { wallet: { address: walletData?.address } } },
        },
      ],
    }
  );

  const [rfInstance, setRfInstance] = useState(null);
  const toast = useToast();
  useEffect(() => {
    setDate(new Date().toLocaleString());
  }, []);

  useEffect(() => {
    const connectOrCreateSandbox = async (walletAddress: string) => {
      const Sandbox = await getSandbox({
        variables: {
          where: { wallet: { address: walletAddress } },
        },
      });
      if (Sandbox.data.sandboxes.length === 0) {
        await addSandboxToWallet({
          variables: {
            where: { address: walletAddress },
            connectOrCreate: {
              sandbox: {
                where: {
                  node: { name: `${walletAddress} Sandbox` },
                },
                onCreate: {
                  node: {
                    name: `${walletAddress} Sandbox`,
                  },
                },
              },
            },
          },
        });
      }
    };
    if (walletData?.address) {
      connectOrCreateSandbox(walletData.address);
    }
  }, [getSandbox, walletData?.address]);

  const entityData = useMemo(
    () => sandboxData?.sandboxes[0]?.entities,
    [sandboxData?.sandboxes[0]?.entities]
  );
  const notesData = useMemo(
    () =>
      sandboxData?.sandboxes[0]?.blocks.filter((i) =>
      i.__typename === "Note" || i.__typename === "Partnership" ),
    [sandboxData?.sandboxes[0]?.blocks]
  );

  const nodeData = useMemo(
    () => entityData?.concat(notesData),
    [entityData, notesData]
  );

  const workspaceNameRef = useRef(null);
  const [isSavingWorkspace, setIsSavingWorkspace] = useState(false);

  const saveWorkspaceHandler = async () => {
    setIsSavingWorkspace(true);
    try {
      await createWorkspace({
        variables: {
          input: [
            {
              name: workspaceNameRef.current.innerText || "",
              rfObject: JSON.stringify(rfInstance?.toObject()),
              blocks: {
                Note: {
                  connect: {
                    where: {
                      node: { uuid_IN: nodeData
                        .filter((node) => node.__typename === "Note")
                        .map((node) => node.uuid),
                      },
                    },
                  },
                },
                Partnership: {
                  connect: {
                    where: {
                      node: { uuid_IN: nodeData
                        .filter((node) => node.__typename === "Partnership")
                        .map((node) => node.uuid),
                      },
                    },
                  },
                },
              },
              entities: {
                connect: {
                  where: {
                    node: {
                      OR: [
                        {
                          id_IN: nodeData
                            .filter((node) => node.__typename === "Entity")
                            .map((node) => node.id),
                        },
                        {
                          address_IN: nodeData
                            .filter((node) => node.__typename === "Entity")
                            .map((node) => node.address),
                        },
                        {
                          name_IN: nodeData
                            .filter((node) => node.__typename === "Entity")
                            .map((node) => node.name),
                        },
                      ],
                    },
                  },
                },
              },
              wallet: {
                connect: { where: { node: { address: walletData?.address } } },
              },
            },
          ],
        },
      });
      await resetSandbox({
        variables: {
          disconnect: {
            blocks: {
              Note: [
                {
                  where: {
                    node: {
                      uuid_NOT: 0,
                    },
                  },
                },
              ],
            },
            entities: [
              {
                where: {
                  node: {
                    name_NOT: null,
                  },
                },
              },
            ],
          },
        },
      });
      toast({
        title: `Workspace ${workspaceNameRef.current.innerText} Created!`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Error",
        description:
          "There was an error when creating your workspace. Please try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    setIsSavingWorkspace(false);
  };

  const addBlockToSandboxHandler = async (data?: any) => {
    try {
      await addBlockToSandbox({
        variables: {
          where: {
            wallet: {
              address: data?.walletAddress,
            },
          },
          connect: {
            blocks: {
              Note: [
                {
                  where: {
                    node: {
                      uuid: data?.uuid,
                    },
                  },
                },
              ],
            },
          },
        },
      });
    } catch (e) {
      throw e;
    }
  };
  const [deleteBlock, { error: deleteBlockError }] = useMutation(DELETE_NOTES, {
    refetchQueries: [
      {
        query: GET_ALL_BLOCKS,
        variables: { where: { address: nodeData?.wallet?.address } },
      },
      GET_TAGS_AND_ENTITIES,
      { query: GET_ALL_BLOCKS },
    ],
  });
  const deleteBlockHandler = async (block: Block) => {
    try {
      await deleteBlock({
        variables: {
          where: { uuid: block.uuid },
        },
      });
      toast({
        title: "Block Deleted!",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Error",
        description:
          "There was an error when deleting your block. Please try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    onClose();
  };

  return (
    <>
      <Menu gutter={15} offset={[15, 12]}>
        <MenuButton sx={styles.MenuButton} as={Box}>
          <Box sx={styles.MenuContents}>
            <BlockIcon/>
            <Text ml="4px">Add block</Text>
          </Box>
        </MenuButton>
        <MenuList>
          <MenuGroup ml="12.8" title="Block types">
            {blockTypes.map(type => (
              <MenuItem onClick={() => {
                  setBlockType(type)
                  onOpen()
                }}>
                <Box sx={styles.MenuContents}>
                  <Text ml="5px">{type}</Text>
                </Box>
              </MenuItem>
            ))}
          </MenuGroup>
        </MenuList>
      </Menu>

      <AddBlockTypeModal
        tags={
          filterUniqueObjects(tagAndEntitiesData?.tags, "text")?.map(
            (i) => i.text
          ) || []
        }
        entities={
          filterUniqueObjects(tagAndEntitiesData?.entities, "name")?.map(
            (i) => i.name
          ) || []
        }
        isOpen={isOpen}
        saveToWorkspaceFn={addBlockToSandboxHandler}
        onClose={onClose}
        blockType={blockType}
      />
    </>
  );
};
