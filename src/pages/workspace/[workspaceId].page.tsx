import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import {
  Box,
  Button,
  Text,
  Menu,MenuButton,MenuGroup,MenuItem,MenuList,
  useDisclosure } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useQuery } from "@apollo/client";
import {
  GET_WORKSPACE,
  GET_WORKSPACE_OWNED,
} from "@/services/Apollo/Queries";

import { Layout } from "@/components/Layout";
import { AddBlockTypeModal } from "@/components/AddBlockTypeModal";
import { CreateSnapshotIcon } from "@/components/Icons/CreateSnapshotIcon";
import { AddBlockIcon } from "@/components/Icons/AddBlockIcon";
import { WorkspaceNavigator } from "@/components/Workspace/WorkspaceNavigator";
import { Flow } from "@/components/Workspace/Flow";
import { useRouter } from "next/router";
import { Loader } from "@/components/Loader";
import { DeleteModal } from "@/components/DeleteModal";
import { NoteBlockDrawer } from "@/components/Drawers/NoteBlockDrawer";
import { PartnershipBlockDrawer } from "@/components/Drawers/PartnershipBlockDrawer";
import { EntityDrawer } from "@/components/Drawers/EntityDrawer";

import { subText } from "@/theme";
import {
  useAddBlockToWorkspace,
  useDeleteBlock,
  useDeleteWorkspace,
  useGetWorkspaceData,
  useSaveWorkspace,
  useTagsAndEntities,
} from "@/common/hooks";
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
  const refetch = [
    {
      query: GET_WORKSPACE_OWNED,
      variables: { where: { wallet: { address: walletData?.address } } },
    },
    { 
      query: GET_WORKSPACE,
      variables: { where: { uuid: workspaceId } }
    },
  ]
  const { addBlockToWorkspaceHandler } = useAddBlockToWorkspace(refetch);
  const { deleteBlockHandler, deleteEntityHandler } = useDeleteBlock(refetch);
  const { deleteWorkspaceHandler, deletingWorkspace } = useDeleteWorkspace(walletData);
  const {
    saveWorkspaceHandler,
    isSavingWorkspace,
    setRfInstance,
    workspaceNameRef,
  } = useSaveWorkspace(refetch);
  
  const { data: workspaceData, loading, error } = useQuery(GET_WORKSPACE, {
    variables: { where: { uuid: workspaceId } },
    fetchPolicy: "network-only",
  });
  const { workspace, nodeData } = useGetWorkspaceData(workspaceData);
  const { tags, entities } = useTagsAndEntities();

  const [date, setDate] = useState("");
  const [currentNode, setCurrentNode] = useState(null);
  
  // TODO: make it a real last updated
  useEffect(() => {
    setDate(new Date().toLocaleString());
  }, []);

  const blockTypes = ['Entity', 'Note', 'Partnership'];
  const [blockType, setBlockType] = useState("")

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
                    console.log("WHAT IS A VALUE --- " + JSON.stringify(value))
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
                actions={{
                  editBlock: () => {
                    onOpen();
                    setBlockType('Note');
                  },
                  deleteBlock: deleteBlockHandler,
                }}
              />
              <PartnershipBlockDrawer
                nodeData={currentNode?.__typename == "Partnership" && currentNode}
                isOpen={partnershipBlockDrawerIsOpen}
                onClose={() => {
                  setCurrentNode(null);
                  partnershipBlockDrawerOnClose();
                }}
                actions={{
                  editBlock: () => {
                    onOpen();
                    setBlockType('Partnership');
                  },
                  deleteBlock: deleteBlockHandler,
                }}
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
                  deleteBlock: deleteEntityHandler,
                }}
              />
              <AddBlockTypeModal
                tags={tags}
                entities={entities}
                isOpen={isOpen}
                saveToWorkspaceFn={addBlockToWorkspaceHandler}
                // onClose={onClose}
                onClose={(refresh) => {
                  onClose();
                  if(refresh){
                    setTimeout(() => {
                      window.location.reload()
                    }, 700);
                  }
                }}
                blockType={blockType}
                nodeData={currentNode}
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
