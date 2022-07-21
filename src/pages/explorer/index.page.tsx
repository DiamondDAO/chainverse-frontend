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
import { SearchOS, SearchTypes } from '@chainverse/os';
import { EntityTable } from '@/components/Explorer/EntityTable';
import { BlockTable } from '@/components/Explorer/BlockTable';
import { TagTable } from '@/components/Explorer/TagTable';
import {
  removeChainverseOS,
  showChainverseOS,
  isVisibleChainverseOS,
} from './searchHooks';
import { useAccount } from 'wagmi';

declare global {
  interface Window {
    showChainverseOS?: () => void;
    removeChainverseOS?: () => void;
  }
}
if (typeof window !== 'undefined') {
  //here `window` is available
  //@ts-ignore
  window.showChainverseOS = showChainverseOS;
  //@ts-ignore
  window.removeChainverseOS = removeChainverseOS;
}

const Explorer: NextPage = () => {
  const [{ data: walletData }] = useAccount();
  const { data: notesData } = useQuery(GET_ALL_NOTES);
  const { data: tagAndEntitiesData } = useQuery(GET_TAGS_AND_ENTITIES);

  const [searchValue, setSearchValue] = useState('');
  const [displaySearchBox, setDisplaySearchBox] = useState(false);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [searchType, setSearchType] = useState<SearchTypes | undefined>();
  const [searchData, setSearchData] = useState({});

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

  // handlers
  const handleOnChangeSearch = (data: any) => {
    const { searchType } = data;
    setSearchType(searchType);
    setSearchData(data);
  };
  const onChangeTypeSearch = (data: any) => {
    const { searchType } = data;
    setSearchType(searchType);
  };

  //@ts-ignore
  const { entity, tags: tagsResult, blocks: blocksResult } = searchData || {};
  const { entityData, getEntityDataHandler, hasMoreEntityData } = entity || {};
  const { nodeData, getnodeDataHandler, hasMorenodeData } = blocksResult || {};
  const { tagData, getTagDataHandler, hasMoreTagData } = tagsResult || {};
  const isVisibleOS = isVisibleChainverseOS();

  return (
    <>
      <Layout>
        <Box sx={styles.ExplorerTitleContainer}>
          <Text sx={styles.ExplorerTitle}>Explorer</Text>
        </Box>
        <Box sx={styles.ExplorerBody}>
          <Box sx={styles.ExplorerNavigatorContainer}>
            <Box sx={styles.ExplorerNavigatorInner}>
              {/* <ExplorerNavigator /> */}
            </Box>
          </Box>
          <Box sx={styles.SearchStyle}>
            {isVisibleOS && (
              <SearchOS
                value="test"
                onChangeType={onChangeTypeSearch}
                onChange={(e) => console.log(e)}
                onEnter={handleOnChangeSearch}
                onFocus={(e) => console.log(e)}
                placeholder="placeholder"
              ></SearchOS>
            )}
            {!isAdvancedSearch && !isVisibleOS && (
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
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns={['1fr', null, null, '1fr']}
        >
          <Box sx={{ columnGap: '50px' }}></Box>
          <Box ml={['unset', null, null, '50px']}>
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

export default Explorer;
