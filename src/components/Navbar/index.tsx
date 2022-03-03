import { Box, Text, Image, useTheme, HStack } from "@chakra-ui/react";
import Router from "next/router";
import React, { FC } from "react";
import { borderStyles } from "@/common/theme";
import { AccountMenu } from "./AccountMenu";
import { NavPages } from "./NavPages";

export interface INavbar {}

export const NavBar: FC<INavbar> = ({}) => {
  const { space } = useTheme();
  const navigationPages = [
    { text: "Home", link: "/home" },
    { text: "Workspace", link: "/workspace" },
    { text: "Explorer", link: "/" },
  ];
  return (
    <Box p="10px">
      <Box
        sx={{
          bg: "white",
          fontSize: "xs",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: "7px",
          color: "diamond.gray.5",
        }}
        {...borderStyles}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image
            cursor="pointer"
            onClick={() => Router.push("/")}
            alt="nav-logo"
            mr="7px"
            width="18px"
            height="15px"
            src="./img/nav_diamond.png"
          />
          <NavPages pages={navigationPages} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            borderLeft={"0.5px solid"}
            borderColor="diamond.gray.2"
            py="7px"
            px={space.medium}
            background={"diamond.white"}
            color={"diamond.gray.5"}
            onClick={() => {}}
            cursor="pointer"
          >
            <Text>Add block</Text>
          </Box>
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
