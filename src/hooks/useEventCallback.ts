import React from "react";

const useEnhancedEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 */
export default function useEventCallback(fn: Function) {
  const ref = React.useRef(fn);
  useEnhancedEffect(() => {
    ref.current = fn;
  });

  return React.useCallback((...args) => ref.current(...args), []);
}
