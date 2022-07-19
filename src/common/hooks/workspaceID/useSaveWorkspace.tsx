import { useRef, useState } from "react";
import { useRouter } from "next/router";

import { useToast } from "@chakra-ui/react";
import { UPDATE_WORKSPACE } from "@/services/Apollo/Mutations";
import { useMutation } from "@apollo/client";

export const useSaveWorkspace = (refetchQueries?: any[]) => {

  const router = useRouter();
  const { workspaceId } = router.query;
  const toast = useToast();

  const [updateWorkspace, { error: updateWorkspaceError }] = useMutation(
    UPDATE_WORKSPACE,
    {
      refetchQueries
    }
  );
  const workspaceNameRef = useRef(null);
  const [rfInstance, setRfInstance] = useState(null);
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

  return {
    saveWorkspaceHandler,
    isSavingWorkspace,
    setRfInstance,
    workspaceNameRef,
  }
}