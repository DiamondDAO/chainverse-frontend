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
import React, { FC } from "react";
import { FiLogOut } from "react-icons/fi";
import { useAccount, useConnect } from "wagmi";
import { useGetAccountName } from "@/common/hooks/use-get-account-name";
import AccountIcon from "../Icons/AccountIcon";
import * as styles from "./styles";

const WalletImage = ({ name }) => {
  return (
    <>
      {name === "MetaMask" && (
        <Image
          width="25px"
          alt="wallet-connect-image"
          mr="10px"
          src="/img/metamask.svg"
        />
      )}
      {name === "WalletConnect" && (
        <Image
          width="25px"
          alt="metamask-image"
          mr="10px"
          src="/img/walletconnect.svg"
        />
      )}
    </>
  );
};

export const AccountMenu: FC = () => {
  const [
    {
      data: { connected, connectors },
    },
    connect,
  ] = useConnect();
  const [_, disconnect] = useAccount();
  const { accountName } = useGetAccountName({
    loadingComponent: <Spinner size="xs" color="diamond.gray.2" />,
  });
  return (
    <>
      {!connected && (
        <Menu gutter={15} offset={[15, 12]}>
          <MenuButton sx={styles.MenuButton} as={Box}>
            Connect Wallet
          </MenuButton>
          <MenuList>
            {connectors.map((x) => {
              return (
                <MenuItem
                  disabled={!x.ready}
                  key={x.name}
                  onClick={() => connect(x)}
                >
                  <WalletImage name={x.name} />
                  {x.name}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      )}
      {connected && (
        <Menu gutter={15} offset={[15, 12]}>
          <MenuButton sx={styles.MenuButton} as={Box}>
            <Box sx={styles.MenuContents}>
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
              <Box sx={styles.MenuContents}>
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
