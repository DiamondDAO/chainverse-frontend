import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { AddBlockModal } from "@/components/AddBlockModal";
import { useAccount } from "wagmi";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_NOTES, GET_TAGS_AND_ENTITIES } from "@/services/Apollo/Queries";
import { filterUniqueObjects } from "@/common/utils";
import { CreateSnapshotIcon } from "@/components/Icons/CreateSnapshotIcon";
import { AddBlockIcon } from "@/components/Icons/AddBlockIcon";
import { WorkspaceNavigator } from "@/components/Workspace/WorkspaceNavigator";
import { Flow } from "@/components/Workspace/Flow";

const Workspace: NextPage = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [date, setDate] = useState("");
  const [getNotes, { data }] = useLazyQuery(GET_NOTES);
  const { data: tagAndEntitiesData } = useQuery(GET_TAGS_AND_ENTITIES);
  const [{ data: walletData }] = useAccount();
  const [rfInstance, setRfInstance] = useState(null);

  useEffect(() => {
    setDate(new Date().toLocaleString());
  }, []);
  useEffect(() => {
    if (walletData?.address) {
      getNotes({ variables: { where: { address: walletData.address } } });
    }
  }, [getNotes, walletData?.address]);

  const nodeData = data?.wallets[0]?.blocks.filter(
    (i) => i.__typename === "Note"
  );

  return (
    <>
      <Layout>
        {/* Graph */}
        <Box
          top="0"
          left="0"
          bottom="0"
          right="0"
          position="absolute"
          zIndex={0}
        >
          {nodeData && <Flow nodeData={nodeData} onInit={setRfInstance} />}
        </Box>
        <Box display="flex" width="100%" flexDir="column">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text
              suppressContentEditableWarning={true}
              contentEditable
              fontWeight="600"
              fontSize="2rem"
              zIndex={1}
            >
              Your Sandbox
            </Text>

            <Text color="diamond.gray.3" zIndex={1}>
              Last updated: {date}
            </Text>
          </Box>
          <Box mt="40px" display="flex" sx={{ columnGap: "50px" }}>
            <Box maxWidth="210px" zIndex={3}>
              <WorkspaceNavigator />
              <Box mt="24px">
                <Button leftIcon={<CreateSnapshotIcon />} variant="primary">
                  Save as workspace
                </Button>
                <Button
                  mt="4px"
                  leftIcon={<AddBlockIcon />}
                  onClick={onOpen}
                  variant="primary"
                >
                  Add block
                </Button>
              </Box>
            </Box>
          </Box>

          <AddBlockModal
            tags={
              filterUniqueObjects(tagAndEntitiesData?.tags, "text")?.map(
                (i) => i.text
              ) || []
            }
            entities={
              filterUniqueObjects(tagAndEntitiesData?.entities, "name")?.map(
                (i) => i.name
              ) || []
            }
            isOpen={isOpen}
            onClose={onClose}
          />
        </Box>
      </Layout>
    </>
  );
};

export default Workspace;
