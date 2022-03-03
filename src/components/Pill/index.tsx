import { Box, CSSObject } from "@chakra-ui/react";
import React from "react";

export const Pill = ({
  children,
  icon,
  asButton,
  sx,
  onClick,
}: {
  children: React.ReactNode;
  icon?: JSX.Element;
  asButton?: boolean;
  sx?: CSSObject;
  onClick?: React.MouseEventHandler<HTMLDivElement> &
    (
      | React.MouseEventHandler<HTMLButtonElement>
      | React.MouseEventHandler<HTMLSpanElement>
    );
}) => {
  return (
    <Box
      as={asButton ? "button" : "span"}
      border="0.5px solid #D1E5F8"
      borderRadius="3px"
      p="2px"
      width="max-content"
      lineHeight="17.5px"
      bg="diamond.blue.1"
      display="inline-flex"
      alignItems="center"
      mr="4px"
      onClick={onClick}
      sx={sx}
    >
      {icon && <Box mr="2px">{icon}</Box>}
      {children}
    </Box>
  );
};
