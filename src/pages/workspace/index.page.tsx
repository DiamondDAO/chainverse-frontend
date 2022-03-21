import { Box, Button, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useEffect, useMemo, useState } from "react";
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
  useEffect(() => {
    setDate(new Date().toLocaleString());
  }, []);
  const [getNotes, { data }] = useLazyQuery(GET_NOTES);
  const {
    loading,
    error,
    data: tagAndEntitiesData,
  } = useQuery(GET_TAGS_AND_ENTITIES);
  const [{ data: walletData }] = useAccount();
  useEffect(() => {
    if (walletData?.address) {
      getNotes({ variables: { where: { address: walletData.address } } });
    }
  }, [getNotes, walletData?.address]);

  const nodeData = data?.wallets[0].blocks.filter(
    (i) => i.__typename === "Note"
  );
  const [rfInstance, setRfInstance] = useState(null);

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

            {/* {data?.wallets[0].blocks
              .filter((i) => i.__typename === "Note")
              .map((i, idx) => {
                return (
                  <Box
                    cursor={"pointer"}
                    p="8px"
                    fontSize="12px"
                    width="202px"
                    borderRadius="2px"
                    minH="76px"
                    border="1px solid #000000"
                    key={idx}
                    bg="rgba(0, 0, 0, 0.05)"
                    display="grid"
                    gridTemplateColumns="1fr 5fr"
                    m="10px"
                  >
                    <Box>
                      <BlockIcon />
                    </Box>
                    <Box>
                      {reactStringReplace(
                        reactStringReplace(
                          i.text,
                          /#(?=\S*[-]*)([a-zA-Z-]+)/g,
                          (match, i) => (
                            <Pill
                              sx={{ p: 0 }}
                              icon={<TagIcon />}
                              key={i + match}
                            >
                              {match}
                            </Pill>
                          )
                        ),
                        /@(?=\S*[-]*)([a-zA-Z-]+)/g,
                        (match, i) => (
                          <Pill icon={<EntitiesIcon />} key={i + match}>
                            {match}
                          </Pill>
                        )
                      )}
                    </Box>
                  </Box>
                );
              })} */}
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
