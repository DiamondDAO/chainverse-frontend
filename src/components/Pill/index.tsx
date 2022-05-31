import { As, Box, ChakraProps, OmitCommonProps } from "@chakra-ui/react";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import * as styles from "./styles";
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
    <Box as={asButton ? "button" : "span"} sx={styles.PillStyle} {...rest}>
      {icon && (
        <Box as="span" mr="2px">
          {icon}
        </Box>
      )}
      {children}
    </Box>
  );
};
