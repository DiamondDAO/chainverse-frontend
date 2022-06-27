import {useToast} from "@chakra-ui/react";
import { GET_WALLET_COUNT } from "@/services/Apollo/Queries";
import {
  CREATE_WALLETS,
} from "@/services/Apollo/Mutations";
import { useEffect } from "react";
import { useAccount, useConnect } from "wagmi";
import { useLazyQuery, useMutation } from "@apollo/client";
import Router, { useRouter } from "next/router";

export const CheckIfOnboarded = ({ children }) => {
  const [
    {
      data: { connected },
      loading,
    },
  ] = useConnect();
  const [{ data: walletData }] = useAccount();
  const [getWalletCount] = useLazyQuery(GET_WALLET_COUNT);
  const [createWallet] = useMutation(CREATE_WALLETS);

  const toast = useToast();
  const RouteToOnboardHandler = async () => {
    const {
      data: { walletsCount },
    } = await getWalletCount({
      variables: { where: { address: walletData?.address } },
    });
    if (walletsCount < 1) {
      {/* Router.push("/onboard");*/}
      try {
        await createWallet({
          variables: {
            input: [
              {
                address: walletData?.address
              },
            ],
          }
        });
      } catch (e) {
        console.log(e);
        toast({
          title: "There was an error in your submission.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    };
  };
  const router = useRouter();
  useEffect(() => {
    if (connected && router.pathname !== "/") {
      RouteToOnboardHandler();
    }
  }, [connected, router.pathname]);

  return <>{children}</>;
};
