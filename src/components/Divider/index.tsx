import { As, Box, ChakraProps, OmitCommonProps } from "@chakra-ui/react";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export const Divider = (
  props: JSX.IntrinsicAttributes &
    OmitCommonProps<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
      keyof ChakraProps
    > &
    ChakraProps &
    OmitCommonProps<any, keyof ChakraProps> & { as?: As<any> }
) => {
  return (
    <Box
      borderTop="0.5px solid black"
      borderColor="diamond.gray.2"
      {...props}
    />
  );
};
