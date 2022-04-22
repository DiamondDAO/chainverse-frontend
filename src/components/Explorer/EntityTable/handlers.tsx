import { AddWorkspaceType } from "@/common/types";
import { UPDATE_SANDBOX, UPDATE_WORKSPACE } from "@/services/Apollo/Mutations";
import { GET_SANDBOX, GET_WORKSPACE_OWNED } from "@/services/Apollo/Queries";
import { ERRORS } from "@/common/errors";
import { useMutation } from "@apollo/client";
import { useToast, Box, Text } from "@chakra-ui/react";
import Router from "next/router";

export const useAddEntityHandler = (walletAddress: string) => {
  const toast = useToast();
  const [addEntityToSandbox] = useMutation(UPDATE_SANDBOX, {
    refetchQueries: [{ query: GET_SANDBOX }],
  });

  const [addEntityToWorkspace] = useMutation(UPDATE_WORKSPACE, {
    refetchQueries: [
      {
        query: GET_WORKSPACE_OWNED,
        variables: { where: { wallet: { address: walletAddress } } },
      },
    ],
  });

  const addEntityHandler = async (
    row,
    type: AddWorkspaceType,
    workspaceUuid?: string
  ) => {
    try {
      if (row.original) row = row.original;
      const nodeObject = row?.id
        ? { id: row?.id }
        : row?.address
        ? { address: row?.address }
        : row?.name
        ? { name: row?.name }
        : null;

      if (!nodeObject) {
        throw Error(ERRORS.NO_UNIQUE_ID);
      }
      if (type === AddWorkspaceType.Sandbox) {
        await addEntityToSandbox({
          variables: {
            where: {
              wallet: {
                address: walletAddress,
              },
            },
            connect: {
              entities: {
                where: {
                  node: nodeObject,
                },
              },
            },
          },
        });
      } else {
        await addEntityToWorkspace({
          variables: {
            where: { uuid: workspaceUuid },
            connect: {
              entities: {
                where: {
                  node: nodeObject,
                },
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
                AddWorkspaceType.Workspace == type
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
      console.log(e);
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
            <Text fontWeight="500">
              There was an error adding to workspace: {e.message}
            </Text>
          </Box>
        ),
      });
    }
  };
  return addEntityHandler;
};
