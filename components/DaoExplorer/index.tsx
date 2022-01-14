import {
  Badge,
  Box,
  Grid,
  Heading,
  HStack,
  Text,
  Image,
  Tooltip,
  IconButton,
  Textarea,
  Link,
} from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { borderStyles, scrollStyles } from "../../common/theme";

import { InspectorCard } from "./Card";
import {
  RiDiscordFill,
  RiTwitterFill,
  RiExternalLinkFill,
  RiGovernmentFill,
  RiBook2Fill,
} from "react-icons/ri";
import { DAOData, InvestableAssets, Socials } from "../../common/types";
import { capitalize } from "lodash";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";

interface IInspector {
  title: string;
  data: DAOData[];
  height?: string;
}

export const DAOExplorer: FC<IInspector> = ({ title, data, height }) => {
  // index for now, we can use id once data API is finalized
  const [selected, setSelected] = useState(0);

  const [selectedData, setSelectedData] = useState<DAOData>({} as DAOData);
  const [editedSelectedData, setEditedSelectedData] = useState<DAOData>(
    {} as DAOData
  );
  useEffect(() => {
    setSelectedData(data[selected]);
    setEditedSelectedData(data[selected]);
  }, [selected, data]);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditingData = (data: Partial<DAOData>) => {
    setEditedSelectedData({ ...editedSelectedData, ...data });
  };

  const submitEditData = () => {
    setSelectedData(editedSelectedData);
    data[selected] = editedSelectedData;
  };

  const socialIcon = (social: Socials) => {
    switch (social) {
      case Socials.Twitter:
        return <RiTwitterFill size="1.1rem" />;
      case Socials.Discord:
        return <RiDiscordFill size="1.1rem" />;
      case Socials.DaoHAUS:
      case Socials.Snapshot:
        return <RiGovernmentFill size="1.1em" />;
      case Socials.Documentation:
        return <RiBook2Fill size="1.1em" />;
      case Socials.Website:
      default:
        return <RiExternalLinkFill size="1.1rem" />;
    }
  };

  const badgeGenerator = (badgeItems: string[]) => {
    if (badgeItems?.length > 3) {
      const [itemOne, itemTwo, ...rest] = badgeItems;

      return (
        <>
          <Badge color="diamond.gray.4">{itemOne}</Badge>
          <Badge color="diamond.gray.4">{itemTwo}</Badge>
          <Tooltip
            hasArrow
            label={rest.join(", ").toUpperCase()}
            bg="diamond.gray.1"
            color="black"
          >
            <Badge color="diamond.gray.4">{`+${rest.length} MORE`}</Badge>
          </Tooltip>
        </>
      );
    } else {
      return badgeItems?.map((badgeItem, idx) => {
        return (
          <Badge key={idx} color="diamond.gray.4">
            {badgeItem}
          </Badge>
        );
      });
    }
  };

  const assetsGenerator = (assets: InvestableAssets) => {
    return assets?.map((asset, idx) => (
      <Badge key={idx} bg="diamond.blue.2" color="diamond.gray.4">
        {asset.type}
      </Badge>
    ));
  };

  return (
    <Box gridColumn="span 3" {...borderStyles} width="100%">
      <Box bg="diamond.blue.0" width="100%">
        <Box
          fontSize="sm"
          display="flex"
          width="100%"
          px="17px"
          pt="12px"
          pb="14px"
        >
          <Text fontWeight="bold" flexGrow="1">
            {title}
          </Text>
        </Box>
      </Box>
      <Grid templateColumns="1fr 2fr" height={height}>
        <Box
          borderTop="1px solid"
          borderRight="1px solid"
          borderColor="diamond.gray.2"
          sx={{ ...scrollStyles, overflow: "unset", overflowY: "scroll" }}
        >
          {data.map((item, idx) => {
            return (
              <Box key={idx} onClick={() => setSelected(idx)} cursor="pointer">
                <InspectorCard
                  title={item.name}
                  info={[
                    { key: "Members", value: String(item.members) },
                    {
                      key: "Community Type",
                      value: (
                        <HStack>
                          {item.type.map((i, idx) => (
                            <Badge key={idx} bg="diamond.gray.2">
                              {i}
                            </Badge>
                          ))}
                        </HStack>
                      ),
                    },
                    {
                      key: "Summoned",
                      value: item.summoned,
                    },
                  ]}
                  selected={idx == selected}
                />
              </Box>
            );
          })}
        </Box>

        <Box sx={{ ...scrollStyles, overflow: "unset", overflowY: "scroll" }}>
          {selectedData && (
            <Box p="20px">
              <Box
                display="flex"
                justifyContent="space-between"
                alignContent="space-between"
              >
                <Box
                  display="flex"
                  flexDir="column"
                  justifyContent="space-between"
                >
                  <Heading fontSize="3xl">{selectedData.name}</Heading>
                  <HStack>
                    {selectedData.social?.map((item, idx) => {
                      return (
                        <Box key={idx} as={Link} href={item.link}>
                          <Tooltip
                            placement="top"
                            label={capitalize(item.type)}
                            hasArrow
                          >
                            <span>{socialIcon(item.type)}</span>
                          </Tooltip>
                        </Box>
                      );
                    })}
                  </HStack>
                </Box>
                <Image
                  width="66px"
                  height="66px"
                  sx={{ objectFit: "cover" }}
                  src={selectedData.image ?? "./img/logo-black.png"}
                />
              </Box>
              <Box position="relative" mt="20px" {...borderStyles} p="35px">
                <Box position="absolute" top={1} right={1.5}>
                  <IconButton
                    onClick={
                      isEditing
                        ? () => {
                            setIsEditing(false);
                            submitEditData();
                          }
                        : () => {
                            setIsEditing(true);
                          }
                    }
                    aria-label="edit"
                    size="xs"
                    icon={
                      isEditing ? (
                        <CheckIcon color="diamond.blue.3" />
                      ) : (
                        <EditIcon />
                      )
                    }
                  />
                </Box>
                <Grid gridTemplateColumns="1.5fr 2fr" columnGap="50px">
                  <Grid gridTemplateColumns="1fr 1fr" gap="20px">
                    <>
                      <Text>Date Summoned</Text>
                      <Text color="diamond.gray.4">
                        {selectedData.summoned}
                      </Text>
                    </>
                    <>
                      <Text>Members</Text>
                      <Text color="diamond.gray.4">{selectedData.members}</Text>
                    </>
                    <>
                      <Text>Network</Text>
                      <Text color="diamond.gray.4">{selectedData.network}</Text>
                    </>
                    <>
                      <Text>Impact Areas</Text>
                      <Box
                        display="flex"
                        flexWrap="wrap"
                        alignItems={"flex-start"}
                        sx={{ mt: "5px", gap: "10px" }}
                      >
                        {badgeGenerator(selectedData.impactAreas)}
                      </Box>
                    </>
                    <>
                      <Text>Types</Text>
                      <Box
                        display="flex"
                        flexWrap="wrap"
                        alignItems={"flex-start"}
                        sx={{ mt: "5px", gap: "10px" }}
                      >
                        {badgeGenerator(selectedData.type)}
                      </Box>
                    </>
                  </Grid>
                  <Grid gridTemplateColumns="1fr 2fr" gap="10px">
                    <>
                      <Text>Description</Text>
                      {!isEditing && (
                        <Box fontSize="sm" color="diamond.gray.4">
                          {selectedData.description}
                        </Box>
                      )}
                      {isEditing && (
                        <Textarea
                          value={editedSelectedData.description}
                          onChange={(e) =>
                            handleEditingData({ description: e.target.value })
                          }
                        />
                      )}
                    </>
                    <>
                      <Text>How To Become a Member</Text>
                      <Box
                        color="diamond.gray.4"
                        display="flex"
                        flexWrap="wrap"
                        height="max-content"
                        sx={{ gap: "10px" }}
                      >
                        {!isEditing && (
                          <Box fontSize="sm" color="diamond.gray.4">
                            {selectedData.memberRequirements}
                          </Box>
                        )}
                        {isEditing && (
                          <Textarea
                            value={editedSelectedData.memberRequirements}
                            onChange={(e) =>
                              handleEditingData({
                                memberRequirements: e.target.value,
                              })
                            }
                          />
                        )}
                      </Box>
                    </>
                    <>
                      <Text>Success Stories</Text>
                      <Box
                        color="diamond.gray.4"
                        display="flex"
                        flexWrap="wrap"
                        height="max-content"
                        sx={{ gap: "10px" }}
                      >
                        {!isEditing && (
                          <Box fontSize="sm" color="diamond.gray.4">
                            {selectedData.successStories}
                          </Box>
                        )}
                        {isEditing && (
                          <Textarea
                            value={editedSelectedData.successStories}
                            onChange={(e) =>
                              handleEditingData({
                                successStories: e.target.value,
                              })
                            }
                          />
                        )}{" "}
                      </Box>
                    </>
                    <>
                      <Text>Investable Assets</Text>
                      <Box
                        display="flex"
                        flexWrap="wrap"
                        alignItems={"flex-start"}
                        sx={{ mt: "5px", gap: "10px" }}
                      >
                        {assetsGenerator(selectedData.investableAssets)}
                      </Box>
                    </>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
          {!selectedData && (
            <Box
              p="20px"
              width={"100%"}
              display="flex"
              justifyContent="center"
              flexDir="column"
              alignItems={"center"}
            >
              <Text>No DAOs found.</Text>
              <Text>Please try and search a different query.</Text>
            </Box>
          )}
        </Box>
      </Grid>
    </Box>
  );
};
