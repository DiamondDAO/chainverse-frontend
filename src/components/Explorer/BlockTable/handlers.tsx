import { AddWorkspaceType } from "@/common/types";
import { UPDATE_SANDBOX, UPDATE_WORKSPACE } from "@/services/Apollo/Mutations";
import { GET_SANDBOX, GET_WORKSPACE_OWNED } from "@/services/Apollo/Queries";
import { useMutation } from "@apollo/client";
import { useToast, Box, Text } from "@chakra-ui/react";
import Router from "next/router";

export const useAddBlockHandler = (walletAddress: string) => {
  const toast = useToast();

  const [addBlockToSandbox] = useMutation(UPDATE_SANDBOX, {
    refetchQueries: [{ query: GET_SANDBOX }],
  });

  const [addBlockToWorkspace] = useMutation(UPDATE_WORKSPACE, {
    refetchQueries: [
      {
        query: GET_WORKSPACE_OWNED,
        variables: { where: { wallet: { address: walletAddress } } },
      },
    ],
  });
  const addBlockHandler = async (
    block: { uuid: string },
    type: AddWorkspaceType,
    workspaceUuid?: string
  ) => {
    try {
      if (type === AddWorkspaceType.Sandbox) {
        await addBlockToSandbox({
          variables: {
            where: {
              wallet: {
                address: walletAddress,
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
            <Text mt="4px">
              Block added to{" "}
              {AddWorkspaceType.Sandbox === type ? "Sandbox" : "Workspace"}
            </Text>
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
  return addBlockHandler;
};
