import { Box, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { AddBlockButton } from "@/components/Buttons/AddBlockButton";
import { CreateSnapshotButton } from "@/components/Buttons/CreateSnapshotButton";
import { AddBlockModal } from "@/components/AddBlockModal";
import { useAccount } from "wagmi";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_NOTES, GET_TAGS_AND_ENTITIES } from "@/services/Apollo/Queries";
import reactStringReplace from "react-string-replace";
import { Pill } from "@/components/Pill";
import { TagIcon } from "@/components/Icons/TagIcon";
import { EntitiesIcon } from "@/components/Icons/EntitiesIcon";
import { BlockIcon } from "@/components/Icons/BlockIcon";
import { filterUniqueObjects } from "@/common/utils";

const Workspace: NextPage = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

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

  return (
    <Layout graphBg>
      <Box display="flex" width="100%" flexDir="column">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Text fontWeight="600" fontSize="2rem">
            Your Workspace
          </Text>
          <Box
            position={["unset", null, null, "absolute"]}
            display="flex"
            sx={{ columnGap: "8px" }}
            right="12px"
          >
            <AddBlockButton onClick={onOpen} />
            <CreateSnapshotButton />
          </Box>
        </Box>
        {data?.wallets[0].blocks
          .filter((i) => i.__typename === "Note")
          .map((i, idx) => {
            return (
              <Box
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
                        <Pill sx={{ p: 0 }} icon={<TagIcon />} key={i + match}>
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
          })}
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
  );
};

export default Workspace;
