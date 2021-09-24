import * as React from "react";

// MEMO: This type is React.LegacyRef<T> & "current" property is mutable
type ReactRef<T> =
  | React.RefCallback<T>
  | React.MutableRefObject<T>
  | React.ForwardedRef<T>
  | string
  | null
  | undefined;

export function useMergeRefs<T>(...refs: ReactRef<T>[]): React.Ref<T> {
  return React.useMemo(() => {
    if (refs.every((ref) => ref === null)) {
      return null;
    }
    return (refValue: T) => {
      for (const ref of refs) {
        if (typeof ref === "function") {
          ref(refValue);
        } else if (ref && typeof ref !== "string") {
          ref.current = refValue;
        }
      }
    };
  }, [refs]); // eslint-disable-line react-hooks/exhaustive-deps
}
