import { useEffect, useMemo, useState } from "react";

const CHAINVERSE_OS = 'chainverse_os'
export const showChainverseOS = () =>{
  localStorage.setItem(CHAINVERSE_OS, "true")
  window.location.reload();
}
export const removeChainverseOS = () =>{
  localStorage.removeItem(CHAINVERSE_OS)
  window.location.reload();
}
export const isVisibleChainverseOS = () =>{
  if (typeof window !== 'undefined') {
  const isVisible = localStorage.getItem(CHAINVERSE_OS)
   return !!isVisible
  }
  return false
}

export const useGetBlockTableData = ({
  term,
  blocksFuseSearchResult,
  getnodeData,
}) => {
  const [blockTableData, setBlockTableData] = useState([]);

  useEffect(() => {
    getnodeDataHandler({ reset: true });
  }, [term, blocksFuseSearchResult]);

  const getnodeDataHandler = async ({ reset = false }: { reset: boolean }) => {
    if (blocksFuseSearchResult.length > 0) {
      const notes = blocksFuseSearchResult;
      setBlockTableData(reset ? notes : blockTableData.concat(notes));
    } else {
      setBlockTableData([]);
    }
  };
  const nodeData = useMemo(() => blockTableData, [blockTableData, term]);
  const hasMorenodeData = useMemo(
    () => blockTableData.length < blocksFuseSearchResult.length,
    [blockTableData, blocksFuseSearchResult]
  );
  return { getnodeDataHandler, nodeData, hasMorenodeData };
};

export const useGetEntityTableData = ({
  term,
  entityFuseSearchResult,
  getEntitiesData,
}) => {
  const [entityTableData, setEntityTableData] = useState([]);

  useEffect(() => {
    getEntityDataHandler({ reset: true });
  }, [term, entityFuseSearchResult]);

  const getEntityDataHandler = async ({
    reset = false,
  }: {
    reset: boolean;
  }) => {
    if (entityFuseSearchResult.length > 0) {
      const length = reset ? 0 : entityTableData.length;
      const lengthAdd = reset ? 15 : entityTableData.length + 15;
      const t = entityFuseSearchResult
        .slice(length, lengthAdd)
        .map((i) => i.item);
      const data = await getEntitiesData({
        variables: {
          where: {
            name_IN: t,
          },
        },
      });
      const entities = (data as any).data.entities;
      setEntityTableData(reset ? entities : entityTableData.concat(entities));
    } else {
      setEntityTableData([]);
    }
  };
  const entityData = useMemo(() => entityTableData, [entityTableData, term]);

  const hasMoreEntityData = useMemo(
    () => entityTableData.length < entityFuseSearchResult.length,
    [entityTableData, entityFuseSearchResult]
  );

  return { entityData, hasMoreEntityData, getEntityDataHandler };
};

export const useGetTagsTableData = ({
  term,
  tagFusSearchResult,
  getTagsData,
}) => {
  const [tagTableData, setTagTableData] = useState([]);

  useEffect(() => {
    getTagDataHandler({ reset: true });
  }, [term, tagFusSearchResult]);

  const getTagDataHandler = async ({ reset = false }: { reset: boolean }) => {
    if (tagFusSearchResult.length > 0) {
      const length = reset ? 0 : tagTableData.length;
      const lengthAdd = reset ? 15 : tagTableData.length + 15;
      const t = tagFusSearchResult.slice(length, lengthAdd).map((i) => i.item);
      const data = await getTagsData({
        variables: {
          where: {
            tag_IN: t,
          },
        },
      });
      const tags = (data as any).data.tags;
      setTagTableData(reset ? tags : tagTableData.concat(tags));
    } else {
      setTagTableData([]);
    }
  };
  const tagData = useMemo(() => tagTableData, [tagTableData, term]);

  const hasMoreTagData = useMemo(
    () => tagTableData.length < tagFusSearchResult.length,
    [tagTableData, tagFusSearchResult]
  );

  return { tagData, hasMoreTagData, getTagDataHandler };
};
