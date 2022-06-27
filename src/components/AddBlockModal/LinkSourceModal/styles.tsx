import { bodyText, subText } from "@/theme";

export const Container = (textAreaValue) => ({
  display: textAreaValue ? "flex" : "none",
  alignItems: "center",
});

export const TriggerStyle = {
  display: "flex",
  alignItems: "center",
};

export const SourceStyle = (source) => ({
  cursor: "pointer",
  pl: "3px",
  border: "none",
  width: "100%",
  color: source ? "diamond.blue.5" : "diamond.gray.2",
  height: "max-content",
  "&:focus": {
    border: "none",
  },
  fontSize: bodyText,
});

export const PopoverContent = {
  border: "1px solid #C3C3C3",
  borderRadius: "5px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
  width: "273px",
  height: "84px",
  p: "12px",
};

export const URLText = (error) => ({
  color: error ? "red" : "black",
  fontSize: subText,
  lineHeight: "12px",
  fontWeight: 500,
});

export const URLInput = (error) => ({
  mt: "2px",
  borderRadius: "2px",
  fontSize: subText,
  height: "30px",
  px: "10px",
  borderColor: error ? "red" : "black",
});

export const URLButton = {
  mt: "3px",
  alignSelf: "end",
  fontSize: subText,
  lineHeight: "125%",
  color: "diamond.link",
  variant: "link",
  fontWeight: "400",
};
