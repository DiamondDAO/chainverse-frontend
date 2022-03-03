import { useMemo } from "react";
import { useAccount } from "wagmi";
import { truncateAddress } from "../utils";

export const useGetAccountName = ({
  loadingComponent = <></>,
}: {
  loadingComponent?: JSX.Element;
}) => {
  const [{ data, loading }] = useAccount({ fetchEns: true });
  const accountName = useMemo(() => {
    if (!data?.connector) {
      return "";
    } else {
      return data?.ens?.name
        ? data?.ens?.name
        : data?.address
        ? `0x${data?.address && truncateAddress(data?.address.slice(2), 3)}`
        : loadingComponent;
    }
  }, [data?.ens?.name, data?.address, loadingComponent]);

  return { accountName, loading };
};
