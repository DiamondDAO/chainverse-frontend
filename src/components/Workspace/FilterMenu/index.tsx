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
import React, { FC, useState } from "react";
import Fuse from "fuse.js";
import { Pill } from "@/components/Pill";
import { TagIcon } from "@/components/Icons/TagIcon";
import { EntitiesIcon } from "@/components/Icons/EntitiesIcon";
import { bodyText, subText } from "@/theme";
import * as styles from "./styles";

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
  const [filteredItem, setFilteredItem] = filteredItemState;
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        sx={styles.MenuButton(filteredItem.length > 0)}
      >
        Filter by {type}{" "}
        {filteredItem.length > 0 ? `(${filteredItem.length})` : ""}
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
            <Text mt="4px" color="diamond.gray.3" fontSize={subText}>
              ADDED
            </Text>
            <Box sx={styles.SelectItemsStyle}>
              {filteredItem.map((fuseItem: string) => (
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
                  <Text color="diamond.blue.5" fontSize={bodyText}>
                    {fuseItem}
                  </Text>
                </Pill>
              ))}
            </Box>
            <Text mt="4px" color="diamond.gray.3" fontSize={subText}>
              {typeObjectInstance.text}
            </Text>
            <Box sx={styles.SelectItemsStyle}>
              {data &&
                fuseSearch
                  ?.search(searchInput ?? "")
                  .map((i) => i.item)
                  .slice(0, 10)
                  .filter((i) => !filteredItem.includes(i))
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
                      <Text color="diamond.blue.5" fontSize={bodyText}>
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
