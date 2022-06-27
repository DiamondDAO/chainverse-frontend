export const TipBox = (isLargerThan736, clickedTip) => ({
  display: isLargerThan736 ? "block" : "none",
  position: "fixed",
  zIndex: 1400,
  left: "50%",
  bottom: "-250px",
  width: ["90vw", null, "600px"],
  height: "300px",
  bg: "diamond.white",
  border: "1px solid #9B9B9B",
  borderRadius: "5px",
  p: "24px",
  overflowY: clickedTip ? "scroll" : "hidden",
  overflowX: "none",
});

export const TipHeader = {
  fontSize: "18px",
  fontWeight: "500",
  cursor: "pointer",
};
export const TipList = { mt: "20px", "& *": { verticalAlign: "middle" } };
