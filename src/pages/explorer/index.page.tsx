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
import * as styles from './styles';
import { SearchOS } from '@chainverse/os';
import '@chainverse/os/dist/chainverse-os.css';
import { EntityTable } from '@/components/Explorer/EntityTable';
import { BlockTable } from '@/components/Explorer/BlockTable';
import { TagTable } from '@/components/Explorer/TagTable';
import { useAccount } from 'wagmi';
enum SearchTypes {
  Blocks = 'blocks',
  Tags = 'tags',
  Entities = 'entities',
}
const Explorer: NextPage = () => {
  //const { data: notesData } = useQuery(GET_ALL_NOTES);
  //const { data: tagAndEntitiesData } = useQuery(GET_TAGS_AND_ENTITIES);
  const [{ data: walletData }] = useAccount();

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
    const { searchType, entity, tags, blocks } = data;
    setSearchType(searchType);
    setSearchData(data);
  };
  const onChangeTypeSearch = () => {
    
  }

  //@ts-ignore
  const { entity, tags, blocks } = searchData || {};
  const { entityData, getEntityDataHandler, hasMoreEntityData } = entity || {};

  return (
    <>
      <Layout>
        <Box sx={styles.ExplorerTitleContainer}>
          <Text sx={styles.ExplorerTitle}>Explorer</Text>
          <SearchOS
            value="test"
            onChangeType={(e) => console.log(e)}
            onChange={(e) => console.log(e)}
            onEnter={handleOnChangeSearch}
            onFocus={(e) => console.log(e)}
            placeholder="placeholder"
          ></SearchOS>
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
          mt="40px"
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
            {/* {searchType === SearchTypes.Blocks && (
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
            )} */}
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default Explorer;
