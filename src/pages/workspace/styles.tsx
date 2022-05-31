import { subText } from "@/theme";

export const GraphContainer = {
  top: "0",
  left: "0",
  bottom: "0",
  right: "0",
  position: "absolute",
  zIndex: 0,
};

export const Container = {
  display: "flex",
  width: "100%",
  flexDirection: "column",
};
export const HeaderContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export const HeaderText = {
  fontWeight: "600",
  fontSize: "2rem",
  zIndex: 1,
};

export const HeaderSubText = {
  color: "diamond.gray.3",
  zIndex: 1,
};

export const WorkspaceBody = {
  mt: "40px",
  display: "flex",
  columnGap: "50px",
};
export const WorkspaceSidebar = {
  maxWidth: "210px",
  width: "100%",
  zIndex: 3,
};

export const ButtonStyle = {
  p: "8px 12px",
  mt: "4px",
};

export const AddBlockCardStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
  height: "94px",
  border: "1px solid black",
  borderColor: "diamond.gray.3",
  alignItems: "center",
  borderRadius: "2px",
  bg: "diamond.gray.1",
};

export const AddBlockStylesText = {
  fontSize: "12px",
  fontWeight: "500",
  color: "diamond.gray.3",
};

export const ToastHeader = (success: string) => ({
  maxWidth: "300px",
  mt: "50px",
  borderRadius: "5px",
  color: "white",
  p: "8px",
  fontSize: "12px",
  bg: success === "success" ? "diamond.green" : "diamond.red",
});
export const ToastButton = {
  mt: "12px",
  borderRadius: "2px",
  p: "2px",
  ml: "-2px",
  width: "fit-content",
  "&:hover": { bg: "diamond.gray.1" },
  color: "black",
  cursor: "pointer",
};

export const BlockPageBody = {
  mt: "18px",
  maxWidth: ["260px", null, null, "900px", "1440px"],
  columnCount: [1, null, 2, 3, 4],
  gap: "30px",
  columnWidth: "260px",
  "& > *": {
    display: "block",
    wordBreak: "break-word",
    mb: "16px",
    breakInside: "avoid",
  },
};
export const BlockAddCardWrapper = {
  display: "inline-flex",
  width: "100%",
};
export const BlockItem = {
  cursor: "pointer",
  p: "8px",
  fontSize: "12px",
  borderRadius: "2px",
  minHeight: "76px",
  border: "1px solid #000000",
  bg: "diamond.white",
  display: "inline-block",
  width: "100%",
};
