import { FC, useRef, useState } from "react";
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
} from "@chakra-ui/react";
import { a, useSpring } from "react-spring";
import * as styles from "./styles";
interface ILinkSource {
  sources: string[];
  onSave: (sources: string[]) => void
}

export const LinkSourceModal: FC<ILinkSource> = ({
  sources,onSave
}) => {
  const AnimatedBox = a(Box);
  const [linkStyle, api] = useSpring(() => {
    opacity: 0;
  });

  const [error, setError] = useState(false);
  const inputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const onHandleSave = () => {
    if (
      sources.length === 0 && validURL(inputRef.current.value)      
    ) {
      sources.push(inputRef.current.value)
      setError(false);
      inputRef.current.value = ""
      onSave([...sources])
      close();
    } else if (
      validURL(inputRef.current.value) &&
      sources.length > 0
    ) {
      sources[0] = inputRef.current.value
      setError(false)
      inputRef.current.value = ""
      onSave([...sources])
      close() 
    } else {
      setError(true);
    }
  }
  const onHandleCancel = () => {
    inputRef.current.value = ""
    close();
  }

  return (
    <AnimatedBox style={linkStyle} sx={styles.Container}>
      <Popover isOpen={isOpen} closeOnBlur={true}>
        <PopoverTrigger>
          <Box sx={styles.TriggerStyle}>
            <Box sx={styles.SourceStyle("")}>
              {sources && (
                <>
                  {sources.map((s, index) => (
                    <Box key={index} sx={styles.SourceStyle(s)}>
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
            sx={styles.URLCancelButton}
            onClick={onHandleCancel}
          >
            Cancel
          </Button>
          <Button
            sx={styles.URLButton}
            onClick={onHandleSave}
          >
            Save link
          </Button>
        </PopoverContent>
      </Popover>
    </AnimatedBox>
  );
};
