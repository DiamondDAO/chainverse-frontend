import { IconVariants } from "@/common/types";
import { truncateAddress } from "@/common/utils";
import { BlockIcon } from "@/components/Icons/BlockIcon";
import { CreateSnapshotIcon } from "@/components/Icons/CreateSnapshotIcon";
import { EntitiesIcon } from "@/components/Icons/EntitiesIcon";
import { TagIcon } from "@/components/Icons/TagIcon";
import { Pill } from "@/components/Pill";
import { AddPillsToText } from "@/components/UtilityComponents/AddPillsToText";
import { DELETE_NOTES } from "@/services/Apollo/Mutations";
import { GET_NOTES, GET_TAGS_AND_ENTITIES } from "@/services/Apollo/Queries";
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
} from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { useEnsLookup } from "wagmi";

interface IBlockDrawer {
  isOpen: boolean;
  onClose: () => void;
  editBlockHandler: () => void;
  deleteBlockhandler: () => void;
  blockData: any;
}

const generateDateString = (date: Date) => {
  const month = date?.getUTCMonth() + 1; //months from 1-12
  const day = date?.getUTCDate();
  const year = date?.getUTCFullYear();

  return { month, day, year };
};
export const BlockDrawer: FC<IBlockDrawer> = ({
  isOpen,
  onClose,
  editBlockHandler,
  blockData,
}) => {
  const [{ data: ENS }] = useEnsLookup({
    address: blockData?.wallet.address,
  });
  const dateObj = generateDateString(new Date(blockData?.createdAt));
  const [deletingBlock, setDeletingBlock] = useState(false);
  const [deleteBlock, { error: deleteBlockError }] = useMutation(DELETE_NOTES, {
    refetchQueries: [GET_NOTES, GET_TAGS_AND_ENTITIES],
  });

  const toast = useToast();
  const deleteBlockHandler = async () => {
    try {
      setDeletingBlock(true);
      await deleteBlock({
        variables: {
          where: { uuid: blockData.uuid },
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
  if (!blockData) {
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
                isDisabled={deletingBlock}
                isLoading={deletingBlock}
                onClick={deleteBlockHandler}
                leftIcon={<CreateSnapshotIcon />}
                variant="primary"
              >
                Delete Block
              </Button>
            </Box>
          </Box>
          <Divider mt="16px" />
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
                "0x" + truncateAddress(blockData?.wallet.address.slice(2), 4)}
            </Text>
          </Box>
          <Divider mt="16px" />
          <Box mt="16px">
            <Box color="diamond.blue.3" fontWeight={500}>
              BLOCK TEXT
            </Box>
            <Box>
              {blockData?.text && <AddPillsToText text={blockData?.text} />}
            </Box>
          </Box>
          {(blockData.entities.length > 0 || blockData.tags.length > 0) && (
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
                {blockData.tags.map((tag: { tag: string }) => (
                  <Pill key={tag.tag} asButton icon={<TagIcon />}>
                    <Text color="diamond.blue.5" fontSize="14px">
                      {tag.tag}
                    </Text>
                  </Pill>
                ))}
                {blockData.entities.map((entity: { name: string }) => (
                  <Pill key={entity.name} asButton icon={<EntitiesIcon />}>
                    <Text color="diamond.blue.5" fontSize="14px">
                      {entity.name}
                    </Text>
                  </Pill>
                ))}
              </Box>
            </>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
