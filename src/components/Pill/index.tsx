import { As, Box, ChakraProps, OmitCommonProps } from "@chakra-ui/react";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

interface IPill {
  icon?: JSX.Element;
  asButton?: boolean;
}

export const Pill = (
  props: JSX.IntrinsicAttributes &
    OmitCommonProps<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
      keyof ChakraProps
    > &
    ChakraProps &
    OmitCommonProps<any, keyof ChakraProps> & { as?: As<any> } & IPill
) => {
  const { icon, children, asButton, ...rest } = props;
  return (
    <Box
      as={asButton ? "button" : "span"}
      border="0.5px solid rgba(209, 229, 248, 1)"
      borderRadius="3px"
      p="2px 4px"
      height="17px"
      justifyContent="center"
      bg="diamond.blue.0"
      display="inline-flex"
      alignItems="center"
      mr="2px"
      {...rest}
    >
      {icon && (
        <Box as="span" mr="2px">
          {icon}
        </Box>
      )}
      {children}
    </Box>
  );
};
