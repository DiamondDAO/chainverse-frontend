import { UPDATE_WORKSPACE } from "@/services/Apollo/Mutations";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";


export const useAddBlockToWorkspace = (refetchQueries: any[]) => {

  const router = useRouter();
  const { workspaceId } = router.query;

  const [addBlockToWorkspace, { error: addBlockToWorkspaceError }] = useMutation(
    UPDATE_WORKSPACE,
    {
      refetchQueries
    }
  );

  const addBlockToWorkspaceHandler = async (data?: any) => {
    try {
      if (data.__typename === "Note") {
        console.log(data)
        await addBlockToWorkspace({
          variables: {
            where: {
              uuid: workspaceId
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
        await addBlockToWorkspace({
          variables: {
            where: {
              uuid: workspaceId
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
        await addBlockToWorkspace({
          variables: {
            where: {
              uuid: workspaceId
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

  return { addBlockToWorkspaceHandler }

}