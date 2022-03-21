import { Box, Container, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { NavBar } from "@/components/Navbar";
import { useAccount, useConnect } from "wagmi";

interface ILayout {
  children: React.ReactNode;
  graphBg?: boolean;
}

export const Layout: FC<ILayout> = ({ children, graphBg }) => {
  const [
    {
      data: { connected },
      loading,
    },
  ] = useConnect();

  return (
    <Box
      position="relative"
      sx={{
        ...(graphBg && {
          bgSize: "15px 15px",
          bgImage:
            "radial-gradient(circle at 1px 1px, #D8E3EA 1px, transparent 0)",
        }),
      }}
      minH="100vh"
    >
      <NavBar />
      <Container
        mt="30px"
        mb="40px"
        px={["12px", null, "40px"]}
        maxW="container.2xl"
      >
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
