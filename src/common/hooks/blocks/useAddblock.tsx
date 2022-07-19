import Router from "next/router";
import { Box, Text, useToast } from "@chakra-ui/react";
import { AddWorkspaceType } from "@/common/types";
import { useMutation } from "@apollo/client";
import { UPDATE_SANDBOX, UPDATE_WORKSPACE } from "@/services/Apollo/Mutations";
import { GET_SANDBOX, GET_WORKSPACE_OWNED } from "@/services/Apollo/Queries";
import * as styles from '../../../pages/workspace/styles';

export const useAddBlock = (walletData?: any) => {

  const toast = useToast();
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

  return { addBlockHandler }
}