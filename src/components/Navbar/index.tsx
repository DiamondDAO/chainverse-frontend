import { Box, Text, Image, useTheme, HStack } from "@chakra-ui/react";
import Router from "next/router";
import React, { FC } from "react";
import { borderStyles } from "@/theme";
import { AccountMenu } from "./AccountMenu";
import { NavPages } from "./NavPages";

export interface INavbar {}

export const NavBar: FC<INavbar> = ({}) => {
  const { space } = useTheme();
  const navigationPages = [
    { text: "Workspace", link: "/workspace" },
    { text: "Explorer", link: "/" },
  ];
  return (
    <Box position="relative" p="10px" width="100%" zIndex={3}>
      <Box
        sx={{
          bg: "white",
          fontSize: "xs",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: "7px",
          color: "diamond.gray.5",
          ...borderStyles,
        }}
        zIndex={1000}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image
            cursor="pointer"
            onClick={() => Router.push("/")}
            alt="nav-logo"
            mr="7px"
            width="18px"
            height="15px"
            src="/img/nav_diamond.png"
          />
          <NavPages pages={navigationPages} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            borderLeft={"0.5px solid"}
            borderColor="diamond.gray.2"
            sx={{
              py: "7px",
              height: "100%",
              pr: "10px",
              pl: space.medium,
            }}
          >
            <AccountMenu />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
