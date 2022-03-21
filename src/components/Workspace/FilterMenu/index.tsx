import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Input,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuGroup,
  MenuList,
} from "@chakra-ui/react";
import React, { FC, useRef, useState } from "react";
import Fuse from "fuse.js";
import { Pill } from "@/components/Pill";
import { TagIcon } from "@/components/Icons/TagIcon";
import { EntitiesIcon } from "@/components/Icons/EntitiesIcon";
type IFilterMenu = {
  data: string[];
  type: FilterTypes;
  filteredItemState: [string[], React.Dispatch<React.SetStateAction<string[]>>];
};
export enum FilterTypes {
  Tags = "Tags",
  Entities = "Entities",
}

const typeObject = (type: FilterTypes) => {
  switch (type) {
    case FilterTypes.Tags:
      return {
        icon: <TagIcon />,
        text: "TAGS",
      };
    case FilterTypes.Entities:
    default:
      return {
        icon: <EntitiesIcon />,
        text: "ENTITIES",
      };
  }
};

export const FilterMenu: FC<IFilterMenu> = ({
  data,
  type,
  filteredItemState,
}) => {
  const fuseSearch = new Fuse(data, {
    includeScore: false,
    threshold: 0.3,
  });
  const [searchInput, setSearchInput] = useState("");
  const typeObjectInstance = typeObject(type);
  const [filiteredItem, setFilteredItem] = filteredItemState;
  return (
    <Menu>
      <MenuButton
        bg="diamond.white"
        border="0.5px solid black"
        borderColor="diamond.gray.3"
        color="diamond.gray.4"
        borderRadius="3px"
        padding="2px 4px"
        fontSize="12px"
        height="20px"
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        Filter by {type}
      </MenuButton>
      <MenuList>
        <MenuGroup>
          <Box px="8px">
            <Input
              size="xs"
              placeholder="Type to filter"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
            <Text mt="4px" color="diamond.gray.3" fontSize="10px">
              ADDED
            </Text>
            <Box
              display="flex"
              flexWrap={"wrap"}
              maxW="fit-content"
              sx={{ rowGap: "4px", columnGap: "4px" }}
            >
              {filiteredItem.map((fuseItem: string) => (
                <Pill
                  asButton
                  key={fuseItem}
                  icon={typeObjectInstance.icon}
                  onClick={() => {
                    setFilteredItem((p) =>
                      p.filter((item) => item !== fuseItem)
                    );
                  }}
                >
                  <Text color="diamond.blue.5" fontSize="14px">
                    {fuseItem}
                  </Text>
                </Pill>
              ))}
            </Box>
            <Text mt="4px" color="diamond.gray.3" fontSize="10px">
              {typeObjectInstance.text}
            </Text>
            <Box
              display="flex"
              flexWrap={"wrap"}
              maxW="fit-content"
              sx={{ rowGap: "4px", columnGap: "4px" }}
            >
              {data &&
                fuseSearch
                  ?.search(searchInput ?? "")
                  .map((i) => i.item)
                  .filter((i) => !filiteredItem.includes(i))
                  .map((fuseItem: string) => (
                    <Pill
                      key={fuseItem}
                      asButton
                      onClick={() => {
                        setFilteredItem((p) => [...p, fuseItem]);
                        setSearchInput("");
                      }}
                      icon={typeObjectInstance.icon}
                    >
                      <Text color="diamond.blue.5" fontSize="14px">
                        {fuseItem}
                      </Text>
                    </Pill>
                  ))}
            </Box>
          </Box>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};
