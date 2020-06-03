import * as React from "react";

type ReactRef<T> = React.RefCallback<T> | { current: T };

export function useMergeRefs<T>(...refs: ReactRef<T>[]) {
  return React.useMemo(() => {
    if (refs.every((ref) => ref === null)) {
      return null;
    }
    return (refValue: T) => {
      for (const ref of refs) {
        if (typeof ref === "function") {
          ref(refValue);
        } else if (ref) {
          ref.current = refValue;
        }
      }
    };
  }, [refs]);
}
