import {
  Box,
  StylesProvider,
  Text,
  Button,
  useDisclosure,
  useToast,
  Menu,MenuButton,MenuDivider,MenuGroup,MenuItem,MenuList,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { AddBlockTypeModal } from "@/components/AddBlockTypeModal";
import { useAccount } from "wagmi";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { bodyText, subText } from "@/theme";
import { filterUniqueObjects } from "@/common/utils";
import { WorkspaceNavigator } from "@/components/Workspace/WorkspaceNavigator";
import { FilterMenu, FilterTypes } from "@/components/Workspace/FilterMenu";
import { PlusIcon } from "@/components/Icons/PlusIcon";
import { AddPillsToText } from "@/components/UtilityComponents/AddPillsToText";
import { BlockIcon } from "@/components/Icons/BlockIcon";
import { AddBlockIcon } from "@/components/Icons/AddBlockIcon";
import { AddWorkspaceType, Block, IconVariants } from "@/common/types";
import {
  GET_ALL_NOTES,
  GET_NOTES,
  GET_ALL_BLOCKS,
  GET_SANDBOX,
  GET_ALL_CREATED,
  GET_ENTITIES_DATA,
  GET_TAGS_AND_ENTITIES,
  GET_WORKSPACE_OWNED,
} from "@/services/Apollo/Queries";
import {
  ADD_SANDBOX_TO_WALLET,
  CREATE_WORKSPACES,
  DELETE_NOTES,
  DELETE_PARTNERSHIPS,
  DELETE_ENTITIES,
  RESET_SANDBOX,
  UPDATE_SANDBOX,
  UPDATE_WORKSPACE,
} from "@/services/Apollo/Mutations";
import { NoteBlockDrawer } from "@/components/Drawers/NoteBlockDrawer";
import { PartnershipBlockDrawer } from "@/components/Drawers/PartnershipBlockDrawer";
import { EntityDrawer } from "@/components/Drawers/EntityDrawer";
import Router from "next/router";
import * as styles from "./styles";

const AllBlocks: NextPage = () => {
  const toast = useToast();
  const [getNotes, { data }] = useLazyQuery(GET_ALL_CREATED);
  const { data: tagAndEntitiesData } = useQuery(GET_TAGS_AND_ENTITIES);
  const [{ data: walletData }] = useAccount();
  const [currentNode, setCurrentNode] = useState(null);
  const filteredTagsState = useState<string[]>([]);
  const filteredEntitiesState = useState<string[]>([]);

  const blockTypes = ['Entity', 'Note', 'Partnership'];
  const [blockType, setBlockType] = useState("")

  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: noteBlockDrawerIsOpen,
    onOpen: noteBlockDrawerOnOpen,
    onClose: noteBlockDrawerOnClose,
  } = useDisclosure();
  const {
    isOpen: partnershipBlockDrawerIsOpen,
    onOpen: partnershipBlockDrawerOnOpen,
    onClose: partnershipBlockDrawerOnClose,
  } = useDisclosure();
  const {
    isOpen: entityDrawerIsOpen,
    onOpen: entityDrawerOnOpen,
    onClose: entityDrawerOnClose,
  } = useDisclosure();

  const blockCount = useMemo(
    () => (data?.wallets[0].blocks.length + data?.wallets[0].entities.length),
    [data]
  );

  console.log("WHAT IS DATA?.WALLETS ---" + JSON.stringify(data?.wallets))

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
  const [deleteNoteBlock, { error: deleteNoteBlockError }] = useMutation(DELETE_NOTES, {
    refetchQueries: [
      {
        query: GET_ALL_BLOCKS,
        variables: { where: { address: walletData?.address } },
      },
      GET_TAGS_AND_ENTITIES,
    ],
  });

  const [deletePartnershipBlock, { error: deletePartnershipBlockError }] = useMutation(DELETE_PARTNERSHIPS, {
    refetchQueries: [
      {
        query: GET_ALL_BLOCKS,
        variables: { where: { address: walletData?.address } },
      },
      GET_TAGS_AND_ENTITIES,
    ],
  });

  const [deleteEntity, { error: deleteEntityError }] = useMutation(DELETE_ENTITIES, {
    refetchQueries: [
      {
        query: GET_ENTITIES_DATA,
        variables: { where: { address: walletData?.address } },
      },
      GET_TAGS_AND_ENTITIES,
    ],
  });


  const deleteBlockHandler = async (block: any) => {
    try {
      if (block.__typename === "Note") {
        await deleteNoteBlock({
          variables: {
            where: { uuid: block.uuid },
          },
        });
        toast({
          title: "Note Block Deleted!",
          status: "info",
          duration: 2000,
          isClosable: true,
        });
      } else if (block.__typename === "Partnership") {
        await deletePartnershipBlock({
          variables: {
            where: { uuid: block.uuid },
          },
        });
        toast({
          title: "Partnership Block Deleted!",
          status: "info",
          duration: 2000,
          isClosable: true,
        });
      }
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

  const deleteEntityHandler = async (block?: any) => {
    console.log("WHAT IS A BLOCK --- " + JSON.stringify(block))
    try {
      await deleteEntity({
        variables: {
          where: { uuid: block.uuid },
        },
      });
      toast({
        title: "Entity Block Deleted!",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Error",
        description:
          "There was an error when deleting your entity. Please try again.",
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
    block: any,
    type: AddWorkspaceType,
    workspaceUuid?: string
  ) => {
    try {
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
              <Menu gutter={15} offset={[15, 12]}>
                <MenuButton sx={styles.MenuButton} as={Box}>
                  <Box sx={styles.MenuContents}>
                    <AddBlockIcon/>
                    <Text ml="4px">Add block</Text>
                  </Box>
                </MenuButton>
                <MenuList>
                  <MenuGroup ml="12.8" title="Block types">
                    {blockTypes.map((type, idx) => (
                      <MenuItem key={idx} onClick={() => {
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
                  {/*{data?.wallets[0].blocks.filter((noteData) => {
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
                    })*/}
                    {data?.wallets[0].blocks
                    .map((block, idx) => {
                      return (
                        <Box
                          onClick={() => {
                            setCurrentNode(block);
                            if (block.__typename === "Note") {noteBlockDrawerOnOpen()}
                            else if (block.__typename === "Partnership") {partnershipBlockDrawerOnOpen()}
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
                    {data?.wallets[0].entities
                    .map((block, idx) => {
                      return (
                        <Box
                          onClick={() => {
                            setCurrentNode(block);
                            entityDrawerOnOpen()
                          }}
                          key={idx}
                          sx={styles.BlockItem}
                        >
                          <Box fontSize={bodyText} fontWeight="500" mr="4px">
                            {block.__typename}: {block.name}
                          </Box>
                          <Box>
                            Chain: {block.network}
                          </Box>
                        </Box>
                      );
                    })}
                </Box>
              </Box>
            </Box>
          </Box>
          <NoteBlockDrawer
            nodeData={currentNode?.__typename == "Note" && currentNode}
            isOpen={noteBlockDrawerIsOpen}
            onClose={() => {
              setCurrentNode(null);
              noteBlockDrawerOnClose();
            }}
            actions={{
              addBlockToWorkspace: addBlockHandler,
              editBlock: () => {
                onOpen();
                setBlockType('Note');
              },
              deleteBlock: deleteBlockHandler }}
          />
          <PartnershipBlockDrawer
            nodeData={currentNode?.__typename == "Partnership" && currentNode}
            isOpen={partnershipBlockDrawerIsOpen}
            onClose={() => {
              setCurrentNode(null);
              partnershipBlockDrawerOnClose();
            }}
            actions={{
              addBlockToWorkspace: addBlockHandler,
              editBlock: () => {
                onOpen();
                setBlockType('Partnership');
              },
              deleteBlock: deleteBlockHandler }}
          />
          <EntityDrawer
            nodeData={currentNode?.__typename == "Entity" && currentNode}
            isOpen={entityDrawerIsOpen}
            onClose={() => {
              setCurrentNode(null);
              entityDrawerOnClose();
            }}
            actions={{
              editBlock: () => {
                onOpen();
                setBlockType('Entity');
              },
              deleteBlock: deleteEntityHandler
            }}
          />
          <AddBlockTypeModal
            tags={tags}
            nodeData={isOpen && currentNode}
            entities={entities}
            isOpen={isOpen}
            onClose={onClose}
            blockType={blockType}
          />
        </Box>
      </Layout>
    </>
  );
};

export default AllBlocks;
