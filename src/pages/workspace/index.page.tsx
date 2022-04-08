import type { NextPage } from "next";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

import { Layout } from "@/components/Layout";
import { AddBlockModal } from "@/components/AddBlockModal";
import { CreateSnapshotIcon } from "@/components/Icons/CreateSnapshotIcon";
import { AddBlockIcon } from "@/components/Icons/AddBlockIcon";
import { WorkspaceNavigator } from "@/components/Workspace/WorkspaceNavigator";
import { Flow } from "@/components/Workspace/Flow";
import { EntityDrawer } from "@/components/Drawers/EntityDrawer";

import {
  GET_ALL_NOTES,
  GET_NOTES,
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
import { bodyText } from "@/theme";
import { BlockDrawer } from "@/components/Drawers/BlockDrawer";
import { Block } from "@/common/types";

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
        query: GET_NOTES,
        variables: { where: { address: nodeData?.wallet?.address } },
      },
      GET_TAGS_AND_ENTITIES,
      { query: GET_ALL_NOTES },
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
        <Box
          top="0"
          left="0"
          bottom="0"
          right="0"
          position="absolute"
          zIndex={0}
        >
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
        <Box display="flex" width="100%" flexDir="column">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text
              ref={workspaceNameRef}
              suppressContentEditableWarning={true}
              contentEditable
              fontWeight="600"
              fontSize="2rem"
              zIndex={1}
            >
              Your Sandbox
            </Text>

            <Text color="diamond.gray.3" zIndex={1}>
              Last updated: {date}
            </Text>
          </Box>
          <Box mt="40px" display="flex" sx={{ columnGap: "50px" }}>
            <Box maxWidth="210px" zIndex={3}>
              <WorkspaceNavigator />
              <Box mt="24px">
                <Button
                  isLoading={isSavingWorkspace}
                  isDisabled={isSavingWorkspace}
                  p="8px 12px"
                  fontSize={bodyText}
                  onClick={saveWorkspaceHandler}
                  leftIcon={<CreateSnapshotIcon />}
                  variant="primary"
                >
                  Save as workspace
                </Button>
                <Button
                  mt="4px"
                  p="8px 12px"
                  fontSize={bodyText}
                  leftIcon={<AddBlockIcon />}
                  onClick={onOpen}
                  variant="primary"
                >
                  Add block
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
          <AddBlockModal
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
          />
        </Box>
      </Layout>
    </>
  );
};

export default Workspace;
