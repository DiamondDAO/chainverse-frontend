import { subText } from "@/theme";

export const NavigatorContainer = {
  border: "0.5px solid black",
  borderColor: "diamond.gray.2",
  display: "flex",
  flexDir: "column",
  fontSize: subText,
  bg: "white",
  borderRadius: "5px",
  "&> *": { padding: "10px" },
};

export const SearchText = {
  fontWeight: "500",
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
  bg: "diamond.blue.0",
};
