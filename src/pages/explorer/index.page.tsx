import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
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
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useSpring, a } from "react-spring";
import Fuse from "fuse.js";
import { filterUniqueObjects } from "@/common/utils";
import { Pill } from "@/components/Pill";
import { TagIcon } from "@/components/Icons/TagIcon";
import { EntitiesIcon } from "@/components/Icons/EntitiesIcon";
import Router from "next/router";
import { bodyText } from "@/theme";

const Explorer: NextPage = () => {
  const { data: notesData } = useQuery(GET_ALL_NOTES);
  const { data: tagAndEntitiesData } = useQuery(GET_TAGS_AND_ENTITIES);
  const [searchValue, setSearchValue] = useState("");
  const [displaySearchBox, setDisplaySearchBox] = useState(false);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
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
    threshold: 0.7,
  });

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
          gridTemplateColumns={["1fr", null, null, "210px 1fr"]}
        >
          <Box
            display={["none", null, null, "flex"]}
            sx={{ columnGap: "50px" }}
          >
            <Box w="100%" maxWidth="210px" zIndex={3}>
              {/* <ExplorerNavigator /> */}
            </Box>
          </Box>
          <Box display="flex" justifyContent="center">
            {!isAdvancedSearch && (
              <Box
                ref={searchBoxRef}
                position={"relative"}
                maxW="716px"
                width="100%"
              >
                <InputGroup
                  bg="white"
                  alignItems={"center"}
                  border="none"
                  borderRadius="5px"
                  height="66px"
                  boxShadow="0px 2px 15px #C3C3C3"
                >
                  <InputLeftElement
                    pl="25px"
                    height="100%"
                    pointerEvents="none"
                  >
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
                    placeholder="Start with a search for any keyword, community name, or user"
                  />
                </InputGroup>
                <Box
                  cursor="pointer"
                  _hover={{ color: "diamond.blue.5" }}
                  color="diamond.link"
                  onClick={() => setIsAdvancedSearch(true)}
                  mt="8px"
                  fontSize="14px"
                  position={"absolute"}
                  right="0"
                >
                  Advanced Search
                </Box>
                {displaySearchBox && (
                  <AnimatedBox
                    style={searchBoxStyle}
                    p="0px"
                    fontSize={bodyText}
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
                    {/* <Tabs px="25px" variant="unstyled">
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
                                  <Text
                                    color="diamond.blue.5"
                                    fontSize={bodyText}
                                  >
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
                                  <Text
                                    color="diamond.blue.5"
                                    fontSize={bodyText}
                                  >
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
                                  <Text
                                    color="diamond.blue.5"
                                    fontSize={bodyText}
                                  >
                                    {text.slice(0, 15) + "..."}
                                  </Text>
                                </Pill>
                              </Box>
                            ))}
                        </TabPanel>
                      </TabPanels>
                    </Tabs> */}
                  </AnimatedBox>
                )}
              </Box>
            )}
            {isAdvancedSearch && (
              <Box
                ref={searchBoxRef}
                position={"relative"}
                maxW="716px"
                width="100%"
              >
                <Box
                  bg="white"
                  p="20px"
                  display="flex"
                  flexWrap={["wrap", null, "unset"]}
                  alignItems={"center"}
                  border="none"
                  borderRadius="5px"
                  h={["200px", "100px", null, "66px"]}
                  color="diamond.gray.4"
                  whiteSpace="nowrap"
                  boxShadow="0px 2px 15px #C3C3C3"
                >
                  <Text mr="8px" fontSize="20px" fontWeight="500">
                    Find all
                  </Text>
                  <Select
                    fontSize="14px"
                    h="42px"
                    w="fit-content"
                    bg="diamond.gray.0"
                    border="1px solid black"
                    borderColor="diamond.gray.1"
                    placeholder="object type"
                  >
                    <option value="wallets">wallets</option>
                  </Select>
                  <Text ml="8px" mr="8px" fontSize="20px" fontWeight="500">
                    that
                  </Text>
                  <Select
                    fontSize="14px"
                    h="42px"
                    w="fit-content"
                    bg="diamond.gray.0"
                    border="1px solid black"
                    borderColor="diamond.gray.1"
                    placeholder="has this relationship"
                  >
                    <option value="is_a_member_of">is a member of</option>
                  </Select>
                  <Box ml="8px" h="42px">
                    <Input placeholder="to this" />
                  </Box>
                </Box>
                <Box
                  fontSize="14px"
                  cursor="pointer"
                  _hover={{ color: "diamond.blue.5" }}
                  color="diamond.link"
                  mt="8px"
                  position={"absolute"}
                  display="flex"
                  alignItems="center"
                  right="0"
                  onClick={() => setIsAdvancedSearch(false)}
                >
                  Return to simple search
                  <Button ml="9px" variant="primary">
                    Search
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default Explorer;
