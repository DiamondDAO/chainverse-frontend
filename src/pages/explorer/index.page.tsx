import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Layout } from '@/components/Layout';
import { useQuery } from '@apollo/client';
import {
  GET_ALL_NOTES,
  GET_TAGS_AND_ENTITIES,
} from '@/services/Apollo/Queries';
import { SearchIcon } from '@chakra-ui/icons';
import { useSpring, a } from 'react-spring';
import Fuse from 'fuse.js';
import { filterUniqueObjects } from '@/common/utils';
import Router from 'next/router';
import { bodyText } from '@/theme';
import * as styles from './styles';
import { Explorer as Test } from '@chainverse/os';

const Explorer: NextPage = () => {
  const { data: notesData } = useQuery(GET_ALL_NOTES);
  const { data: tagAndEntitiesData } = useQuery(GET_TAGS_AND_ENTITIES);

  const [searchValue, setSearchValue] = useState('');
  const [displaySearchBox, setDisplaySearchBox] = useState(false);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);

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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchBoxRef]);

  const tags = useMemo(
    () =>
      filterUniqueObjects(tagAndEntitiesData?.tags, 'tag')?.map((i) => i.tag) ||
      [],
    [tagAndEntitiesData?.tags]
  );

  const entities = useMemo(
    () =>
      filterUniqueObjects(tagAndEntitiesData?.entities, 'name')?.map(
        (i) => i.name
      ) || [],
    [tagAndEntitiesData?.entities]
  );
  const blocks = useMemo(
    () =>
      filterUniqueObjects(notesData?.notes, 'text')?.map((i) => i.text) || [],
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

  // animations
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

  return (
    <>
      <Layout>
        <Box sx={styles.ExplorerTitleContainer}>
          <Text sx={styles.ExplorerTitle}>Explorer</Text>
          <Test
            value="test"
            onchange={(e) => console.log(e)}
            onKeyPress={(e) => console.log(e)}
            onFocus={(e) => console.log(e)}
            placeholder="placeholder"
          ></Test>
        </Box>
        <Box sx={styles.ExplorerBody}>
          <Box sx={styles.ExplorerNavigatorContainer}>
            <Box sx={styles.ExplorerNavigatorInner}>
              {/* <ExplorerNavigator /> */}
            </Box>
          </Box>
          <Box sx={styles.SearchStyle}>
            {!isAdvancedSearch && (
              <Box ref={searchBoxRef} sx={styles.SearchContainer}>
                <InputGroup sx={styles.SearchInputGroup}>
                  <InputLeftElement sx={styles.SearchLeftElement}>
                    <SearchIcon w="12px" />
                  </InputLeftElement>
                  <Input
                    sx={styles.SearchBoxStyle}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter')
                        Router.push(`/explorer/search?term=${searchValue}`);
                    }}
                    onFocus={() => setDisplaySearchBox(true)}
                    placeholder="Start with a search for any keyword, community name, or user"
                  />
                </InputGroup>
                <Box
                  onClick={() => setIsAdvancedSearch(true)}
                  sx={styles.AdvanceSearchLink}
                >
                  Advanced Search
                </Box>
                {displaySearchBox && (
                  <AnimatedBox style={searchBoxStyle} sx={styles.SearchResult}>
                    <Box
                      sx={styles.SearchResultText}
                      onClick={() =>
                        Router.push(`/explorer/search?term=${searchValue}`)
                      }
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
              <Box ref={searchBoxRef} sx={styles.SearchContainer}>
                <Box sx={styles.AdvancedSearchBody}>
                  <Text sx={styles.AdvanceSearchText}>Find all</Text>
                  <Select
                    placeholder={'object type'}
                    sx={styles.AdvancedSearchSelect}
                  >
                    <option value="wallets">wallets</option>
                  </Select>
                  <Text sx={styles.AdvancedSearchThat}>that</Text>
                  <Select
                    sx={styles.AdvancedSearchSelect}
                    placeholder="has this relationship"
                  >
                    <option value="is_a_member_of">is a member of</option>
                  </Select>
                  <Box sx={styles.AdvanceSearchToThisWrapper}>
                    <Input
                      sx={{
                        ...styles.AdvancedSearchSelect,
                        ...styles.AdvanceSearchToThis,
                      }}
                      placeholder="to this"
                    />
                  </Box>
                </Box>
                <Box
                  sx={styles.AdvanceSearchLink}
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
