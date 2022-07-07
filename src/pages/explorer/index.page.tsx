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
import { SearchIcon } from '@chakra-ui/icons';
import { useSpring, a } from 'react-spring';
import Router from 'next/router';
import * as styles from './styles';
import { SearchOS, SearchTypes } from '@chainverse/os';
import { EntityTable } from '@/components/Explorer/EntityTable';
import { BlockTable } from '@/components/Explorer/BlockTable';
import { TagTable } from '@/components/Explorer/TagTable';
import { useAccount } from 'wagmi';

const Explorer: NextPage = () => {
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
    const { searchType } = data;
    setSearchType(searchType);
    setSearchData(data);
  };
  const onChangeTypeSearch = (data: any) => {
    const { searchType } = data;
    setSearchType(searchType);
  };

  //@ts-ignore
  const { entity, tags, blocks } = searchData || {};
  const { entityData, getEntityDataHandler, hasMoreEntityData } = entity || {};
  const { nodeData, getnodeDataHandler, hasMorenodeData } = blocks || {};
  const { tagData, getTagDataHandler, hasMoreTagData } = tags || {};

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
            <Box ref={searchBoxRef} sx={styles.SearchContainer}>
              <SearchOS
                value="test"
                onChangeType={onChangeTypeSearch}
                onChange={(e) => console.log(e)}
                onEnter={handleOnChangeSearch}
                onFocus={(e) => console.log(e)}
                placeholder="placeholder"
              ></SearchOS>
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
