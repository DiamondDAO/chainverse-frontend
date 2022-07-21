import { bodyText } from "@/theme";

export const MenuButton = (IsItemExists) => ({
  bg: "diamond.gray.0",
  border: "0.5px solid black",
  borderColor: "diamond.gray.1",
  color: "diamond.gray.4",
  borderRadius: "3px",
  padding: "8px",
  fontSize: bodyText,
  ...(IsItemExists && {
    borderColor: "diamond.link",
    bg: "diamond.blue.0",
    color: "diamond.link",
  }),
});

export const SelectItemsStyle = {
  display: "flex",
  flexWrap: "wrap",
  maxWidth: "fit-content",
  rowGap: "4px",
  columnGap: "4px",
};
