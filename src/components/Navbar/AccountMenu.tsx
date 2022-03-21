import {
  Text,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Box,
  Spinner,
} from "@chakra-ui/react";
import Router from "next/router";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useAccount, useConnect } from "wagmi";
import { useGetAccountName } from "@/common/hooks/use-get-account-name";
import AccountIcon from "../Icons/AccountIcon";
interface Props {}

export const AccountMenu = (props: Props) => {
  const [
    {
      data: { connected, connectors },
    },
    connect,
  ] = useConnect();
  const [_, disconnect] = useAccount();
  const { accountName, loading: accountNameLoading } = useGetAccountName({
    loadingComponent: <Spinner size="xs" color="diamond.gray.2" />,
  });
  return (
    <>
      {!connected && (
        <Menu gutter={15} offset={[15, 12]}>
          <MenuButton cursor="pointer" width="100%" as={Box}>
            Connect Wallet
          </MenuButton>
          <MenuList>
            {connectors.map((x) => {
              if (!x.ready) {
                return;
              } else {
                const WalletImage = () => {
                  switch (x.name) {
                    case "MetaMask":
                      return (
                        <Image
                          width="25px"
                          alt="wallet-connect-image"
                          mr="10px"
                          src="/img/metamask.svg"
                        />
                      );
                    case "WalletConnect":
                      return (
                        <Image
                          width="25px"
                          alt="metamask-image"
                          mr="10px"
                          src="/img/walletconnect.svg"
                        />
                      );
                    default:
                      return <></>;
                  }
                };
                return (
                  <MenuItem
                    disabled={!x.ready}
                    key={x.name}
                    onClick={() => connect(x)}
                  >
                    <WalletImage />
                    {x.name}
                  </MenuItem>
                );
              }
            })}
          </MenuList>
        </Menu>
      )}
      {connected && (
        <Menu gutter={15} offset={[15, 12]}>
          <MenuButton cursor="pointer" width="100%" as={Box}>
            <Box display="flex" alignItems="center">
              <AccountIcon />
              <Text ml="4px">{accountName}</Text>
            </Box>
          </MenuButton>
          <MenuList>
            <MenuGroup ml="12.8" title="Profile">
              <Box px="12.8" py="6.4">
                Logged in as: {accountName}
              </Box>

              <MenuItem onClick={() => Router.push("/preferences")}>
                Preferences
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuItem onClick={disconnect}>
              <Box display="flex" alignItems="center">
                <FiLogOut />
                <Text ml="5px">Logout</Text>
              </Box>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </>
  );
};
