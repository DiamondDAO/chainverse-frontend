import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../common/theme";
import { RouterContext } from "next/dist/shared/lib/router-context";
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

export const decorators = [
  (Story) => (
    <ChakraProvider theme={theme}>
      <Story />
    </ChakraProvider>
  ),
];
