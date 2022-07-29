import { bodyText } from "@/theme";

export const ExplorerTitleContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export const ExplorerTitle = {
  fontWeight: "600",
  fontSize: "2rem",
  zIndex: 1,
};

export const ExplorerBody = {
  mt: "40px",
  display: "grid",
  gridTemplateColumns: ["1fr", null, null, "210px 1fr"],
};

export const ExplorerNavigatorContainer = {
  display: ["none", null, null, "flex"],
  sx: { columnGap: "50px" },
};
export const ExplorerNavigatorInner = {
  w: "100%",
  maxWidth: "210px",
  zIndex: 3,
};
export const SearchStyle = {
  maxWidth: "70%",
  display: "flex",
  justifyContent: "center",
};

export const SearchContainer = {
  position: "relative",
  maxWidth: "716px",
  width: "100%",
};

export const SearchInputGroup = {
  bg: "white",
  alignItems: "center",
  border: "none",
  borderRadius: "5px",
  height: "66px",
  boxShadow: "0px 2px 15px #C3C3C3",
};
export const SearchLeftElement = {
  pl: "25px",
  height: "100%",
  pointerEvents: "none",
};

export const SearchBoxStyle = {
  pl: "45px",
  bg: "white",
  width: "100%",
  height: "100%",
  border: "1px solid black",
};

export const AdvanceSearchLink = {
  cursor: "pointer",
  "&:hover": { color: "diamond.blue.5" },
  color: "diamond.link",
  mt: "8px",
  fontSize: "14px",
  position: "absolute",
  right: "0",
};

export const SearchResult = {
  p: "0px",
  fontSize: bodyText,
  mt: "10px",
  bg: "white",
  boxShadow: "0px 2px 15px #C3C3C3",
  width: "100%",
  minHeight: "70px",
  position: "absolute",
  borderRadius: "5px",
  border: "1px solid black",
};
export const SearchResultText = {
  p: "25px",
  borderRadius: "5px",
  cursor: "pointer",
  "&:hover": {
    bg: "diamond.blue.1",
  },
};

export const AdvancedSearchBody = {
  bg: "white",
  p: "20px",
  display: "flex",
  flexWrap: ["wrap", null, "unset"],
  alignItems: "center",
  border: "none",
  borderRadius: "5px",
  color: "diamond.gray.4",
  whiteSpace: "nowrap",
  boxShadow: "0px 2px 15px #C3C3C3",
  fontSize: "20px",
  fontWeight: "500",
};

export const AdvanceSearchText = {
  mr: "8px",
};

export const AdvancedSearchSelect = {
  fontSize: "14px",
  h: "42px",
  bg: "diamond.gray.0",
  border: "1px solid black",
  borderColor: "diamond.gray.1",
};
export const AdvanceSearchToThisWrapper = {
  ml: [null, null, "8px"],
  width: "100%",
  h: "42px",
};
export const AdvanceSearchToThis = {
  minW: "200px",
  width: "100%",
  mt: ["10px", null, "unset"],
};
export const AdvancedSearchThat = {
  ml: "8px",
  mr: "8px",
};
