export const NavigatorContainer = {
  border: "0.5px solid black",
  borderColor: "diamond.gray.2",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  fontSize: "0.875rem",
  bg: "white",
  borderRadius: "5px",
  "&> *": { padding: "10px" },
};

export const SandboxStyle = (selected) => ({
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
  ...(selected && {
    bg: "diamond.blue.0",
    fontWeight: "500",
  }),
});

export const WorkspaceContainer = {
  color: "diamond.gray.3",
  listStyleType: "none",
  marginLeft: "2px",
  "li:before": { content: '"> "', paddingRight: "5px" },
};

export const SelectedStyle = (selected) => ({
  ...(selected && {
    bg: "diamond.blue.0",
    fontWeight: "500",
  }),
});
