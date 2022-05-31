export const ModalBodyStyle = {
  position: "relative",
  width: ["90vw", null, "600px"],
  height: "300px",
  bg: "diamond.white",
  border: "1px solid black",
  borderRadius: "5px",
  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
  p: "24px",
};

export const EntityTagDialog = (positionRef, visible) => ({
  position: "fixed",
  top: positionRef?.y + 10,
  left: positionRef?.x,
  display: visible ? "block" : "none",
});

export const PopoverTrigger = (visible) => ({
  display: visible ? "flex" : "none",
  position: "fixed",
});

export const PopoverContent = {
  border: "1px solid #C3C3C3",
  borderRadius: "5px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
  p: "12px",
};

export const PopoverHeader = {
  display: "flex",
  alignItems: "center",
  fontWeight: "500",
  fontSize: "16px",
  color: "diamond.blue.5",
};

export const TextboxStyles = {
  p: "0",
  pb: "4px",
  resize: "none",
  border: "none",
  width: "100%",
  height: "100%",
  maxH: "250px",
  overflow: "scroll",
  fontSize: ".875rem",
  "&:focus": { border: "none", outline: "none" },
  "&:empty:before": {
    color: "diamond.gray.3",
    content: "attr(data-placeholder)",
  },
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
};

export const ModalFooter = (clickedTip) => ({
  px: "0",
  display: clickedTip ? "none" : "flex",
  justifyContent: "space-between",
});
