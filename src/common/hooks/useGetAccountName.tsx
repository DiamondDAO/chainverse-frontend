import { useMemo } from "react";
import { useAccount } from "wagmi";
import { truncateAddress } from "../utils";

/*
Component used to render ENS/Truncated Address, otherwise loading component
*/

export const useGetAccountName = ({
  loadingComponent = <></>,
}: {
  loadingComponent?: JSX.Element;
}) => {
  const [{ data, loading }] = useAccount({ fetchEns: true });

  const accountName = useMemo(() => {
    if (!data?.connector) {
      return "";
    } else if (data?.ens?.name) {
      return data.ens.name;
    } else if (data?.address) {
      return `0x${data?.address && truncateAddress(data?.address.slice(2), 3)}`;
    } else {
      return loadingComponent;
    }
  }, [data?.ens?.name, data?.address, loadingComponent, data?.connector]);

  return { accountName, loading };
};
