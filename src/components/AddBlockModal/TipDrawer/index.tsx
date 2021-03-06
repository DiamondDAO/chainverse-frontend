import AccountIcon from "@/components/Icons/AccountIcon";
import { EntitiesIcon } from "@/components/Icons/EntitiesIcon";
import { TagIcon } from "@/components/Icons/TagIcon";
import { Pill } from "@/components/Pill";
import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React, { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { a, useSpring } from "react-spring";
interface ITipDrawer {
  clickedTip: boolean;
  setClickedTip: (clicked: boolean) => void;
}

export const TipDrawer: FC<ITipDrawer> = ({ clickedTip, setClickedTip }) => {
  const isLargerThan736 = useMediaQuery({ query: "(min-height: 736px)" });
  const AnimatedBox = a(Box);
  const style = useSpring({
    transform: clickedTip ? `translate(-50%,-250px)` : `translate(-50%,1px)`,
  });
  return (
    <AnimatedBox
      display={isLargerThan736 ? "block" : "none"}
      position="fixed"
      zIndex={1400}
      left="50%"
      bottom={"-250px"}
      width={["90vw", null, "600px"]}
      height="300px"
      bg="diamond.white"
      border="1px solid #9B9B9B"
      borderRadius="5px"
      p="24px"
      style={style}
      sx={{
        overflow: clickedTip ? "scroll" : "hidden",
      }}
    >
      <Text
        fontSize="18px"
        fontWeight="500"
        onClick={() => setClickedTip(!clickedTip)}
        cursor="pointer"
      >
        💡 Tips for creating a block:
      </Text>
      <UnorderedList mt="20px" fontSize="14px">
        <ListItem>
          A block can stand alone, but when several blocks are linked together,
          they create a narrative and provide context on the entities the block
          is associated with.
        </ListItem>
        <ListItem>Type # to insert an association to a</ListItem>
        <ListItem listStyleType="none">
          <UnorderedList>
            <ListItem>
              <Pill icon={<EntitiesIcon />}>entities</Pill>
              (nodes) represent people, places, and things. They contain little
              to no actionable knowledge on their own, and require relationships
              to link them to other entities.
            </ListItem>
            <ListItem>
              <Pill icon={<TagIcon />}>tags</Pill>
              are any categorically significant piece of information that could
              be used to link multiple entities
            </ListItem>
            <ListItem>
              <Pill icon={<AccountIcon />}>users</Pill>
              are other community members engaging with this information
            </ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem>
          Curators bring value to entities by providing contextual information
          and meaning in the form of a {"block"}.
        </ListItem>
      </UnorderedList>
    </AnimatedBox>
  );
};
