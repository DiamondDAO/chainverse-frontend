import { Box, useTheme, Text } from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import React, { FC } from "react";
import * as styles from "./styles";

interface INavPages {
  pages: { text: string; link: string }[];
}
export const NavPages: FC<INavPages> = ({ pages }) => {
  const { space } = useTheme();
  const router = useRouter();
  return (
    <>
      {pages.map((item) => {
        const isActive = router.pathname.includes(item.link);
        return (
          <Box
            key={item.text}
            onClick={() => Router.push(item.link)}
            sx={styles.NavLink(isActive)}
          >
            <Text>{item.text}</Text>
          </Box>
        );
      })}
    </>
  );
};
