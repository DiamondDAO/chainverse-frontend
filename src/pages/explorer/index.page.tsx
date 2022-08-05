import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next';
import React from 'react';
import { Layout } from '@/components/Layout';
import * as styles from './styles';
import SearchOSClientProvider, {
  SearchOS,
  useSearchOSClient,
} from '@chainverse/os';
import { SearchOSTable } from '@/components/Explorer/SearchOSTable';
import { useAccount } from 'wagmi';

const ExplorerComponent = () => {
  const { data: dataOS, loading, fetchMore } = useSearchOSClient();
  const [{ data: walletData }] = useAccount();

  return (
    <>
      <Layout>
        <Box className="flex  ml-12">
          <Box className="flex w-[48%] justify-center items-center space-x-6">
            <span className="text-gray-700 font-bold text-4xl">Explorer</span>
            <SearchOS value="test" placeholder="placeholder"></SearchOS>
          </Box>
        </Box>
        <Box className="w-[50%] mt-[20px]">
          <Box sx={{ columnGap: '50px' }}></Box>
          <Box ml={['unset', null, null, '50px']}>
            <SearchOSTable
              data={dataOS || []}
              walletAddress={walletData?.address}
              hasMore={true}
              update={fetchMore}
            />
          </Box>
        </Box>
      </Layout>
    </>
  );
};

const Explorer: NextPage = () => {
  return (
    <>
      <SearchOSClientProvider backendURI="/api/graphql">
        <ExplorerComponent />
      </SearchOSClientProvider>
    </>
  );
};
export default Explorer;
