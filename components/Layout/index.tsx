import { Container } from "@chakra-ui/react";
import React, { FC } from "react";
import { NavBar } from "../Navbar";

interface ILayout {
  children: React.ReactNode;
}

export const Layout: FC<ILayout> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Container mt="40px" mb="40px" maxW="container.xl">
        {children}
      </Container>
    </>
  );
};
