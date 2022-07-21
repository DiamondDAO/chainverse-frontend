export const Button = {
  defaultProps: {},
  // 1. We can update the base styles
  baseStyle: {
    px: "12px",
    py: "4px",
    maxH: "32px",
    fontSize: "0.875rem",
    fontWeight: "400",
  },
  // 3. We can add a new visual variant
  variants: {
    primary: {
      bg: "#1C4265 !important",
      color: "diamond.white",
      fontSize: "0.875rem",
      _hover: {
        bg: "diamond.blue.5",
      },
    },
    neutral: {
      bg: "diamond.white",
      border: "1px solid black",
      borderColor: "diamond.blue.5",
      color: "diamond.blue.5",
      fontSize: "0.875rem",
      _hover: {
        bg: "diamond.white",
      },
    },
    disabled: {
      bg: "diamond.gray.2",
      color: "diamond.white",
      fontSize: "0.875rem",
      _hover: {
        bg: "diamond.gray.2",
      },
    },
    error: {
      bg: "diamond.red",
      color: "diamond.white",
      fontSize: "0.875rem",
      _hover: {
        bg: "diamond.red",
      },
    },
  },
};
