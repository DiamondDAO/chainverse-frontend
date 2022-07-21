import { borderStyles } from "@/theme";

export const OnboardContainer = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
};

export const OnboardContainerInner = {
  width: "100%",
  position: "absolute",
  maxWidth: "container.md",
  mt: "40px",
  height: "100%",
};

export const FormContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  pt: "100px",
};

export const FormBody = {
  p: "40px",
  height: "100%",
  width: "100%",
  mb: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  ...borderStyles,
};

export const ButtonContainer = {
  mt: "25px",
  display: "flex",
  justifyContent: "flex-end",
};

export const FormItems = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "space-between",
};
