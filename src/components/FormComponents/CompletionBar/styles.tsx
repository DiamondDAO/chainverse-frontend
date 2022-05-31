export const DiamondSVGStyle = {
  width: ["20px", null, null, "30px"],
  height: ["20px", null, null, "30px"],
};

export const CompletionBarContainer = {
  display: "flex",
  alignItems: "center",
};

export const CompletionBarLine = {
  mx: "8px",
  flex: "1 1 auto",
  borderTopWidth: "1.5px",
  borderTopStyle: "solid",
  borderColor: "diamond.gray.2",
};

export const CompletionBarText = (idx, currentStep) => ({
  color: idx <= currentStep ? "diamond.blue.3" : "diamond.gray.3",
  fontSize: ["xs", null, null, "sm"],
  fontWeight: idx <= currentStep ? "bold" : "normal",
  ml: "5px",
});
