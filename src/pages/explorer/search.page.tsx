import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  GET_ALL_NOTES,
  GET_BLOCK_DATA,
  GET_ENTITIES_DATA,
  GET_TAGS_AND_ENTITIES,
} from "@/services/Apollo/Queries";
import { ExplorerNavigator } from "@/components/Explorer/ExplorerNavigator";
import { SearchIcon } from "@chakra-ui/icons";
import Fuse from "fuse.js";
import { filterUniqueObjects } from "@/common/utils";
import { TagIcon } from "@/components/Icons/TagIcon";
import { EntitiesIcon } from "@/components/Icons/EntitiesIcon";
import Router, { useRouter } from "next/router";
import { Loader } from "@/components/Loader";
import { IconVariants } from "@/common/types";
import { BlockIcon } from "@/components/Icons/BlockIcon";
import { EntityTable } from "@/components/Explorer/EntityTable";
import { BlockTable } from "@/components/Explorer/BlockTable";

enum SearchTypes {
  Blocks = "blocks",
  Tags = "tags",
  Entities = "entities",
}

const Search: NextPage = () => {
  const router = useRouter();
  const { term, type } = router.query;

  // graphql data
  const { data: notesData } = useQuery(GET_ALL_NOTES);
  const { data: tagAndEntitiesData, loading } = useQuery(GET_TAGS_AND_ENTITIES);
  const [getEntitiesData] = useLazyQuery(GET_ENTITIES_DATA);
  const [getBlockData] = useLazyQuery(GET_BLOCK_DATA);

  // search state
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState(SearchTypes.Blocks);

  useEffect(() => {
    if (term) {
      setSearchValue(term as string);
    }
  }, [term]);

  useEffect(() => {
    // used to prevent types not in our defined set
    const typeHandler = () => {
      switch (type) {
        case SearchTypes.Blocks:
          return SearchTypes.Blocks;
        case SearchTypes.Tags:
          return SearchTypes.Tags;
        case SearchTypes.Entities:
        default:
          return SearchTypes.Entities;
      }
    };
    setSearchType(typeHandler());
  }, [type]);

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

  const blocks = useMemo(
    () =>
      filterUniqueObjects(notesData?.notes, "text")?.map((i) => i.text) || [],
    [notesData]
  );

  const tagFusSearchResult = useMemo(
    () =>
      tags.length > 0
        ? new Fuse(tags, {
            includeScore: false,
            threshold: 0.3,
          })?.search((term as string) || "")
        : [],
    [tags, term]
  );
  const entityFuseSearchResult = useMemo(
    () =>
      entities.length > 0
        ? new Fuse(entities, {
            includeScore: false,
            threshold: 0.3,
          })?.search((term as string) || "")
        : [],
    [entities, term]
  );
  const blocksFuseSearchResult = useMemo(
    () =>
      blocks.length > 0
        ? new Fuse(blocks, {
            includeScore: false,
            threshold: 0.3,
          })?.search((term as string) || "")
        : [],
    [blocks, term]
  );
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
    }
  };

  const entityData = React.useMemo(
    () => entityTableData,
    [entityTableData, term]
  );

  const [blockTableData, setBlockTableData] = useState([]);

  useEffect(() => {
    getBlockDataHandler({ reset: true });
  }, [term, entityFuseSearchResult]);

  const getBlockDataHandler = async ({ reset = false }: { reset: boolean }) => {
    if (blocksFuseSearchResult.length > 0) {
      const length = reset ? 0 : blockTableData.length;
      const lengthAdd = reset ? 15 : blockTableData.length + 15;
      const t = blocksFuseSearchResult
        .slice(length, lengthAdd)
        .map((i) => i.item);
      console.log(t, "check");
      const data = await getBlockData({
        variables: {
          where: {
            text_IN: t,
          },
        },
      });
      const notes = (data as any).data.notes;
      console.log(data.data.notes, "yo");
      setBlockTableData(reset ? notes : blockTableData.concat(notes));
    }
  };

  const blockData = React.useMemo(() => blockTableData, [blockTableData, term]);
  if (loading) return <Loader />;
  return (
    <>
      <Layout graphBg>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Text fontWeight="600" fontSize="2rem" zIndex={1}>
            Explorer
          </Text>
        </Box>
        <Box
          mt="40px"
          display="grid"
          gridTemplateColumns={["1fr", null, null, "1fr 4fr"]}
        >
          <Box sx={{ columnGap: "50px" }}>
            <Box w="100%" zIndex={3} display={["none", null, null, "flex"]}>
              <ExplorerNavigator />
            </Box>
          </Box>
          <Box>
            <Box
              display="flex"
              flexDir={["column", null, "row"]}
              justifyContent="space-between"
              alignItems={["unset", null, "center"]}
            >
              <Box position={"relative"} w="100%" maxW="712px" mr="25px">
                <InputGroup
                  bg="white"
                  alignItems={"center"}
                  border="none"
                  borderRadius="5px"
                  height="50px"
                >
                  <InputLeftElement
                    pl="25px"
                    height="100%"
                    pointerEvents="none"
                  >
                    <SearchIcon w="12px" />
                  </InputLeftElement>
                  <Input
                    onKeyDown={(e) => {
                      if (e.key === "Enter")
                        Router.push(`/explorer/search?term=${searchValue}`);
                    }}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    pl="45px"
                    bg="white"
                    width="100%"
                    height="100%"
                    border="1px solid black"
                    placeholder="Start with a search for any keyword, community name, or user"
                  />
                </InputGroup>
              </Box>
              <Box
                mt={["24px", null, "unset"]}
                display="flex"
                height="fit-content"
                sx={{ columnGap: "12px" }}
              >
                <Box
                  onClick={() =>
                    Router.push(
                      `/explorer/search?term=${searchValue}&type=entities`
                    )
                  }
                  cursor="pointer"
                  color="black"
                  alignItems={"center"}
                  p="4px"
                  display="flex"
                  bg="transparent"
                  borderRadius={"5px"}
                  whiteSpace={"nowrap"}
                  fontSize="12px"
                  w="fit-content"
                  sx={{
                    ...(searchType === SearchTypes.Entities && {
                      color: "white",
                      bg: "diamond.magenta",
                    }),
                  }}
                >
                  <EntitiesIcon
                    variant={
                      searchType === SearchTypes.Entities
                        ? IconVariants.White
                        : IconVariants.Black
                    }
                  />
                  <Box ml="4px">
                    Entities ({`${entityFuseSearchResult.length}`})
                  </Box>
                </Box>
                <Box
                  onClick={() =>
                    Router.push(
                      `/explorer/search?term=${searchValue}&type=blocks`
                    )
                  }
                  cursor="pointer"
                  color="black"
                  display="flex"
                  alignItems={"center"}
                  p="4px"
                  bg="transparent"
                  w="fit-content"
                  whiteSpace={"nowrap"}
                  borderRadius={"5px"}
                  fontSize="12px"
                  sx={{
                    ...(searchType === SearchTypes.Blocks && {
                      color: "white",
                      bg: "diamond.magenta",
                    }),
                  }}
                >
                  <BlockIcon
                    variant={
                      searchType === SearchTypes.Blocks
                        ? IconVariants.White
                        : IconVariants.Black
                    }
                  />
                  <Box ml="4px">
                    Blocks ({`${blocksFuseSearchResult.length}`})
                  </Box>
                </Box>
                <Box
                  onClick={() =>
                    Router.push(
                      `/explorer/search?term=${searchValue}&type=tags`
                    )
                  }
                  cursor="pointer"
                  color="black"
                  display="flex"
                  w="fit-content"
                  alignItems={"center"}
                  p="4px"
                  mx="2px"
                  whiteSpace={"nowrap"}
                  bg="transparent"
                  borderRadius={"5px"}
                  fontSize="12px"
                  sx={{
                    ...(searchType === SearchTypes.Tags && {
                      color: "white",
                      bg: "diamond.magenta",
                    }),
                  }}
                >
                  <TagIcon
                    variant={
                      searchType === SearchTypes.Tags
                        ? IconVariants.White
                        : IconVariants.Black
                    }
                  />
                  <Box ml="4px" whiteSpace={"nowrap"}>
                    Tags ({`${tagFusSearchResult.length}`})
                  </Box>
                </Box>
              </Box>
            </Box>
            {searchType === SearchTypes.Entities && (
              <EntityTable
                data={entityData}
                update={() => getEntityDataHandler({ reset: false })}
                hasMore={entityTableData.length < entityFuseSearchResult.length}
              />
            )}
            {searchType === SearchTypes.Blocks && (
              <BlockTable
                data={blockData}
                update={() => getBlockDataHandler({ reset: false })}
                hasMore={blockTableData.length < blocksFuseSearchResult.length}
              />
            )}
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default Search;
