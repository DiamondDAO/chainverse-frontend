import * as React from "react";
import { debounce } from "lodash";

interface IMediaBreakpoints {
  ref: React.RefCallback<HTMLDivElement>;
  mediaBreakpoints: BreakpointBooleans;
}

export type BreakpointBooleans = {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
};

const baseBreakpointBooleans = {
  xs: false,
  sm: false,
  md: false,
  lg: false,
};

export function useMediaBreakpoints({
  sm,
  md,
  lg,
}: {
  sm: number;
  md: number;
  lg: number;
}): IMediaBreakpoints {
  const [mediaBreakpoints, setMediaBreakpoints] =
    React.useState<BreakpointBooleans>({
      xs: false,
      sm: false,
      md: false,
      lg: false,
    });
  const nodeRef = React.useRef();
  const listenerRef = React.useRef<(this: Window, ev: UIEvent) => any>();

  const setRef = React.useCallback((node) => {
    // Need to save event handler with useRef to safely assign and remove
    // event listeners
    // https://github.com/facebook/react/issues/15176
    if (listenerRef?.current) {
      window.removeEventListener("resize", listenerRef.current);
      listenerRef.current = undefined;
    }

    if (node) {
      const checkContainerWidth = () => {
        const { width } = node.getBoundingClientRect();
        if (width < sm) {
          setMediaBreakpoints({ ...baseBreakpointBooleans, xs: true });
        } else if (width >= sm && width < md) {
          setMediaBreakpoints({ ...baseBreakpointBooleans, sm: true });
        } else if (width >= md && width < lg) {
          setMediaBreakpoints({ ...baseBreakpointBooleans, md: true });
        } else if (width >= lg) {
          setMediaBreakpoints({ ...baseBreakpointBooleans, lg: true });
        } else {
          throw new Error("width is not apart of defined breakpoints");
        }
      };

      const debouncedResize = debounce(checkContainerWidth, 200);
      listenerRef.current = debouncedResize;
      checkContainerWidth();
      window.addEventListener("resize", listenerRef.current);
    }

    nodeRef.current = node;
  }, []);

  return { ref: setRef, mediaBreakpoints };
}
