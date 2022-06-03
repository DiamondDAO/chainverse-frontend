import { validURL } from "@/common/utils";
import { subText } from "@/theme";
import {
  Box,
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  Tooltip,
} from "@chakra-ui/react";import React, { FC, useEffect, useRef, useState } from "react";
import { FiLink } from "react-icons/fi";
import { a, useSpring } from "react-spring";
import * as styles from "./styles";
interface ILinkSource {
  source: string[];
  setSource: (value: string) => void;
}

export const LinkSourceModal: FC<ILinkSource> = ({
  source,
  setSource,
}) => {
  const AnimatedBox = a(Box);
  const [linkStyle, api] = useSpring(() => {
    opacity: 0;
  });

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
    <AnimatedBox style={linkStyle} sx={styles.Container}>
      <Popover isOpen={isOpen} closeOnBlur={true}>
        <PopoverTrigger>
          <Box sx={styles.TriggerStyle}>
            <FiLink color="#CECECE" />
            <Box sx={styles.SourceStyle(source)}>
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
        <PopoverContent sx={styles.PopoverContent}>
          <Text sx={styles.URLText(error)}>
            {error ? "Error: Please enter a valid URL and try again." : "URL"}
          </Text>
          <Input ref={inputRef} sx={styles.URLInput(error)} />
          <Button
            sx={styles.URLButton}
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
