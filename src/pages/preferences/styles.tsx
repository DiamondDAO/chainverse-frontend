import { borderStyles } from "@/theme";

export const AccountInfoStyles = {
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  flexWrap: "wrap",
};
export const AccountInfoText = {
  mr: "5px",
  fontWeight: "bold",
};

export const GridStyles = {
  templateColumns: ["1fr", null, "1fr 2fr"],
  gap: 6,
};

export const AccountInfoBorder = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  p: "20px",
  ...borderStyles,
};
export const HeadingStyle = { mb: "10px", size: "md" };

export const listStyle = {
  pl: "10px",
};
