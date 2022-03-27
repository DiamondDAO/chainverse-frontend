import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "@/components/Layout";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_NOTES,
  GET_TAGS_AND_ENTITIES,
} from "@/services/Apollo/Queries";
import { ExplorerNavigator } from "@/components/Explorer/ExplorerNavigator";
import { SearchIcon } from "@chakra-ui/icons";
import { useSpring, a } from "react-spring";
import Fuse from "fuse.js";
import { filterUniqueObjects } from "@/common/utils";
import { Pill } from "@/components/Pill";
import { TagIcon } from "@/components/Icons/TagIcon";
import { EntitiesIcon } from "@/components/Icons/EntitiesIcon";
import Router from "next/router";

const Explorer: NextPage = () => {
  const { data: notesData } = useQuery(GET_ALL_NOTES);
  const { data: tagAndEntitiesData } = useQuery(GET_TAGS_AND_ENTITIES);
  const [searchValue, setSearchValue] = useState("");
  const [displaySearchBox, setDisplaySearchBox] = useState(false);

  const [searchBoxStyle, api] = useSpring(() => {
    opacity: 0;
  });

  const AnimatedBox = a(Box);
  useEffect(() => {
    if (displaySearchBox) {
      api.start({ opacity: 1 });
    } else {
      api.start({ opacity: 0 });
    }
  }, [api, displaySearchBox]);

  const searchBoxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setDisplaySearchBox(false);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBoxRef]);

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

  const tagFuse = new Fuse(tags, {
    includeScore: false,
    threshold: 0.3,
  });

  const entityFuse = new Fuse(entities, {
    includeScore: false,
    threshold: 0.3,
  });

  const blockFuse = new Fuse(blocks, {
    includeScore: false,
    threshold: 0.3,
  });

  return (
    <>
      <Layout graphBg>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Text fontWeight="600" fontSize="2rem" zIndex={1}>
            Explorer
          </Text>
        </Box>
        <Box mt="40px" display="grid" gridTemplateColumns={"1fr 2fr"}>
          <Box display="flex" sx={{ columnGap: "50px" }}>
            <Box w="100%" maxWidth="210px" zIndex={3}>
              <ExplorerNavigator />
            </Box>
          </Box>
          <Box ref={searchBoxRef} position={"relative"} maxW="716px">
            <InputGroup
              bg="white"
              alignItems={"center"}
              border="none"
              borderRadius="5px"
              height="66px"
              boxShadow="0px 2px 15px #C3C3C3"
            >
              <InputLeftElement pl="25px" height="100%" pointerEvents="none">
                <SearchIcon w="12px" />
              </InputLeftElement>
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter")
                    Router.push(`/explorer/search?term=${searchValue}`);
                }}
                onFocus={() => setDisplaySearchBox(true)}
                pl="45px"
                bg="white"
                width="100%"
                height="100%"
                border="1px solid black"
                type="tel"
                placeholder="Start with a search for any keyword, community name, or user"
              />
            </InputGroup>

            {displaySearchBox && (
              <AnimatedBox
                style={searchBoxStyle}
                p="0px"
                fontSize="14px"
                mt="10px"
                bg="white"
                boxShadow="0px 2px 15px #C3C3C3"
                width="100%"
                minH="70px"
                position="absolute"
                borderRadius="5px"
                border="1px solid black"
              >
                <Box
                  p="25px"
                  borderRadius={"5px"}
                  cursor="pointer"
                  onClick={() =>
                    Router.push(`/explorer/search?term=${searchValue}`)
                  }
                  _hover={{ bg: "diamond.blue.1" }}
                >
                  <Text>
                    Search: {`"`} {searchValue} {`"`}
                  </Text>
                </Box>
                <Tabs px="25px" variant="unstyled">
                  <TabList sx={{ "& > button": { padding: "12px" } }}>
                    <Tab
                      marginLeft="-12px"
                      fontSize={"12px"}
                      fontWeight="500"
                      color="diamond.gray.3"
                      height={"fit-content"}
                      _selected={{
                        color: "diamond.blue.5",
                        textDecoration: "underline",
                        textUnderlineOffset: "2px",
                      }}
                    >
                      ENTITIES
                    </Tab>
                    <Tab
                      fontSize={"12px"}
                      fontWeight="500"
                      color="diamond.gray.3"
                      height={"fit-content"}
                      _selected={{
                        color: "diamond.blue.5",
                        textDecoration: "underline",
                        textUnderlineOffset: "2px",
                      }}
                    >
                      TAGS
                    </Tab>
                    <Tab
                      fontSize={"12px"}
                      fontWeight="500"
                      color="diamond.gray.3"
                      height={"fit-content"}
                      _selected={{
                        color: "diamond.blue.5",
                        textDecoration: "underline",
                        textUnderlineOffset: "2px",
                      }}
                    >
                      BLOCKS
                    </Tab>
                  </TabList>
                  <TabPanels
                    sx={{
                      "& > *": { padding: "0 !important" },
                      paddingBottom: "25px",
                    }}
                  >
                    <TabPanel>
                      {entityFuse
                        ?.search(searchValue)
                        .slice(0, 5)
                        .map((i) => i.item)
                        .map((entity: string) => (
                          <Box
                            key={entity}
                            display="flex"
                            justifyContent={"space-between"}
                            p="2px"
                          >
                            <Pill asButton icon={<EntitiesIcon />}>
                              <Text color="diamond.blue.5" fontSize="14px">
                                {entity}
                              </Text>
                            </Pill>
                            <Text color="diamond.gray.3">
                              Some metadata. 125 views
                            </Text>
                          </Box>
                        ))}
                    </TabPanel>
                    <TabPanel>
                      {tagFuse
                        ?.search(searchValue)
                        .slice(0, 5)
                        .map((i) => i.item)
                        .map((tag: string) => (
                          <Box
                            key={tag}
                            display="flex"
                            justifyContent={"space-between"}
                            p="2px"
                          >
                            <Pill asButton icon={<TagIcon />}>
                              <Text color="diamond.blue.5" fontSize="14px">
                                {tag}
                              </Text>
                            </Pill>
                          </Box>
                        ))}
                    </TabPanel>
                    <TabPanel>
                      {blockFuse
                        ?.search(searchValue)
                        .slice(0, 5)
                        .map((i) => i.item)
                        .map((text: string, idx) => (
                          <Box
                            key={idx}
                            display="flex"
                            justifyContent={"space-between"}
                            p="2px"
                          >
                            <Pill asButton>
                              <Text color="diamond.blue.5" fontSize="14px">
                                {text.slice(0, 15) + "..."}
                              </Text>
                            </Pill>
                          </Box>
                        ))}
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </AnimatedBox>
            )}
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default Explorer;
