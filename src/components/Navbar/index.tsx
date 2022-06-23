import { Box, Image, useTheme } from "@chakra-ui/react";
import {Button, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { Layout } from "@/components/Layout";
import { filterUniqueObjects } from "@/common/utils";
import { bodyText, subText } from "@/theme";
import { BlockDrawer } from "@/components/Drawers/BlockDrawer";
import { Block } from "@/common/types";
import { useAccount } from "wagmi";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

import Router from "next/router";
import React, { FC } from "react";
import { borderStyles } from "@/theme";
import { AccountMenu } from "./AccountMenu";
import { AddBlockMenu } from "./AddBlockMenu";
import { NavPages } from "./NavPages";
import * as styles from "./styles";
import { CreateSnapshotIcon } from "@/components/Icons/CreateSnapshotIcon";

export const NavBar: FC = () => {
  const { space } = useTheme();
  const navigationPages = [
    {/*{ text: "Home", link: "/home" },*/},
    { text: "Explorer", link: "/explorer" },
    { text: "Workspace", link: "/workspace" }
  ];
  return (
    <Box sx={styles.NavbarContainer}>
      <Box sx={styles.NavBarBody}>
        <Box sx={styles.NavItemsContainer}>
          <Image
            sx={styles.NavLogo}
            onClick={() => Router.push("/")}
            alt="nav-logo"
            src="/img/nav_diamond.png"
          />
          <NavPages pages={navigationPages} />
        </Box>
        <Box sx={styles.NavAccountMenu}>
          {/*}<Box sx={styles.AccountMenuWrapper}>
            <AddBlockMenu />
          </Box>*/}
          <Box sx={styles.AccountMenuWrapper}>
            <AccountMenu />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
