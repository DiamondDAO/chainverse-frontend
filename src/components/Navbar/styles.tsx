import { borderStyles } from "@/theme";
import { space } from "@chakra-ui/react";

export const MenuButton = {
  cursor: "pointer",
  width: "100%",
};

export const MenuContents = {
  display: "flex",
  alignItems: "center",
};

export const NavbarContainer = {
  position: "relative",
  p: "10px",
  width: "100",
  zIndex: 3,
};

export const NavBarBody = {
  bg: "white",
  fontSize: "xs",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  px: "7px",
  color: "diamond.gray.5",
  zIndex: 4,
  ...borderStyles,
};

export const NavItemsContainer = {
  display: "flex",
  alignItems: "center",
};

export const NavLogo = {
  cursor: "pointer",
  mr: "7px",
  width: "18px",
  height: "15px",
};

export const NavAccountMenu = {
  display: "flex",
  alignItems: "center",
};

export const AccountMenuWrapper = {
  borderLeft: "0.5px solid",
  borderColor: "diamond.gray.2",
  py: "7px",
  height: "100%",
  pr: "10px",
  pl: "7px",
};

export const NavLink = (isActive) => ({
  py: "7px",
  px: "7px",
  background: isActive ? "diamond.blue.0" : "diamond.white",
  color: isActive ? "diamond.black" : "diamond.gray.5",
  cursor: "pointer",
});
