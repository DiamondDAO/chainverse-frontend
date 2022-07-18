import { UPDATE_SANDBOX } from "@/services/Apollo/Mutations";
import { useMutation } from "@apollo/client";


export const useAddBlock = (refetchQueries: any[]) => {

  const [addBlockToSandbox, { error: addBlockToSandboxError }] = useMutation(
    UPDATE_SANDBOX,
    {
      refetchQueries
    }
  );

  const addBlockToSandboxHandler = async (data?: any) => {
    try {
      if (data.__typename === "Note") {
        console.log(data)
        await addBlockToSandbox({
          variables: {
            where: {
              wallet: {
                address: data?.walletAddress,
              },
            },
            connect: {
              blocks: {
                Note: [
                  {
                    where: {
                      node: {
                        uuid: data?.uuid,
                      },
                    },
                  },
                ],
              },
            },
          },
        });
      } else if (data.__typename === 'Partnership') {
        await addBlockToSandbox({
          variables: {
            where: {
              wallet: {
                address: data?.walletAddress,
              },
            },
            connect: {
              blocks: {
                Partnership: [
                  {
                    where: {
                      node: {
                        uuid: data?.uuid,
                      },
                    },
                  },
                ],
              },
            },
          },
        });
      } else if (data.__typename === 'Entity') {
        await addBlockToSandbox({
          variables: {
            where: {
              wallet: {
                address: data?.walletAddress,
              },
            },
            connect: {
              entities: [
                {
                  where: {
                    node: {
                      uuid: data?.uuid,
                    },
                  },
                },
              ],
            },
          },
        });
      }
    } catch (e) {
      throw e;
    }
  };

  return { addBlockToSandboxHandler }
}