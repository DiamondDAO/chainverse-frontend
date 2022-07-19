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
      await addBlockToWorkspace({
        variables: {
          where: { uuid: workspaceId },
          connect: {
            blocks: {
              Note: [
                {
                  where: {
                    node: {
                      uuid: data.uuid,
                    },
                  },
                },
              ],
              Partnership: [
                {
                  where: {
                    node: {
                      uuid: data.uuid,
                    },
                  },
                },
              ],
            },
            entities: [
              {
                where: {
                  node: {
                    uuid: data.uuid,
                  }
                }
              }
            ],
          },
        },
      });
    } catch (e) {
      throw e;
    }
  };

  return { addBlockToWorkspaceHandler }

}