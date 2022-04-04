import { IconVariants } from "@/common/types";
import { generateDateString, truncateAddress } from "@/common/utils";
import { DeleteModal } from "@/components/DeleteBlockModal";
import { BlockIcon } from "@/components/Icons/BlockIcon";
import { CreateSnapshotIcon } from "@/components/Icons/CreateSnapshotIcon";
import { EntitiesIcon } from "@/components/Icons/EntitiesIcon";
import { TagIcon } from "@/components/Icons/TagIcon";
import { Pill } from "@/components/Pill";
import { AddPillsToText } from "@/components/UtilityComponents/AddPillsToText";
import { DELETE_NOTES } from "@/services/Apollo/Mutations";
import {
  GET_ALL_NOTES,
  GET_NOTES,
  GET_TAGS_AND_ENTITIES,
} from "@/services/Apollo/Queries";
import { bodyText } from "@/theme";
import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Text,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  toast,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { useAccount, useEnsLookup } from "wagmi";

interface IBlockDrawer {
  isOpen: boolean;
  onClose: () => void;
  editBlockHandler: () => void;
  nodeData: any;
}

export const BlockDrawer: FC<IBlockDrawer> = ({
  isOpen,
  onClose,
  editBlockHandler,
  nodeData,
}) => {
  const {
    isOpen: isDeleteModalOpen,
    onClose: onDeleteModalClose,
    onOpen: onDeleteModalOpen,
  } = useDisclosure();
  const [{ data: walletData, loading: walletDataLoading }] = useAccount({
    fetchEns: true,
  });
  const [{ data: ENS }] = useEnsLookup({
    address: nodeData?.wallet?.address,
  });
  const dateObj = generateDateString(new Date(nodeData?.createdAt));
  const [deletingBlock, setDeletingBlock] = useState(false);
  const [deleteBlock, { error: deleteBlockError }] = useMutation(DELETE_NOTES, {
    refetchQueries: [
      {
        query: GET_NOTES,
        variables: { where: { address: nodeData?.wallet?.address } },
      },
      GET_TAGS_AND_ENTITIES,
      { query: GET_ALL_NOTES },
    ],
  });
  const toast = useToast();

  const deleteBlockHandler = async () => {
    try {
      setDeletingBlock(true);
      await deleteBlock({
        variables: {
          where: { uuid: nodeData.uuid },
        },
      });
      toast({
        title: "Block Deleted!",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
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
    setDeletingBlock(false);
  };
  if (!nodeData) {
    return null;
  }
  return (
    <Drawer isOpen={isOpen} placement="right" size="xs" onClose={onClose}>
      <DrawerOverlay bg="transparent" />
      <DrawerContent
        _focus={{ boxShadow: "-2px 0px 15px #C3C3C3 !important" }}
        boxShadow={"-2px 0px 15px #C3C3C3"}
        sx={{ top: "50px !important" }}
      >
        <DrawerCloseButton />
        <DrawerHeader display="flex" alignItems="center">
          <Box bg="diamond.magenta" borderRadius="100%" padding="5px">
            <BlockIcon variant={IconVariants.White} />
          </Box>
          <Box ml="8px" as="span" fontWeight="500">
            Block
          </Box>
        </DrawerHeader>

        <DrawerBody fontSize="12px">
          {walletData?.address === nodeData?.wallet?.address && (
            <>
              <Box>
                <Text color="diamond.blue.3" fontWeight={500}>
                  ACTIONS
                </Text>
                <Box display="flex" sx={{ columnGap: "4px" }}>
                  <Button
                    onClick={editBlockHandler}
                    leftIcon={<CreateSnapshotIcon />}
                    variant="primary"
                  >
                    Edit Block
                  </Button>
                  <Button
                    onClick={onDeleteModalOpen}
                    leftIcon={<CreateSnapshotIcon />}
                    variant="primary"
                  >
                    Delete Block
                  </Button>
                </Box>
              </Box>{" "}
              <Divider mt="16px" />
            </>
          )}
          <Box mt="16px" display="flex" justifyContent="space-between">
            <Text color="diamond.blue.3" fontWeight={500}>
              DATE CREATED
            </Text>
            <Text color="diamond.gray.4">
              {dateObj.month + "/" + dateObj.day + "/" + dateObj.year}
            </Text>
          </Box>
          <Box mt="3px" display="flex" justifyContent="space-between">
            <Text color="diamond.blue.3" fontWeight={500}>
              CREATED BY
            </Text>
            <Text color="diamond.gray.4">
              {ENS ||
                "0x" + truncateAddress(nodeData?.wallet?.address.slice(2), 4)}
            </Text>
          </Box>
          <Divider mt="16px" />
          <Box mt="16px">
            <Box color="diamond.blue.3" fontWeight={500}>
              BLOCK TEXT
            </Box>
            <Box>
              {nodeData?.text && <AddPillsToText text={nodeData?.text} />}
            </Box>
          </Box>
          {(nodeData.entities.length > 0 || nodeData.tags.length > 0) && (
            <>
              <Divider mt="16px" />
              <Box mt="16px" color="diamond.blue.3" fontWeight={500}>
                LINKED TO
              </Box>
              <Box
                display="flex"
                flexWrap="wrap"
                sx={{ columnGap: "4px", rowGap: "4px" }}
              >
                {nodeData.tags.map((tag: { tag: string }, idx) => (
                  <Pill key={idx} asButton icon={<TagIcon />}>
                    <Text color="diamond.blue.5" fontSize={bodyText}>
                      {tag.tag}
                    </Text>
                  </Pill>
                ))}
                {nodeData.entities.map((entity: { name: string }, idx) => (
                  <Pill key={idx} asButton icon={<EntitiesIcon />}>
                    <Text color="diamond.blue.5" fontSize={bodyText}>
                      {entity.name}
                    </Text>
                  </Pill>
                ))}
              </Box>
            </>
          )}
        </DrawerBody>
      </DrawerContent>
      <DeleteModal
        title={`Delete Block`}
        subtitle={`Are you sure you want to delete the block?`}
        onClose={onDeleteModalClose}
        isOpen={isDeleteModalOpen}
        deleting={deletingBlock}
        actionHandler={deleteBlockHandler}
      />
    </Drawer>
  );
};
