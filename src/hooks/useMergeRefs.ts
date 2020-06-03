import * as React from "react";

// MEMO: React.LegacyRef<T>のcurrentプロパティを変更可能にしたもの
type ReactRef<T> =
  | React.RefCallback<T>
  | React.MutableRefObject<T>
  | string
  | null
  | undefined;

export function useMergeRefs<T>(...refs: ReactRef<T>[]): ReactRef<T> {
  return React.useMemo(() => {
    return (refValue: T) => {
      for (const ref of refs) {
        if (typeof ref === "function") {
          ref(refValue);
        } else if (ref && typeof ref !== "string") {
          ref.current = refValue;
        }
      }
    };
  }, [refs]);
}
