import { Box, Text, Image, useTheme, HStack } from "@chakra-ui/react";
import React, { FC } from "react";
import { borderStyles } from "../../common/theme";
import { DateFilter } from "./DateFilter";
import { NavPages } from "./NavPages";

export interface INavbar {}

export const NavBar: FC<INavbar> = ({}) => {
  const { space } = useTheme();
  return (
    <Box
      sx={{
        fontSize: "xs",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: "7px",
        m: "10px",
        color: "diamond.gray.5",
      }}
      {...borderStyles}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Image
          alt="nav-logo"
          mr="7px"
          width="18px"
          height="15px"
          src="./img/nav_diamond.png"
        />
        <NavPages
          pages={[
            { text: "Overview", link: "/overview" },
            { text: "Participation", link: "/participation" },
            { text: "Governance", link: "/governance" },
          ]}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          borderLeft={"0.5px solid"}
          borderColor="diamond.gray.2"
          sx={{ py: "7px", px: space.medium }}
        >
          <Text>+Add Filter</Text>
        </Box>
        <DateFilter />
        <Box
          borderLeft={"0.5px solid"}
          borderColor="diamond.gray.2"
          sx={{
            py: "7px",
            height: "100%",
            pr: "11px",
            pl: space.medium,
          }}
        >
          <Text>Account</Text>
        </Box>
      </Box>
    </Box>
  );
};
