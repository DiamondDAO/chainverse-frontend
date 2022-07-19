import { useState } from "react";
import Router, { useRouter } from "next/router";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { DELETE_WORKSPACE } from "@/services/Apollo/Mutations";
import { GET_WORKSPACE_OWNED } from "@/services/Apollo/Queries";


export const useDeleteWorkspace = (walletData?: any) => {

  const router = useRouter();
  const { workspaceId } = router.query;
  const toast = useToast();
  const { onClose } = useDisclosure();

  const [deletingWorkspace, setDeletingWorkspace] = useState(false);
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

  return {
    deletingWorkspace,
    deleteWorkspaceHandler,
  }
}