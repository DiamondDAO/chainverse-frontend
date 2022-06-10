import {
  Box,
  StylesProvider,
  Text,
  toast,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { AddBlockModal } from "@/components/AddBlockModal";
import { useAccount } from "wagmi";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  GET_ALL_NOTES,
  GET_NOTES,
  GET_ALL_BLOCKS,
  GET_SANDBOX,
  GET_TAGS_AND_ENTITIES,
  GET_WORKSPACE_OWNED,
} from "@/services/Apollo/Queries";
import { bodyText, subText } from "@/theme";
import { filterUniqueObjects } from "@/common/utils";
import { WorkspaceNavigator } from "@/components/Workspace/WorkspaceNavigator";
import { FilterMenu, FilterTypes } from "@/components/Workspace/FilterMenu";
import { PlusIcon } from "@/components/Icons/PlusIcon";
import { AddPillsToText } from "@/components/UtilityComponents/AddPillsToText";
import { BlockIcon } from "@/components/Icons/BlockIcon";
import { AddWorkspaceType, Block, IconVariants } from "@/common/types";
import {
  DELETE_NOTES,
  UPDATE_SANDBOX,
  UPDATE_WORKSPACE,
} from "@/services/Apollo/Mutations";
import { BlockDrawer } from "@/components/Drawers/BlockDrawer";
import Router from "next/router";
import * as styles from "./styles";
const AddBlockCard = ({ onClick }) => (
  <Box as="button" onClick={onClick} sx={styles.AddBlockCardStyles}>
    <PlusIcon width="22" height="22" />
    <Text sx={styles.AddBlockStylesText}>ADD NEW BLOCK</Text>
  </Box>
);

const AllBlocks: NextPage = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  const [getNotes, { data }] = useLazyQuery(GET_ALL_BLOCKS);
  const { data: tagAndEntitiesData } = useQuery(GET_TAGS_AND_ENTITIES);
  const [{ data: walletData }] = useAccount();
  const [currentNode, setCurrentNode] = useState(null);
  const filteredTagsState = useState<string[]>([]);
  const filteredEntitiesState = useState<string[]>([]);

  console.log("Get notes gives us --------- " + JSON.stringify(getNotes))

  const { isOpen: drawerIsOpen, onOpen: drawerOnOpen } = useDisclosure();

  const blockCount = useMemo(
    () => data?.wallets[0].blocks.length,
    [data]
  );

  useEffect(() => {
    if (walletData?.address) {
      getNotes({ variables: { where: { address: walletData.address } } });
    }
  }, [getNotes, walletData?.address]);

  const tags = useMemo(
    () =>
      filterUniqueObjects(tagAndEntitiesData?.tags, "tag")?.map((i) => i.tag) ||
      [],
    [tagAndEntitiesData?.tags]
  );

  const entities = useMemo(
    () =>
      filterUniqueObjects(tagAndEntitiesData?.entities, "name")?.map(
        (i) => i.name
      ) || [],
    [tagAndEntitiesData?.entities]
  );
  const [deleteBlock, { error: deleteBlockError }] = useMutation(DELETE_NOTES, {
    refetchQueries: [
      {
        query: GET_ALL_BLOCKS,
        variables: { where: { address: walletData?.address } },
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
          "There was an error when creating your block. Please try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    onClose();
  };

  const [addBlockToSandbox, { error: addBlockToSandboxError }] = useMutation(
    UPDATE_SANDBOX,
    {
      refetchQueries: [{ query: GET_SANDBOX }],
    }
  );

  const [addBlockToWorkspace, { error: addBlockToWorkspaceError }] =
    useMutation(UPDATE_WORKSPACE, {
      refetchQueries: [
        {
          query: GET_WORKSPACE_OWNED,
          variables: { where: { wallet: { address: walletData?.address } } },
        },
      ],
    });
  const addBlockHandler = async (
    block: Block,
    type: AddWorkspaceType,
    workspaceUuid?: string
  ) => {
    try {
      console.log("Block type is = " + block.__typename)
      if (type === AddWorkspaceType.Sandbox) {
        if (block.__typename === "Note") {
          await addBlockToSandbox({
            variables: {
              where: {
                wallet: {
                  address: walletData.address,
                },
              },
              connect: {
                blocks: {
                  Note: [
                    {
                      where: {
                        node: {
                          uuid: block.uuid,
                        },
                      },
                    },
                  ],
                },
              },
            },
          });
        } else if (block.__typename === "Partnership") {
          await addBlockToSandbox({
            variables: {
              where: {
                wallet: {
                  address: walletData.address,
                },
              },
              connect: {
                blocks: {
                  Partnership: [
                    {
                      where: {
                        node: {
                          uuid: block.uuid,
                        },
                      },
                    },
                  ],
                },
              },
            },
          });
        }
      } else {
        if (block.__typename === "Note") {
          await addBlockToWorkspace({
            variables: {
              where: { uuid: workspaceUuid },
              connect: {
                blocks: {
                  Note: [
                    {
                      where: {
                        node: {
                          uuid: block.uuid,
                        },
                      },
                    },
                  ],
                },
              },
            },
          });
        } else if (block.__typename === "Partnership") {
          await addBlockToWorkspace({
            variables: {
              where: { uuid: workspaceUuid },
              connect: {
                blocks: {
                  Partnership: [
                    {
                      where: {
                        node: {
                          uuid: block.uuid,
                        },
                      },
                    },
                  ],
                },
              },
            },
          });
        }
      }
      toast({
        position: "top-right",
        isClosable: true,
        duration: 2000,
        render: () => (
          <Box sx={styles.ToastHeader("success")}>
            <Text fontWeight="500">Added to workspace</Text>
            <Text mt="4px">
              Block added to{" "}
              {AddWorkspaceType.Sandbox === type ? "Sandbox" : "Workspace"}
            </Text>
            <Text
              sx={styles.ToastButton}
              onClick={() =>
                AddWorkspaceType.Workspace === type
                  ? Router.push(`/workspace/${workspaceUuid}`)
                  : Router.push("/workspace")
              }
            >
              View workspace
            </Text>
          </Box>
        ),
      });
    } catch (e) {
      toast({
        position: "top-right",
        isClosable: true,
        duration: 2000,
        render: () => (
          <Box sx={styles.ToastHeader("failure")}>
            <Text fontWeight="500">There was an error adding to workspace</Text>
          </Box>
        ),
      });
      throw Error(`${e}`);
    }
  };
  return (
    <>
      <Layout>
        <Box sx={styles.Container}>
          <Box sx={styles.HeaderContainer}>
            <Text sx={styles.HeaderText}>Your Blocks</Text>

            <Text sx={styles.HeaderSubText}>
              You’ve created a total of {blockCount} blocks.
            </Text>
          </Box>
          <Box sx={styles.WorkspaceBody}>
            <Box sx={styles.WorkspaceSidebar}>
              <WorkspaceNavigator />
            </Box>
            <Box>
              <Box display="flex" sx={{ columnGap: "4px" }}>
                <FilterMenu
                  filteredItemState={filteredTagsState}
                  data={tags}
                  type={FilterTypes.Tags}
                />
                <FilterMenu
                  filteredItemState={filteredEntitiesState}
                  data={entities}
                  type={FilterTypes.Entities}
                />
              </Box>
              <Box>
                <Box sx={styles.BlockPageBody}>
                  <Box>
                    <AddBlockCard onClick={onOpen} />
                  </Box>
                  {data?.wallets[0].blocks
                    .filter((nodeData) => nodeData.__typename === "Note" || nodeData.__typename === "Partnership")
                    .filter((noteData) => {
                      let tagFlag = true;
                      let entitiyFlag = true;
                      if (filteredTagsState[0].length !== 0) {
                        tagFlag = filteredTagsState[0].reduce(
                          (flag, currentTag) => {
                            return (
                              flag &&
                              noteData.tags
                                .map((i) => i.tag)
                                .includes(currentTag)
                            );
                          },
                          tagFlag
                        );
                      }
                      if (filteredEntitiesState[0].length !== 0) {
                        entitiyFlag = filteredEntitiesState[0].reduce(
                          (flag, currentEntitiy) => {
                            return (
                              flag &&
                              noteData.entities
                                .map((i) => i.name)
                                .includes(currentEntitiy)
                            );
                          },
                          entitiyFlag
                        );
                      }
                      return tagFlag && entitiyFlag;
                    })
                    .map((block, idx) => {
                      return (
                        <Box
                          onClick={() => {
                            setCurrentNode(block);
                            drawerOnOpen();
                          }}
                          key={idx}
                          sx={styles.BlockItem}
                        >
                          <Box fontSize={bodyText} fontWeight="500" mr="4px">
                            {block.__typename} Block
                          </Box>
                          <Box>
                            <AddPillsToText text={block.text} />
                          </Box>
                        </Box>
                      );
                    })}
                </Box>
              </Box>
            </Box>
          </Box>
          <BlockDrawer
            nodeData={currentNode?.__typename == "Note" && currentNode}
            isOpen={drawerIsOpen}
            onClose={() => {
              setCurrentNode(null);
              drawerOnOpen();
            }}
            actions={{
              addBlockToWorkspace: addBlockHandler,
              editBlock: onOpen,
              deleteBlock: deleteBlockHandler,
            }}
          />
          <AddBlockModal
            tags={tags}
            nodeData={drawerIsOpen && currentNode}
            entities={entities}
            isOpen={isOpen}
            onClose={onClose}
          />
        </Box>
      </Layout>
    </>
  );
};

export default AllBlocks;
