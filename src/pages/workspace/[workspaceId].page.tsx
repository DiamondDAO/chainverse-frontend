import { Box, Button, Text, useDisclosure, useToast } from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "@/components/Layout";
import { AddBlockModal } from "@/components/AddBlockModal";
import { useAccount } from "wagmi";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  GET_NOTES,
  GET_TAGS_AND_ENTITIES,
  GET_WORKSPACE,
  GET_WORKSPACES,
} from "@/services/Apollo/Queries";
import { filterUniqueObjects } from "@/common/utils";
import { CreateSnapshotIcon } from "@/components/Icons/CreateSnapshotIcon";
import { AddBlockIcon } from "@/components/Icons/AddBlockIcon";
import { WorkspaceNavigator } from "@/components/Workspace/WorkspaceNavigator";
import { Flow } from "@/components/Workspace/Flow";
import Router, { useRouter } from "next/router";
import { Loader } from "@/components/Loader";
import {
  DELETE_WORKSPACE,
  UPDATE_WORKSPACE,
} from "@/services/Apollo/Mutations";
import { subText } from "@/theme";
import { BlockDrawer } from "@/components/Workspace/BlockDrawer";
import { EntityDrawer } from "@/components/Explorer/EntityDrawer";

import { DeleteModal } from "@/components/DeleteBlockModal";

const Workspace: NextPage = () => {
  const router = useRouter();
  const { workspaceId } = router.query;
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

  const {
    isOpen: isDeleteModalOpen,
    onClose: onDeleteModalClose,
    onOpen: onDeleteModalOpen,
  } = useDisclosure();

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
        GET_WORKSPACES,
        { query: GET_WORKSPACE, variables: { where: { uuid: workspaceId } } },
      ],
    }
  );

  const [deleteWorkspace, { error: deleteWokspaceError }] = useMutation(
    DELETE_WORKSPACE,
    { refetchQueries: [GET_WORKSPACES] }
  );

  const workspace = workspaceData?.workspaces?.[0];
  const [date, setDate] = useState("");
  const { data: tagAndEntitiesData } = useQuery(GET_TAGS_AND_ENTITIES);
  const [currentNode, setCurrentNode] = useState(null);
  const [{ data: walletData }] = useAccount();
  const [rfInstance, setRfInstance] = useState(null);
  // TODO: make it a real last updated
  useEffect(() => {
    setDate(new Date().toLocaleString());
  }, []);
  const notesData = useMemo(() => workspace?.blocks, [workspace?.blocks]);

  const entityData = useMemo(() => workspace?.entities, [workspace?.entities]);

  const nodeData = useMemo(
    () => entityData?.concat(notesData),
    [entityData, notesData]
  );

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
            rfObject: JSON.stringify(rfInstance.toObject()),
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
          "There was an error when creating your block. Please try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    onClose();
    setDeletingWorkspace(false);
  };

  if (!workspaceData) {
    return <Loader />;
  }
  return (
    <>
      <Layout>
        {/* Graph */}
        {workspace?.length !== 0 && (
          <>
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
                  restoredFlow={workspace?.rfObject}
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
                  {workspace?.name ?? "Your Sandbox"}
                </Text>

                <Text color="diamond.gray.3" zIndex={1} fontSize={subText}>
                  Last updated: {date}
                </Text>
              </Box>
              <Box mt="40px" display="flex" sx={{ columnGap: "50px" }}>
                <Box maxWidth="210px" zIndex={3}>
                  <WorkspaceNavigator />
                  <Box mt="24px">
                    <Button
                      p="8px 12px"
                      isLoading={isSavingWorkspace}
                      isDisabled={isSavingWorkspace}
                      onClick={saveWorkspaceHandler}
                      leftIcon={<CreateSnapshotIcon />}
                      variant="primary"
                    >
                      Save workspace
                    </Button>
                    <Button
                      mt="4px"
                      p="8px 12px"
                      leftIcon={<AddBlockIcon />}
                      onClick={onDeleteModalOpen}
                      variant="error"
                    >
                      Remove Workspace
                    </Button>
                    <Button
                      mt="4px"
                      p="8px 12px"
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
                editBlockHandler={onOpen}
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
                  filterUniqueObjects(
                    tagAndEntitiesData?.entities,
                    "name"
                  )?.map((i) => i.name) || []
                }
                isOpen={isOpen}
                onClose={onClose}
              />
            </Box>
            <DeleteModal
              title={`Delete Workspace`}
              subtitle={`Are you sure you want to delete the workspace?`}
              onClose={onDeleteModalClose}
              isOpen={isDeleteModalOpen}
              deleting={deletingWorkspace}
              actionHandler={deleteWorkspaceHandler}
            />
          </>
        )}
        {workspace?.length === 0 && (
          <Box display="flex" justifyContent="center">
            Not a valid workspace
          </Box>
        )}
      </Layout>
    </>
  );
};

export default Workspace;
