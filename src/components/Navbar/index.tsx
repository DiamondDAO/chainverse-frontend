import { Box, Image, useTheme } from "@chakra-ui/react";
import Router from "next/router";
import React, { FC } from "react";
import { borderStyles } from "@/theme";
import { AccountMenu } from "./AccountMenu";
import { NavPages } from "./NavPages";
import * as styles from "./styles";
export const NavBar: FC = () => {
  const { space } = useTheme();
  const navigationPages = [
    { text: "Workspace", link: "/workspace" },
    { text: "Explorer", link: "/explorer" },
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
          <Box sx={styles.AccountMenuWrapper}>{/* <AccountMenu /> */}</Box>
        </Box>
      </Box>
    </Box>
  );
};
