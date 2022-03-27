import { validURL } from "@/common/utils";
import {
  Box,
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { FC, useEffect, useRef, useState } from "react";
import { FiLink } from "react-icons/fi";
import { a, useSpring } from "react-spring";

interface ILinkSource {
  textAreaValue: string;
  source: string;
  setSource: (value: string) => void;
}

export const LinkSourceModal: FC<ILinkSource> = ({
  textAreaValue,
  source,
  setSource,
}) => {
  const AnimatedBox = a(Box);
  const [linkStyle, api] = useSpring(() => {
    opacity: 0;
  });
  useEffect(() => {
    if (textAreaValue) {
      api.start({ opacity: 1 });
    } else {
      api.start({ opacity: 0 });
    }
  }, [api, textAreaValue]);

  const [error, setError] = useState(false);
  const inputRef = useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (inputRef !== null) {
      inputRef.current.value = source;
    }
  }, [inputRef, source]);
  return (
    <AnimatedBox
      display={textAreaValue ? "flex" : "none"}
      style={linkStyle}
      alignItems="center"
    >
      <Popover isOpen={isOpen} placement="bottom-start">
        <PopoverTrigger>
          <Box display="flex" alignItems="center">
            <FiLink color="#CECECE" />
            <Box
              cursor={"pointer"}
              pl="3px"
              border="none"
              width="100%"
              color={source ? "diamond.blue.5" : "diamond.gray.2"}
              height="max-content"
              _focus={{ border: "none" }}
              fontSize=".875rem"
            >
              <Box as="span" onClick={open}>
                {source ? "Source:" : "Link a source"}
              </Box>
              {source && (
                <>
                  {" "}
                  <Tooltip label={source} fontSize="xs">
                    <span
                      //@ts-ignore
                      rel="noopener noreferrer"
                      style={{ textDecoration: "underline" }}
                      onClick={() => window.open(source, "_blank")}
                    >
                      Link
                    </span>
                  </Tooltip>
                </>
              )}
            </Box>
          </Box>
        </PopoverTrigger>
        <PopoverContent
          border="1px solid #C3C3C3"
          borderRadius={"5px"}
          boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.25)"}
          width="273px"
          height="84px"
          p="12px"
        >
          <Text
            color={error ? "red" : "black"}
            fontSize="10px"
            lineHeight="12px"
            fontWeight="500"
          >
            {error ? "Error: Please enter a valid URL and try again." : "URL"}
          </Text>
          <Input
            ref={inputRef}
            mt="2px"
            borderRadius="2px"
            fontSize="10px"
            height="30px"
            px="10px"
            borderColor={error ? "red" : "black"}
          />
          <Button
            mt="3px"
            alignSelf={"end"}
            fontSize="10px"
            lineHeight="125%"
            color="diamond.link"
            variant="link"
            fontWeight="400"
            onClick={() => {
              if (
                inputRef.current.value == "" ||
                validURL(inputRef.current.value)
              ) {
                setSource(inputRef.current.value);
                setError(false);
                close();
              } else {
                setError(true);
              }
            }}
          >
            Save link
          </Button>
        </PopoverContent>
      </Popover>
    </AnimatedBox>
  );
};
