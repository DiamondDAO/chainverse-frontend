// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";
import { Button } from "./components/button";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  diamond: {
    white: "#FFFFFF",
    gray: {
      0: "#F8F8F8",
      1: "#F0F0F0",
      2: "#C3C3C3",
      3: "#9B9B9B",
      4: "#616161",
      5: "#323232",
    },
    black: "#000000",
    blue: {
      0: "#E8F4FF",
      1: "#D1E5F8",
      2: "#ACC9E4",
      3: "#5B81A5",
      4: "#436C92",
      5: "#1C4265",
    },
    link: "#005FCF",
    red: "#CF6363",
    orange: "#DBA24C",
    yellow: "#DBCF62",
    green: "#5AA46B",
    ocean: "#68B2AE",
    teal: "#5191A5",
    purple: "#845FA3",
    magenta: "#95438D",
    pink: "#DAA7C9",
  },
  text: {
    primary: "#323232",
    secondary: "#9B9B9B",
  },
};

const fonts = {
  heading: "Rubik",
  body: "Rubik",
};
const space = {
  small: "5px",
  medium: "10px",
  large: "20px",
};

export const theme = extendTheme({
  colors,
  fonts,
  space,
  components: { Button },
});

export const borderStyles = {
  border: "0.5px solid",
  borderColor: "diamond.gray.2",
  borderRadius: "5px",
  overflow: "hidden",
};

export const scrollStyles = {
  overflow: "scroll",
  scrollbarWidth: "thin",
  msOverflowStyle: {
    width: "5px",
    height: "5px",
    bg: "diamond.gray.0",
  },
  "&::-webkit-scrollbar": {
    width: "5px",
    height: "5px",
    bg: "diamond.gray.0",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "diamond.blue.2",
  },
};
