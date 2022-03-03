import { GET_WALLET_COUNT } from "@/services/Apollo/Queries";
import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { useLazyQuery } from "@apollo/client";
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

  const RouteToOnboardHandler = async () => {
    const {
      data: { walletsCount },
    } = await getWalletCount({
      variables: { where: { address: walletData?.address } },
    });
    if (walletsCount < 1) {
      Router.push("/onboard");
    }
  };
  const router = useRouter();
  useEffect(() => {
    if (connected && router.pathname !== "/") {
      RouteToOnboardHandler();
    }
  }, [connected, router.pathname]);

  return <>{children}</>;
};
