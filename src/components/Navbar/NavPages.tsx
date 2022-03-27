import { Box, Link, useTheme, Text } from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import React, { FC } from "react";

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
            py="7px"
            px={space.medium}
            background={isActive ? "diamond.blue.0" : "diamond.white"}
            color={isActive ? "diamond.black" : "diamond.gray.5"}
            onClick={() => Router.push(item.link)}
            cursor="pointer"
          >
            <Text>{item.text}</Text>
          </Box>
        );
      })}
    </>
  );
};
