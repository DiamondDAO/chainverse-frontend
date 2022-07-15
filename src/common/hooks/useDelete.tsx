import { useMutation } from "@apollo/client";
import { useDisclosure, useToast } from "@chakra-ui/react";

import {
  GET_ALL_BLOCKS,
  GET_ENTITIES_DATA,
  GET_TAGS_AND_ENTITIES
} from "@/services/Apollo/Queries";
import {
  DELETE_ENTITIES,
  DELETE_NOTES,
  DELETE_PARTNERSHIPS
} from "@/services/Apollo/Mutations";

export const useDelete = (address?: any) => {
  
  const toast = useToast();
  const { onClose } = useDisclosure();

  const [ deleteNoteBlock, { error: deleteNoteBlockError } ] = useMutation(
    DELETE_NOTES,
    {
      refetchQueries: [
        {
          query: GET_ALL_BLOCKS,
          variables: { where: { address: address } },
        },
        GET_TAGS_AND_ENTITIES,
        { query: GET_ALL_BLOCKS },
      ],
    }
  );
  
  const [ deletePartnershipBlock, { error: deletePartnershipBlockError } ] =
    useMutation(DELETE_PARTNERSHIPS, {
      refetchQueries: [
        {
          query: GET_ALL_BLOCKS,
          variables: { where: { address: address } },
        },
        GET_TAGS_AND_ENTITIES,
        { query: GET_ALL_BLOCKS },
      ],
    });
  
  const [ deleteEntity, { error: deleteEntityError } ] = useMutation(
    DELETE_ENTITIES,
    {
      refetchQueries: [
        {
          query: GET_ENTITIES_DATA,
          variables: { where: { address: address } },
        },
        GET_TAGS_AND_ENTITIES,
      ],
    }
  );
  
  const deleteBlockHandler = async (block?: any) => {
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

  const deleteEntityHandler = async (block?: any) => {
    console.log('WHAT IS A BLOCK --- ' + JSON.stringify(block));
    try {
      await deleteEntity({
        variables: {
          where: { uuid: block.uuid },
        },
      });
      toast({
        title: 'Entity Block Deleted!',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: 'Error',
        description:
          'There was an error when deleting your entity. Please try again.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
    onClose();
  };

  return { deleteBlockHandler, deleteEntityHandler }
}
