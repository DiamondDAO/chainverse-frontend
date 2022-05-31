import { Box, Container, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { NavBar } from "@/components/Navbar";
import { useConnect } from "wagmi";
import * as styles from "./styles";
interface ILayout {
  children: React.ReactNode;
  graphBg?: boolean;
}

export const Layout: FC<ILayout> = ({ children }) => {
  const [
    {
      data: { connected },
      loading,
    },
  ] = useConnect();

  return (
    <Box sx={styles.LayoutContainer}>
      <NavBar />
      <Container sx={styles.InnerContainer}>
        {loading && <Text>Loading...</Text>}
        {!loading && !connected && (
          <Text textAlign="center">
            Please connect your wallet to continue.
          </Text>
        )}
        {!loading && connected && children}
      </Container>
    </Box>
  );
};
