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
  FormControl,FormLabel,FormErrorMessage,FormHelperText,
  Select,
} from "@chakra-ui/react";import React, { FC, useEffect, useRef, useState } from "react";
import { FiLink } from "react-icons/fi";
import { a, useSpring } from "react-spring";
import * as styles from "./styles";
interface ILinkSource {
  sources: string[];
}

export const LinkSourceModal: FC<ILinkSource> = ({
  sources,
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
      inputRef.current.value = sources;
    }
  }, [inputRef, sources]);

  return (
    <AnimatedBox style={linkStyle} sx={styles.Container}>
      <Popover isOpen={isOpen} closeOnBlur={true}>
        <PopoverTrigger>
          <Box sx={styles.TriggerStyle}>
            <Box sx={styles.SourceStyle("")}>
              {sources && (
                <>
                  {sources.map((s) => (
                    <Box sx={styles.SourceStyle(s)}>
                      <Tooltip label={s} fontSize="xs">
                        <span
                          //@ts-ignore
                          rel="noopener noreferrer"
                          style={{ textDecoration: "underline" }}
                          onClick={() => window.open(s, "_blank")}
                        >
                          {s}
                        </span>
                      </Tooltip>
                    </Box>
                  ))}
                </>
              )}
              <Box as="span" onClick={open}>
                {sources.length > 0 ? "Link another source" : "Link a source"}
              </Box>
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
                sources.push(inputRef.current.value)
                setError(false);
                inputRef.current.value = ""
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
