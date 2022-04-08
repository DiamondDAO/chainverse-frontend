import { Box, Text, toast, useDisclosure, useToast } from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { AddBlockModal } from "@/components/AddBlockModal";
import { useAccount } from "wagmi";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  GET_ALL_NOTES,
  GET_NOTES,
  GET_SANDBOX,
  GET_TAGS_AND_ENTITIES,
  GET_WORKSPACE_OWNED,
} from "@/services/Apollo/Queries";
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

const AddBlockCard = ({ onClick }) => (
  <Box
    as="button"
    onClick={onClick}
    display="flex"
    flexDir="column"
    justifyContent="center"
    width="100%"
    height="94px"
    border="1px solid black"
    borderColor="diamond.gray.3"
    alignItems="center"
    borderRadius="2px"
    bg="diamond.gray.1"
  >
    <PlusIcon width="22" height="22" />
    <Text fontSize="12px" fontWeight="500" color="diamond.gray.3">
      ADD NEW BLOCK
    </Text>
  </Box>
);

const AllBlocks: NextPage = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  const [getNotes, { data }] = useLazyQuery(GET_NOTES);
  const { data: tagAndEntitiesData } = useQuery(GET_TAGS_AND_ENTITIES);
  const [{ data: walletData }] = useAccount();
  const [currentNode, setCurrentNode] = useState(null);
  const filteredTagsState = useState<string[]>([]);
  const filteredEntitiesState = useState<string[]>([]);

  const {
    isOpen: drawerIsOpen,
    onOpen: drawerOnOpen,
    onClose: drawerOnClose,
  } = useDisclosure();

  const blockCount = useMemo(
    () => data?.wallets[0].blocks.filter((i) => i.__typename === "Note").length,
    [data]
  );

  useEffect(() => {
    if (walletData?.address) {
      getNotes({
        variables: { where: { address: walletData.address.toLowerCase() } },
      });
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
        query: GET_NOTES,
        variables: { where: { address: walletData?.address.toLowerCase() } },
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
          variables: {
            where: { wallet: { address: walletData?.address.toLowerCase() } },
          },
        },
      ],
    });
  const addBlockHandler = async (
    block: Block,
    type: AddWorkspaceType,
    workspaceUuid?: string
  ) => {
    try {
      if (type === AddWorkspaceType.Sandbox) {
        await addBlockToSandbox({
          variables: {
            where: {
              wallet: {
                address: walletData.address.toLowerCase(),
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
      } else {
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
      }
      toast({
        position: "top-right",
        isClosable: true,
        duration: 2000,
        render: () => (
          <Box
            maxW="300px"
            mt="50px"
            borderRadius={"5px"}
            color="white"
            p={"8px"}
            fontSize="12px"
            bg="diamond.green"
          >
            <Text fontWeight="500">Added to workspace</Text>
            <Text mt="4px">Block added to Sandbox</Text>
            <Text
              mt="12px"
              borderRadius="2px"
              p="2px"
              ml="-2px"
              width="fit-content"
              _hover={{ bg: "diamond.gray.1" }}
              color="black"
              cursor="pointer"
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
          <Box
            maxW="300px"
            mt="50px"
            borderRadius={"5px"}
            color="white"
            p={"8px"}
            fontSize="12px"
            bg="diamond.red"
          >
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
        <Box display="flex" width="100%" flexDir="column">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontWeight="600" fontSize="2rem" zIndex={1}>
              Your Blocks
            </Text>

            <Text color="diamond.gray.3" zIndex={1}>
              You’ve created a total of {blockCount} blocks.
            </Text>
          </Box>
          <Box mt="40px" display="flex" sx={{ columnGap: "50px" }}>
            <Box maxWidth="210px" width="100%" zIndex={3}>
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
                <Box
                  mt="18px"
                  maxWidth={["260px", null, null, "900px", "1440px"]}
                  sx={{
                    columnCount: [1, null, 2, 3, 4],
                    gap: "30px",
                    columnWidth: "260px",
                    "& > *": {
                      display: "block",
                      wordBreak: "break-word",
                      mb: "16px",
                      breakInside: "avoid",
                    },
                  }}
                >
                  <Box display="inline-flex" width="100%">
                    <AddBlockCard onClick={onOpen} />
                  </Box>
                  {data?.wallets[0].blocks
                    .filter((nodeData) => nodeData.__typename === "Note")
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
                          cursor={"pointer"}
                          onClick={() => {
                            setCurrentNode(block);
                            drawerOnOpen();
                          }}
                          p="8px"
                          fontSize="12px"
                          borderRadius="2px"
                          minH="76px"
                          border="1px solid #000000"
                          key={idx}
                          bg="diamond.white"
                          display="inline-block"
                          width="100%"
                        >
                          <Box mr="4px">
                            <BlockIcon variant={IconVariants.White} />
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
