import {
  Box,
  Button,
  Text,
  Menu,MenuButton,MenuDivider,MenuGroup,MenuItem,MenuList,
  useDisclosure, useToast } from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "@/components/Layout";
import { AddBlockTypeModal } from "@/components/AddBlockTypeModal";
import { useAccount } from "wagmi";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  GET_ALL_NOTES,
  GET_NOTES,
  GET_ALL_BLOCKS,
  GET_TAGS_AND_ENTITIES,
  GET_WORKSPACE,
  GET_WORKSPACE_OWNED,
} from "@/services/Apollo/Queries";
import { filterUniqueObjects } from "@/common/utils";
import { CreateSnapshotIcon } from "@/components/Icons/CreateSnapshotIcon";
import { AddBlockIcon } from "@/components/Icons/AddBlockIcon";
import { WorkspaceNavigator } from "@/components/Workspace/WorkspaceNavigator";
import { Flow } from "@/components/Workspace/Flow";
import Router, { useRouter } from "next/router";
import { Loader } from "@/components/Loader";
import {
  DELETE_NOTES,
  DELETE_PARTNERSHIPS,
  DELETE_WORKSPACE,
  UPDATE_WORKSPACE,
} from "@/services/Apollo/Mutations";
import { subText } from "@/theme";
import { DeleteModal } from "@/components/DeleteModal";
import { NoteBlockDrawer } from "@/components/Drawers/NoteBlockDrawer";
import { PartnershipBlockDrawer } from "@/components/Drawers/PartnershipBlockDrawer";
import { EntityDrawer } from "@/components/Drawers/EntityDrawer";
import { Block } from "@/common/types";
import * as styles from "./styles";

const Workspace: NextPage = () => {
  const router = useRouter();
  const { workspaceId } = router.query;
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

  const {
    isOpen: isDeleteModalOpen,
    onClose: onDeleteModalClose,
    onOpen: onDeleteModalOpen,
  } = useDisclosure();
  const [{ data: walletData }] = useAccount();
  const {
    loading,
    error,
    data: workspaceData,
  } = useQuery(GET_WORKSPACE, {
    variables: { where: { uuid: workspaceId } },
    fetchPolicy: "network-only",
  });
  const toast = useToast();
  const [updateWorkspace, { error: updateWorkspaceError }] = useMutation(
    UPDATE_WORKSPACE,
    {
      refetchQueries: [
        {
          query: GET_WORKSPACE_OWNED,
          variables: { where: { wallet: { address: walletData?.address } } },
        },
        { query: GET_WORKSPACE, variables: { where: { uuid: workspaceId } } },
      ],
    }
  );

  const [deleteWorkspace, { error: deleteWokspaceError }] = useMutation(
    DELETE_WORKSPACE,
    {
      refetchQueries: [
        {
          query: GET_WORKSPACE_OWNED,
          variables: { where: { wallet: { address: walletData?.address } } },
        },
      ],
    }
  );

  const workspace = workspaceData?.workspaces?.[0];
  const [date, setDate] = useState("");
  const { data: tagAndEntitiesData } = useQuery(GET_TAGS_AND_ENTITIES);
  const [currentNode, setCurrentNode] = useState(null);
  const [rfInstance, setRfInstance] = useState(null);
  // TODO: make it a real last updated
  useEffect(() => {
    setDate(new Date().toLocaleString());
  }, []);

  const notesData = useMemo(() => workspace?.blocks.filter((i) => i.__typename === "Note" || i.__typename === "Partnership" ),
  [workspace?.blocks]);

  const entityData = useMemo(() => workspace?.entities, [workspace?.entities]);

  const nodeData = useMemo(
    () => entityData?.concat(notesData),
    [entityData, notesData]
  );

  const blockTypes = ['Entity', 'Note', 'Partnership'];
  const [blockType, setBlockType] = useState("")


  const workspaceNameRef = useRef(null);
  const [isSavingWorkspace, setIsSavingWorkspace] = useState(false);
  const saveWorkspaceHandler = async () => {
    setIsSavingWorkspace(true);
    try {
      await updateWorkspace({
        variables: {
          where: {
            uuid: workspaceId,
          },
          update: {
            rfObject: JSON.stringify(rfInstance?.toObject()),
            name: workspaceNameRef.current.innerText,
          },
        },
      });

      toast({
        title: `Workspace ${workspaceNameRef.current.innerText} Saved!`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Error",
        description:
          "There was an error when saving your workspace. Please try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    setIsSavingWorkspace(false);
  };
  const [deletingWorkspace, setDeletingWorkspace] = useState(false);
  const deleteWorkspaceHandler = async () => {
    try {
      setDeletingWorkspace(true);
      await deleteWorkspace({
        variables: {
          where: { uuid: workspaceId },
        },
      });
      Router.push("/workspace");
    } catch (e) {
      toast({
        title: "Error",
        description:
          "There was an error when deleting your workspace. Please try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    onClose();
    setDeletingWorkspace(false);
  };
  const [deleteNoteBlock, { error: deleteNoteBlockError }] = useMutation(DELETE_NOTES, {
    refetchQueries: [
      {
        query: GET_ALL_BLOCKS,
        variables: { where: { address: nodeData?.wallet?.address } },
      },
      GET_TAGS_AND_ENTITIES,
      { query: GET_ALL_BLOCKS },
    ],
  });

  const [deletePartnershipBlock, { error: deletePartnershipBlockError }] = useMutation(DELETE_PARTNERSHIPS, {
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
  const [addBlockToWorkspace, { error: addBlockToWorkspaceError }] =
    useMutation(UPDATE_WORKSPACE, {
      refetchQueries: [
        {
          query: GET_WORKSPACE_OWNED,
          variables: { where: { wallet: { address: walletData?.address } } },
        },
        { query: GET_WORKSPACE, variables: { where: { uuid: workspaceId } } },
      ],
    });

  const addBlockToWorkspaceHandler = async (data?: any) => {
    try {
      await addBlockToWorkspace({
        variables: {
          where: { uuid: workspaceId },
          connect: {
            blocks: {
              Note: [
                {
                  where: {
                    node: {
                      uuid: data.uuid,
                    },
                  },
                },
              ],
              Partnership: [
                {
                  where: {
                    node: {
                      uuid: data.uuid,
                    },
                  },
                },
              ],
            },
            entities: [
              {
                where: {
                  node: {
                    uuid: data.uuid,
                  }
                }
              }
            ],
          },
        },
      });
    } catch (e) {
      throw e;
    }
  };
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

  if (!workspaceData) {
    return <Loader />;
  }
  return (
    <>
      <Layout>
        {/* Graph */}
        {workspaceData?.workspaces.length !== 0 && (
          <>
            <Box sx={styles.GraphContainer}>
              {nodeData && (
                <Flow
                  currentNode={currentNode}
                  nodeData={nodeData}
                  restoredFlow={workspace?.rfObject}
                  onInit={setRfInstance}
                  setCurrentNode={(value) => {
                    setCurrentNode(value);
                    if (value.__typename === "Note") {noteBlockDrawerOnOpen()}
                    else if (value.__typename === "Partnership") {partnershipBlockDrawerOnOpen()}
                    else if (value.__typename === "Entity") {entityDrawerOnOpen()}
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
                  {workspace?.name ?? "Your Sandbox"}
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
                      sx={styles.ButtonStyle}
                      isLoading={isSavingWorkspace}
                      isDisabled={isSavingWorkspace}
                      onClick={saveWorkspaceHandler}
                      leftIcon={<CreateSnapshotIcon />}
                      variant="primary"
                    >
                      Save workspace
                    </Button>
                    <Button
                      sx={styles.ButtonStyle}
                      leftIcon={<AddBlockIcon />}
                      onClick={onDeleteModalOpen}
                      variant="error"
                    >
                      Delete Workspace
                    </Button>
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
                actions={{ editBlock: onOpen, deleteBlock: deleteBlockHandler }}
              />
              <PartnershipBlockDrawer
                nodeData={currentNode?.__typename == "Partnership" && currentNode}
                isOpen={partnershipBlockDrawerIsOpen}
                onClose={() => {
                  setCurrentNode(null);
                  partnershipBlockDrawerOnClose();
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
                tags={tags}
                entities={entities}
                isOpen={isOpen}
                saveToWorkspaceFn={addBlockToWorkspaceHandler}
                onClose={onClose}
                blockType={blockType}
              />
            </Box>
            <DeleteModal
              title={`Delete Workspace`}
              subtitle={`Are you sure you want to delete the workspace? Deleting this workspace will not remove the nodes from the Chainverse graph.`}
              onClose={onDeleteModalClose}
              isOpen={isDeleteModalOpen}
              isDeleting={deletingWorkspace}
              deleteFn={deleteWorkspaceHandler}
            />
          </>
        )}
        {workspaceData?.workspaces.length === 0 && (
          <Box display="flex" justifyContent="center">
            Not a valid workspace
          </Box>
        )}
      </Layout>
    </>
  );
};

export default Workspace;
