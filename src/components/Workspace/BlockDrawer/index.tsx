import { truncateAddress } from "@/common/utils";
import { BlockIcon } from "@/components/Icons/BlockIcon";
import { CreateSnapshotIcon } from "@/components/Icons/CreateSnapshotIcon";
import { EntitiesIcon } from "@/components/Icons/EntitiesIcon";
import { TagIcon } from "@/components/Icons/TagIcon";
import { Pill } from "@/components/Pill";
import { AddPillsToText } from "@/components/UtilityComponents/AddPillsToText";
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
} from "@chakra-ui/react";
import React, { FC } from "react";
import { useEnsLookup } from "wagmi";

interface IBlockDrawer {
  isOpen: boolean;
  onClose: () => void;
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
  blockData,
}) => {
  const [{ data: ENS }] = useEnsLookup({
    address: blockData?.wallet.address,
  });
  const dateObj = generateDateString(new Date(blockData?.dateAdded));

  if (!blockData) {
    return null;
  }
  return (
    <Drawer isOpen={isOpen} placement="right" size="xs" onClose={onClose}>
      <DrawerOverlay bg="transparent" />
      <DrawerContent
        boxShadow={"-2px 0px 15px #C3C3C3"}
        sx={{ top: "50px !important" }}
      >
        <DrawerCloseButton />
        <DrawerHeader display="flex" alignItems="center">
          <BlockIcon />
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
              <Button leftIcon={<CreateSnapshotIcon />} variant="primary">
                Edit Block
              </Button>
              <Button leftIcon={<CreateSnapshotIcon />} variant="primary">
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
              <Box display="flex" flexWrap="wrap" sx={{ columnGap: "4px" }}>
                {blockData.tags.map((tag: { text: string }) => (
                  <Pill key={tag.text} asButton icon={<TagIcon />}>
                    <Text color="diamond.blue.5" fontSize="14px">
                      {tag.text}
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
