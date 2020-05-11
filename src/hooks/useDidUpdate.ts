import { useEffect, useRef } from "react";

export function useDidUpdate(
  effect: () => void | (() => void | undefined),
  deps: ReadonlyArray<any>,
) {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
