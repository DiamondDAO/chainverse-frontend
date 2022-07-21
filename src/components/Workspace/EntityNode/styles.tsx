export const EntityNodeContainer = (dim) => ({
  cursor: "pointer",
  p: "8px",
  fontSize: "10px",
  maxWidth: "200px",
  borderRadius: "8px",
  border: "1px solid #000000",
  borderColor: "diamond.magenta",
  bg: "rgba(149, 67, 141, 0.1)",
  display: "flex",
  ...(dim && { opacity: 0.2, bg: "rgba(0, 0, 0, 0.05)" }),
});

export const ImageContainer = {
  width: "22px",
  height: "22px",
};

export const AvatarIcon = {
  p: "4px",
  bg: "diamond.magenta",
  borderRadius: "100%",
};

export const EntityTitle = {
  fontWeight: "500",
  color: "diamond.black",
};
