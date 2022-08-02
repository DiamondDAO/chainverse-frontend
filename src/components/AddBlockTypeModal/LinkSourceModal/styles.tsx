import { bodyText, subText } from "@/theme";

export const Container = {
  display: "flex",
  alignItems: "center",
};

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
  display: "inline-block",
  border: "1px solid #C3C3C3",
  borderRadius: "5px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
  width: "273px",
  height: "auto",
  p: "12px",
};

export const URLText = (error) => ({
  color: error ? "red" : "black",
  fontSize: bodyText,
  lineHeight: "12px",
  fontWeight: 500,
});

export const URLInput = (error) => ({
  mt: "2px",
  borderRadius: "2px",
  fontSize: bodyText,
  height: "30px",
  px: "10px",
  borderColor: error ? "red" : "black",
});

export const URLButton = {
  mt: "5px",
  alignItems: "center",
  float: "right",
  fontSize: bodyText,
  lineHeight: "125%",
  color: "diamond.link",
  variant: "link",
  fontWeight: "400",
};

export const URLCancelButton = {
  mt: "5px",
  alignItems: "center",
  fontSize: bodyText,
  lineHeight: "125%",
  color: "red",
  fontWeigth: "400"
}

export const URLDeleteButton = {
  color: "red",
  width: "10px !important",
  height: "10px !important",
  fontWeight: "400",
  fontSize: "12px",
  padding: "0px !important",
  ml: "5px",
  minWidth: "10px",
  minHeight: "10px"
}
