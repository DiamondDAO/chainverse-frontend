import type { NextPage } from "next";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box, Button, Text,
  Menu,MenuButton,MenuDivider,MenuGroup,MenuItem,MenuList,
  useDisclosure, useToast } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

import { Layout } from "@/components/Layout";
import { AddBlockTypeModal } from "@/components/AddBlockTypeModal";
import { CreateSnapshotIcon } from "@/components/Icons/CreateSnapshotIcon";
import { AddBlockIcon } from "@/components/Icons/AddBlockIcon";
import { WorkspaceNavigator } from "@/components/Workspace/WorkspaceNavigator";
import { Flow } from "@/components/Workspace/Flow";
import { EntityDrawer } from "@/components/Drawers/EntityDrawer";

import {
  GET_ALL_NOTES,
  GET_NOTES,
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

import { filterUniqueObjects } from "@/common/utils";
import { bodyText, subText } from "@/theme";
import { BlockDrawer } from "@/components/Drawers/BlockDrawer";
import { Block } from "@/common/types";
import * as styles from "./styles";
const Workspace: NextPage = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: blockDrawerIsOpen,
    onOpen: blockDrawerOnOpen,
    onClose: blockDrawerOnClose,
  } = useDisclosure();
  const {
    isOpen: entityDrawerIsOpen,
    onOpen: entityDrawerOnOpen,
    onClose: entityDrawerOnClose,
  } = useDisclosure();

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

  const blockTypes = ['Entity', 'Note', 'Partnership'];
  const [blockType, setBlockType] = useState("")

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
      sandboxData?.sandboxes[0]?.blocks.filter((i) => i.__typename === "Note"),
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
                      node: { uuid_IN: nodeData.map((node) => node.uuid) },
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
      <Layout>
        {/* Graph */}
        <Box sx={styles.GraphContainer}>
          {nodeData && (
            <Flow
              currentNode={currentNode}
              nodeData={nodeData}
              onInit={setRfInstance}
              setCurrentNode={(value) => {
                setCurrentNode(value);
                value.__typename === "Note" && blockDrawerOnOpen();
                value.__typename === "Entity" && entityDrawerOnOpen();
              }}
            />
          )}
        </Box>
        <Box sx={styles.Container}>
          <Box sx={styles.HeaderContainer}>
            <Text
              ref={workspaceNameRef}
              suppressContentEditableWarning={true}
              contentEditable
              sx={styles.HeaderText}
            >
              Your Sandbox
            </Text>

            <Text sx={styles.HeaderSubText} fontSize={subText}>
              Last updated: {date}
            </Text>
          </Box>
          <Box sx={styles.WorkspaceBody}>
            <Box sx={styles.WorkspaceSidebar}>
              <WorkspaceNavigator />
              <Menu gutter={15} offset={[15, 12]}>
                <MenuButton sx={styles.MenuButton} as={Box}>
                  <Box sx={styles.MenuContents}>
                    <AddBlockIcon/>
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
              <Box mt="20px">
                <Button
                  isLoading={isSavingWorkspace}
                  isDisabled={isSavingWorkspace}
                  sx={styles.ButtonStyle}
                  onClick={saveWorkspaceHandler}
                  leftIcon={<CreateSnapshotIcon />}
                  variant="primary"
                >
                  Save as workspace
                </Button>
              </Box>
            </Box>
          </Box>
          <BlockDrawer
            nodeData={currentNode?.__typename == "Note" && currentNode}
            isOpen={blockDrawerIsOpen}
            onClose={() => {
              setCurrentNode(null);
              blockDrawerOnClose();
            }}
            actions={{ editBlock: onOpen, deleteBlock: deleteBlockHandler }}
          />
          <EntityDrawer
            nodeData={currentNode?.__typename == "Entity" && currentNode}
            isOpen={entityDrawerIsOpen}
            onClose={() => {
              setCurrentNode(null);
              entityDrawerOnClose();
            }}
          />
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
        </Box>
      </Layout>
    </>
  );
};

export default Workspace;
