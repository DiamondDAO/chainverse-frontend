import { useMemo } from "react";

export const useGetWorkspaceData = (workspaceData: any) => {

  const workspace = workspaceData?.workspaces?.[0];
  const entityData = useMemo(
    () => workspace?.entities,
    [workspace?.entities]
  );
  const notesData = useMemo(
    () => workspace?.blocks.filter((i) => i.__typename === "Note" || i.__typename === "Partnership" ),
    [workspace?.blocks]
  );
  const nodeData = useMemo(
    () => entityData?.concat(notesData),
    [entityData, notesData]
  );
  
  return {
    nodeData,
    workspace,
  }
}