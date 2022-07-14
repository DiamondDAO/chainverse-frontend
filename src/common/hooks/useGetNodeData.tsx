import { useEffect, useMemo } from "react";

import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_SANDBOX } from "@/services/Apollo/Queries";
import { ADD_SANDBOX_TO_WALLET } from "@/services/Apollo/Mutations";

export const useGetNodeData = (walletData: any) => {

  const [ getSandbox, { data: sandboxData, loading } ] = useLazyQuery(
    GET_SANDBOX,
  );
  const [addSandboxToWallet, { error: addBlockError }] = useMutation(
    ADD_SANDBOX_TO_WALLET,
    {
      refetchQueries: [],
    }
  );
  
  const entityData = useMemo(
    () => sandboxData?.sandboxes[0]?.entities,
    [sandboxData?.sandboxes[0]?.entities]
  );

  const notesData = useMemo(
    () =>
      sandboxData?.sandboxes[0]?.blocks.filter(
        (i) => i.__typename === 'Note' || i.__typename === 'Partnership'
      ),
    [sandboxData?.sandboxes[0]?.blocks]
  );
  
  const nodeData = useMemo(
    () => entityData?.concat(notesData),
    [entityData, notesData]
  );
    
  useEffect(() => {
    const connectOrCreateSandbox = async (walletAddress: string) => {
      const Sandbox = await getSandbox({
        variables: {
          where: { wallet: { address: walletAddress } },
        },
      });
      if (Sandbox.data.sandboxes.length === 0) {
        await addSandboxToWallet({
          variables: {
            where: { address: walletAddress },
            connectOrCreate: {
              sandbox: {
                where: {
                  node: { name: `${walletAddress} Sandbox` },
                },
                onCreate: {
                  node: {
                    name: `${walletAddress} Sandbox`,
                  },
                },
              },
            },
          },
        });
      }
    };
    if (walletData?.address) {
      connectOrCreateSandbox(walletData.address);
    }
  }, [getSandbox, walletData?.address, addSandboxToWallet]);

  return { 
    nodeData,
    loading 
  }
}