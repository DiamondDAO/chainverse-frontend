import { AddWorkspaceType, IconVariants } from "@/common/types";
import { convertIPFSURLs } from "@/common/utils";
import { EntitiesIcon } from "@/components/Icons/EntitiesIcon";
import { PlusIcon } from "@/components/Icons/PlusIcon";
import { GET_WORKSPACE_OWNED } from "@/services/Apollo/Queries";
import { useLazyQuery } from "@apollo/client";
import { bodyText } from "@/theme";
import { CreateSnapshotIcon } from "@/components/Icons/CreateSnapshotIcon";

import {
  Box,
  Button,
  Divider,
  Drawer,
  Text,
  Image,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { FC, useEffect, useMemo, useState } from "react";
import { SiTwitter, SiDiscord } from "react-icons/si";
import { useAccount } from "wagmi";
import * as styles from "../styles";
interface IEntityDrawer {
  addEntityHandler?: (
    row: any,
    type: AddWorkspaceType,
    workspaceUuid?: string
  ) => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
  nodeData: any;
  hideActions?: boolean;
  actions?: {
    editBlock?: () => void;
    deleteBlock?: (block: any) => Promise<void>;
  };
}

export const EntityDrawer: FC<IEntityDrawer> = ({
  isOpen,
  onClose,
  nodeData,
  hideActions,
  addEntityHandler,
  actions,
}) => {
  const [{ data: walletData }] = useAccount();
  const [getWorkspaceOwned, { data: workspaceData, loading }] =
    useLazyQuery(GET_WORKSPACE_OWNED);
  useEffect(() => {
    if (walletData?.address) {
      getWorkspaceOwned({
        variables: { where: { wallet: { address: walletData?.address } } },
      });
    }
  }, [getWorkspaceOwned, walletData?.address]);

  const [deletingBlock, setDeletingBlock] = useState(false);


  const entityData = useMemo(
    () => [
      { title: "ID", data: nodeData?.id },
      { title: "NETWORK", data: nodeData?.network },
      {
        title: "SOCIALS",
        data: (
          <Box display="flex" sx={{ columnGap: "4px" }}>
            <Box _hover={{ "& *": { fill: "#369AF0" } }}>
              <SiTwitter fill="#747575" size="14px" />
            </Box>
            <Box _hover={{ "& *": { fill: "#5460EB" } }}>
              <SiDiscord fill="#747575" size="14px" />
            </Box>
          </Box>
        ),
      },
    ],
    [nodeData]
  );
  const workspaces = workspaceData?.workspaces;
  if (!nodeData) return null;
  return (
    <Drawer isOpen={isOpen} placement="right" size="xs" onClose={onClose}>
      <DrawerOverlay bg="transparent" />
      <DrawerContent sx={styles.DrawerContentStyles}>
        <DrawerCloseButton />
        <DrawerHeader sx={styles.DrawerHeader}>
          {nodeData?.avatar ? (
            <Box sx={styles.EntityContainer}>
              <Image
                fontSize={"0px"}
                borderRadius="100%"
                alt="entitiy-logo"
                src={convertIPFSURLs(nodeData?.avatar)}
              />
            </Box>
          ) : (
            <Box sx={styles.EntityIconBg}>
              <EntitiesIcon variant={IconVariants.White} />
            </Box>
          )}
          <Box as="span" sx={styles.EntityName}>
            {nodeData?.name}
          </Box>
        </DrawerHeader>

        <DrawerBody fontSize="12px">
          <Box>
            <Text color="diamond.blue.3" fontWeight={500}>
              ACTIONS
            </Text>
            <Box sx={styles.RowContainer}>
              <Menu>
                <MenuButton
                  as={Button}
                  leftIcon={
                    <PlusIcon width="11px" height="11px" fill="white" />
                  }
                  fontSize="12px"
                  variant="primary"
                >
                  Add to workspace
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      addEntityHandler &&
                        addEntityHandler(
                          nodeData,
                          AddWorkspaceType.Sandbox
                        );
                      onClose();
                    }}
                  >
                    Sandbox
                  </MenuItem>
                  {workspaces?.map((workspace) => (
                    <MenuItem
                      onClick={() => {
                        addEntityHandler &&
                          addEntityHandler(
                            nodeData,
                            AddWorkspaceType.Workspace,
                            workspace.uuid
                          );
                        onClose();
                      }}
                      key={workspace.uuid}
                    >
                      {workspace.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              {actions?.editBlock && (
                <Button
                  onClick={actions?.editBlock}
                  leftIcon={<CreateSnapshotIcon />}
                  variant="primary"
                >
                  Edit Block
                </Button>
              )}
              {actions?.deleteBlock && (
                <Button
                  disabled={deletingBlock}
                  isLoading={deletingBlock}
                  onClick={async () => {
                    setDeletingBlock(true);
                    await actions?.deleteBlock(nodeData);
                    setDeletingBlock(false);
                  }}
                  leftIcon={<CreateSnapshotIcon />}
                  variant="primary"
                >
                  Delete Block
                </Button>
              )}
              {/* <Button
                onClick={() => {}}
                leftIcon={<RiNodeTree size="12px" />}
                variant="primary"
              >
                View graph
              </Button> */}
            </Box>
          </Box>
          <Divider mt="16px" />
          <Box mt="16px">
            {entityData.map((dataItem, idx) => {
              return (
                <Box key={idx} sx={styles.DataContainer}>
                  <Text color="diamond.blue.3" fontWeight={500}>
                    {dataItem.title}
                  </Text>
                  {typeof dataItem.data === "string" ? (
                    <Text color="diamond.gray.4">{dataItem.data}</Text>
                  ) : (
                    dataItem.data
                  )}
                </Box>
              );
            })}
          </Box>
          <Divider mt="16px" />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
