import { useMemo } from "react";

type Sections = {
  start: number;
  end: number;
  value: string;
  editable: boolean;
};

/**
 * 何らかのフォーマットで入ってくる日付を開始位置と終了位置と値を持つセクションに分割する
 * useDateField で format された日付操作を汎用的に行うために必要なプロパティを返す
 * 例) 2023-01-02 -> [
 *   { start: 0, end: 3, value: "2023", editable: true },
 *   { start: 4, end: 4, value: "-", editable: false },
 *   { start: 5, end: 6, value: "01", editable: true },
 *   { start: 7, end: 7, value: "-", editable: false },
 *   { start: 8, end: 9, value: "02", editable: true }
 * ]
 *
 * @param formattedDate 何らかのフォーマットで入ってくる日付
 * @returns 開始位置と終了位置と値を持つセクション
 */
export const getSections = (formattedDate?: string | null) => {
  if (!formattedDate) {
    return [];
  }

  const sections: Sections[] = [];
  let start = 0;
  let isPrevCharDigit = !isNaN(Number(formattedDate[0]));

  for (let index = 1; index <= formattedDate.length; index++) {
    const currentChar = formattedDate[index];
    const isCurrentCharDigit =
      !isNaN(Number(currentChar)) && currentChar !== " ";

    if (
      isCurrentCharDigit !== isPrevCharDigit ||
      currentChar === " " ||
      index === formattedDate.length
    ) {
      sections.push({
        start,
        end: index - 1,
        value: formattedDate.slice(start, index),
        editable: isPrevCharDigit,
      });
      start = index;
      isPrevCharDigit = isCurrentCharDigit;
    }
  }

  return sections;
};

/**
 * 開始位置と終了位置と値を持つセクションをフォーマットされた日付に変換する
 */
export const formatString = (sectionsWithCharactor: Sections[]) =>
  sectionsWithCharactor.map((section) => section.value).join("");

type ReactRef<T> =
  | React.RefCallback<T>
  | React.MutableRefObject<T>
  | React.ForwardedRef<T>
  | string
  | null
  | undefined;

// from: https://github.com/voyagegroup/ingred-ui/blob/master/src/hooks/useMergeRefs.ts
export function useMergeRefs<T>(...refs: ReactRef<T>[]): React.Ref<T> {
  return useMemo(() => {
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
  }, [refs]);
}
