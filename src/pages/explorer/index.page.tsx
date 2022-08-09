// import dynamic from 'next/dynamic';
import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next';
import React, {
  Suspense,
  useEffect,
  useState,
} from 'react';
import { Layout } from '@/components/Layout';
import SearchOSClientProvider, {
  SearchOS,
  useSearchOSClient,
} from '@chainverse/os';
import { SearchOSTable } from '@/components/Explorer/SearchOSTable';
import { useAccount } from 'wagmi';

const NodeChartDynamic = React.lazy(
  () => import('../../services/D3/GraphComponent')
);

const ExplorerComponent = () => {
  const { data: dataOS, loading, fetchMore } = useSearchOSClient();
  const [{ data: walletData }] = useAccount();
  const [isMounted, setIsMointed]  = useState(false);
  const [displayGraph, setDisplayGraph]  = useState(false);
  useEffect(() => {
    setIsMointed(true)
  }, []);

  return (
    <>
      <Layout>
        <Box className="flex  ml-12">
          <Box className="flex w-[48%] justify-center items-center space-x-6">
            <span className="text-gray-700 font-bold text-4xl">Explorer</span>
            <SearchOS value="test" placeholder="placeholder"></SearchOS>
          </Box>
        </Box>
        <div className="flex  mt-[20px]">
          <Box className="w-[50%] md:w-[50%]">
            <Box sx={{ columnGap: '50px' }}></Box>
            <Box ml={['unset', null, null, '50px']}>
              <SearchOSTable
                data={dataOS || []}
                walletAddress={walletData?.address}
                hasMore={true}
                update={fetchMore}
                setDisplayGraph={setDisplayGraph}
              />
            </Box>
          </Box>
          <Box className="w-[45%]">
            {isMounted && (
              <Suspense fallback={<div>Loading...</div>}>
                <NodeChartDynamic />
              </Suspense>
            )}
          </Box>
        </div>
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
