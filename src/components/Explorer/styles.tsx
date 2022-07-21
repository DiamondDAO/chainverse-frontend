export const DetailsTooltip = {
  "& path": { fill: "diamond.gray.4" },
  "&:hover": {
    bg: "diamond.gray.0",
    "& path": { fill: "diamond.link" },
  },
  display: "flex",
  justifyContent: "center",
  padding: "4px",
};

export const SelectWorkspaceText = {
  fontSize: "12px",
  fontWeight: "500",
  color: "diamond.blue.3",
  mb: "8px",
};

export const WorkspaceModalBodyBorder = {
  borderTop: "0.5px solid black",
  borderColor: "diamond.gray.1",
};

export const WorkspaceContainer = {
  mt: "4px",
  "& > *": { py: "4px" },
};

export const SandboxStyle = {
  display: "flex",
  justifyContent: "space-between",
  "&:hover": {
    bg: "diamond.gray.1",
  },
};

export const WorkspaceStyle = {
  display: "flex",
  justifyContent: "space-between",
  "& hover": {
    bg: "diamond.gray.1",
  },
};

export const TableContainer = {
  maxWidth: ["95vw", null, "unset"],
  display: "flex",
  alignItems: "center",
};

export const TableStyles = {
  marginTop: ["24px", "32px", "48px", "84px"],
  width: "99%",
};

export const TableHead = {
  textAlign: "inherit",
  px: "10px",
  borderBottom: "0.5px solid black",
  borderColor: "diamond.gray.4",
};

export const TableBody = {
  borderLeft: "thin solid #616161",
  borderRight: "0.5px solid #616161",
};

export const TableRow = (highlight: boolean) => ({
  bg: "white",
  ...(highlight && {
    bg: "rgba(149, 67, 141, 0.1)",
  }),
  "& hover": {
    bg: "diamond.gray.1",
  },
  cursor: "pointer",
});
export const TableCell = {
  px: "10px",
  borderBottom: "0.5px solid black",
  borderColor: "diamond.gray.4",
};
