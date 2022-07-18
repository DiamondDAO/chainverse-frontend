import { CREATE_WORKSPACES, RESET_SANDBOX } from "@/services/Apollo/Mutations";
import { GET_SANDBOX, GET_WORKSPACE_OWNED } from "@/services/Apollo/Queries";
import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useGetSandboxData } from "./useGetSandboxData";


export const useSaveWorkspace = (walletData: any) => {

  const toast = useToast();

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

  const workspaceNameRef = useRef(null);
  const [rfInstance, setRfInstance] = useState(null);
  const [isSavingWorkspace, setIsSavingWorkspace] = useState(false);
  const { nodeData } = useGetSandboxData(walletData);

  const saveWorkspaceHandler = async () => {
    setIsSavingWorkspace(true);
    try {
      await createWorkspace({
        variables: {
          input: [
            {
              name: workspaceNameRef.current.innerText || '',
              rfObject: JSON.stringify(rfInstance?.toObject()),
              blocks: {
                Note: {
                  connect: {
                    where: {
                      node: {
                        uuid_IN: nodeData
                          .filter((node) => node.__typename === 'Note')
                          .map((node) => node.uuid),
                      },
                    },
                  },
                },
                Partnership: {
                  connect: {
                    where: {
                      node: {
                        uuid_IN: nodeData
                          .filter((node) => node.__typename === 'Partnership')
                          .map((node) => node.uuid),
                      },
                    },
                  },
                },
              },
              entities: {
                connect: {
                  where: {
                    node: {
                      uuid_IN: nodeData
                        .filter((node) => node.__typename === 'Entity')
                        .map((node) => node.uuid),
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
              Partnership: [
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
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: 'Error',
        description:
          'There was an error when creating your workspace. Please try again.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
    setIsSavingWorkspace(false);
  };

  return { workspaceNameRef, setRfInstance, isSavingWorkspace, saveWorkspaceHandler }
}