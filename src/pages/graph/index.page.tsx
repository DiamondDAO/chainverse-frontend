import { Box, Button, FormControl, Input, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useEffect, useRef } from "react";
import { Layout } from "@/components/Layout";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_NOTES } from "@/services/Apollo/Queries";
import { ClientOnly } from "@/components/UtilityComponents/ClientOnly";
import { CREATE_NOTES } from "@/services/Apollo/Mutations";
import { useAccount } from "wagmi";

const Preferences: NextPage = () => {
  const [getNotes, { data, loading }] = useLazyQuery(GET_NOTES);
  const [{ data: walletData }] = useAccount();
  const [addBlock] = useMutation(CREATE_NOTES, {
    refetchQueries: [GET_NOTES],
  });

  useEffect(() => {
    if (walletData?.address) {
      getNotes({ variables: { where: { address: walletData.address } } });
    }
  }, [walletData?.address]);

  const inputRef = useRef(null);
  return (
    <Layout>
      <Box display="flex" width="100%" flexDir="column" alignItems="center">
        <Heading> Blocks</Heading>
        <Box mt="10px" mb="50px" width="100%" maxW={"800px"}>
          <Box
            as="form"
            //@ts-ignore
            onSubmit={(e) => {
              e.preventDefault();
              addBlock({
                variables: {
                  input: [
                    {
                      text: inputRef.current.value,
                      wallet: {
                        connect: {
                          where: {
                            node: {
                              address: walletData?.address,
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              });
              inputRef.current.value = "";
            }}
            display="flex"
          >
            <Input
              ref={inputRef}
              borderRightRadius="none"
              placeholder="Type to submit a block"
            />
            <Button type="submit" borderLeftRadius={"none"}>
              Submit
            </Button>
          </Box>
        </Box>
        <ClientOnly>
          {!loading && (
            <>
              {data?.wallets[0].blocks
                .filter((i) => i.text !== undefined)
                .map((i, idx) => (
                  <Box px="10px" as="ul" key={idx}>
                    <li>{i.text}</li>
                  </Box>
                ))}
            </>
          )}
        </ClientOnly>
      </Box>
    </Layout>
  );
};

export default Preferences;
