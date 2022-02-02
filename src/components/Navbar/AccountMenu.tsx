import {
  Text,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Box,
} from "@chakra-ui/react";
import Router from "next/router";
import React, { useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { useAccount, useConnect } from "wagmi";
import { truncateAddress } from "@/common/utils";
interface Props {}

export const AccountMenu = (props: Props) => {
  const [
    {
      data: { connected, connectors },
    },
    connect,
  ] = useConnect();
  const [{ data }, disconnect] = useAccount();

  useEffect(() => {
    if (connected) {
      if (localStorage.getItem(`diamond-storage-${data?.address}`) === null) {
        Router.push("/onboard");
      }
    }
  }, [connected, data]);

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
                          src="./img/metamask.svg"
                        />
                      );
                    case "WalletConnect":
                      return (
                        <Image
                          width="25px"
                          alt="metamask-image"
                          mr="10px"
                          src="./img/walletconnect.svg"
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
            Account
          </MenuButton>
          <MenuList>
            <MenuGroup ml="12.8" title="Profile">
              <Box px="12.8" py="6.4">
                Logged in as: 0x
                {data?.address && truncateAddress(data?.address.slice(2), 5)}
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
