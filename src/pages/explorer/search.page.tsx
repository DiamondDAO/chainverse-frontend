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
  GET_ALL_BLOCKS,
  GET_BLOCK_DATA,
  GET_ENTITIES_DATA,
  GET_TAGS_AND_ENTITIES,
  GET_TAG_DATA,
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
import {
  useGetBlockTableData,
  useGetEntityTableData,
  useGetTagsTableData,
} from "./searchHooks";
import { TagTable } from "@/components/Explorer/TagTable";
import { useAccount } from "wagmi";

enum SearchTypes {
  Blocks = "blocks",
  Tags = "tags",
  Entities = "entities",
}

const Search: NextPage = () => {
  const router = useRouter();
  const { term, type } = router.query;

  // graphql data
  const { data: notesData } = useQuery(GET_ALL_BLOCKS);
  const { data: tagAndEntitiesData, loading } = useQuery(GET_TAGS_AND_ENTITIES);
  const [getEntitiesData] = useLazyQuery(GET_ENTITIES_DATA);
  const [getnodeData] = useLazyQuery(GET_BLOCK_DATA);
  const [getTagsData] = useLazyQuery(GET_TAG_DATA);
  const [{ data: walletData }] = useAccount();
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

  // Tags
  const tags = useMemo(
    () =>
      filterUniqueObjects(tagAndEntitiesData?.tags, "tag")?.map((i) => i.tag) ||
      [],
    [tagAndEntitiesData?.tags]
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

  const { getTagDataHandler, hasMoreTagData, tagData } = useGetTagsTableData({
    term,
    tagFusSearchResult,
    getTagsData,
  });

  // Entities
  const entities = useMemo(
    () =>
      filterUniqueObjects(tagAndEntitiesData?.entities, "name")?.map(
        (i) => i.name
      ) || [],
    [tagAndEntitiesData?.entities]
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

  const { getEntityDataHandler, entityData, hasMoreEntityData } =
    useGetEntityTableData({
      term,
      entityFuseSearchResult,
      getEntitiesData,
    });

  // Blocks
  const blocks = useMemo(
    () =>
      filterUniqueObjects(notesData?.wallets[0].blocks, "text" )?.map((i) => i) || [],
    [notesData]
  );
  /*const blocks = [notesData?.wallets[0].blocks];*/

  const blocksFuseSearchResult = useMemo(
    () =>
      blocks.length > 0
        ? new Fuse(blocks, {
            includeScore: false,
            threshold: 0.7,
          })?.search((term as string) || "")
        : [],
    [blocks, term]
  );

  /*const blocksFuseSearchResult = useMemo(
    () =>
    blocks.length > 0
    ? blocks.filter((i) => String(i.text).includes(term)) : [],
  [blocks, term]);
*/
  const { getnodeDataHandler, nodeData, hasMorenodeData } =
    useGetBlockTableData({
      term,
      blocksFuseSearchResult,
      getnodeData,
    });

  if (loading) return <Loader />;

  return (
    <>
      <Layout>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Text fontWeight="600" fontSize="2rem" zIndex={1}>
            Explorer
          </Text>
        </Box>
        <Box
          mt="40px"
          display="grid"
          gridTemplateColumns={["1fr", null, null, "1fr"]}
        >
          <Box sx={{ columnGap: "50px" }}>
            <Box w="100%" zIndex={3} display={["none", null, null, "flex"]}>
              {/* <ExplorerNavigator /> */}
            </Box>
          </Box>
          <Box ml={["unset", null, null, "50px"]}>
            <Box
              display="flex"
              flexDirection={["column", null, "row"]}
              justifyContent="space-between"
              alignItems={["unset", null, "center"]}
            >
              <Box position={"relative"} w="100%" maxWidth="712px" mr="25px">
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
                        Router.push(
                          `/explorer/search?term=${searchValue}&type=${searchType}`
                        );
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
                walletAddress={walletData?.address}
                update={() => getEntityDataHandler({ reset: false })}
                hasMore={hasMoreEntityData}
              />
            )}
            {searchType === SearchTypes.Blocks && (
              <BlockTable
                data={nodeData}
                walletAddress={walletData?.address}
                update={() => getnodeDataHandler({ reset: false })}
                hasMore={hasMorenodeData}
              />
            )}
            {searchType === SearchTypes.Tags && (
              <TagTable
                data={tagData}
                walletAddress={walletData?.address}
                update={() => getTagDataHandler({ reset: false })}
                hasMore={hasMoreTagData}
              />
            )}
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default Search;
