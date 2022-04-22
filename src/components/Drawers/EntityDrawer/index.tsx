import { AddWorkspaceType, IconVariants } from "@/common/types";
import { convertIPFSURLs } from "@/common/utils";
import { EntitiesIcon } from "@/components/Icons/EntitiesIcon";
import { PlusIcon } from "@/components/Icons/PlusIcon";
import { GET_WORKSPACE_OWNED } from "@/services/Apollo/Queries";
import { useLazyQuery } from "@apollo/client";
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
import React, { FC, useEffect } from "react";
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
}

export const EntityDrawer: FC<IEntityDrawer> = ({
  isOpen,
  onClose,
  nodeData,
  hideActions,
  addEntityHandler,
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
          {!hideActions && (
            <>
              <Box>
                <Text color="diamond.blue.3" fontWeight={500}>
                  ACTIONS
                </Text>
                <Box display="flex" sx={{ columnGap: "4px" }}>
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
            </>
          )}

          {nodeData?.about && (
            <>
              {" "}
              <Box>
                <Text color="diamond.blue.3" fontWeight={500}>
                  ABOUT
                </Text>
                <Box display="flex" sx={{ columnGap: "4px" }}>
                  <Text mt="4px" color="diamond.gray.4">
                    {nodeData?.about}
                  </Text>
                </Box>
              </Box>
              <Divider mt="16px" />
            </>
          )}
          <Box mt="16px" display="flex" justifyContent="space-between">
            <Text color="diamond.blue.3" fontWeight={500}>
              ID
            </Text>
            <Text color="diamond.gray.4">{nodeData?.id}</Text>
          </Box>
          <Box mt="3px" display="flex" justifyContent="space-between">
            <Text color="diamond.blue.3" fontWeight={500}>
              NETWORK
            </Text>
            <Text color="diamond.gray.4">{nodeData?.network}</Text>
          </Box>
          <Box mt="3px" display="flex" justifyContent="space-between">
            <Text color="diamond.blue.3" fontWeight={500}>
              ONLY MEMBER?
            </Text>
            <Text color="diamond.gray.4">{nodeData?.onlyMembers}</Text>
          </Box>
          <Box mt="3px" display="flex" justifyContent="space-between">
            <Text color="diamond.blue.3" fontWeight={500}>
              SYMBOL
            </Text>
            <Text color="diamond.gray.4">{nodeData?.symbol}</Text>
          </Box>
          <Box mt="3px" display="flex" justifyContent="space-between"></Box>
          <Box mt="3px" display="flex" justifyContent="space-between">
            <Text color="diamond.blue.3" fontWeight={500}>
              YTD PROPOSALS
            </Text>
            <Text color="diamond.gray.4">
              {nodeData?.proposalsAggregate.count}
            </Text>
          </Box>
          <Box mt="3px" display="flex" justifyContent="space-between">
            <Text color="diamond.blue.3" fontWeight={500}>
              WEBSITE
            </Text>
            <Box display="flex" sx={{ columnGap: "4px" }}></Box>
          </Box>
          <Box mt="3px" display="flex" justifyContent="space-between">
            <Text color="diamond.blue.3" fontWeight={500}>
              SOCIALS
            </Text>
            <Box display="flex" sx={{ columnGap: "4px" }}>
              <Box _hover={{ "& *": { fill: "#369AF0" } }}>
                <SiTwitter fill="#747575" size="14px" />
              </Box>
              <Box _hover={{ "& *": { fill: "#5460EB" } }}>
                <SiDiscord fill="#747575" size="14px" />
              </Box>
            </Box>
          </Box>
          <Divider mt="16px" />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
