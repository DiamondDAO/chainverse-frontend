import { GET_TAGS_AND_ENTITIES } from "@/services/Apollo/Queries";
import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { filterUniqueObjects } from "../utils";


export const useTagsAndEntities = () => {

  const { data: tagAndEntitiesData } = useQuery(GET_TAGS_AND_ENTITIES);

  const tags = useMemo(
    () =>
      filterUniqueObjects(tagAndEntitiesData?.tags, "tag")?.map((i) => i.tag) ||
      [],
    [tagAndEntitiesData?.tags]
  );
  const entities = useMemo(
    () =>
      filterUniqueObjects(tagAndEntitiesData?.entities, "name")?.map(
        (i) => i.name
      ) || [],
    [tagAndEntitiesData?.entities]
  );

  return {
    tags,
    entities,
  }
}