export const PartnershipBlockNodeContainer = (dim) => ({
  cursor: "pointer",
  p: "8px",
  fontSize: "10px",
  maxWidth: "200px",
  borderRadius: "8px",
  border: "1px solid #000000",
  bg: "rgba(0, 0, 0, 0.05)",
  ...(dim && { opacity: 0.2, bg: "rgba(0, 0, 0, 0.05)" }),
});

export const IconStyle = {
  p: "4px",
  width: "fit-content",
  height: "fit-content",
  bg: "black",
  borderRadius: "100%",
};

export const PillText = {
  workBreak: "break-all",
  breakInside: "avoid",
  verticalAlign: "middle",
};
