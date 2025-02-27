// floating ui 内に存在する、export されていない関数を以下から移植
// https://github.com/floating-ui/floating-ui/blob/642f9f0e76d1efc5971e392be86c459b4cbd2282/packages/react/src/utils/composite.ts#L29
function isDisabled(
  list: Array<HTMLElement | null>,
  index: number,
  disabledIndices?: Array<number>,
) {
  if (disabledIndices) {
    return disabledIndices.includes(index);
  }

  const element = list[index];
  return (
    element == null ||
    element.hasAttribute("disabled") ||
    element.getAttribute("aria-disabled") === "true"
  );
}

function findNonDisabledIndex(
  listRef: React.MutableRefObject<Array<HTMLElement | null>>,
  {
    startingIndex = -1,
    decrement = false,
    disabledIndices,
    amount = 1,
  }: {
    startingIndex?: number;
    decrement?: boolean;
    disabledIndices?: Array<number>;
    amount?: number;
  } = {},
): number {
  const list = listRef.current;

  let index = startingIndex;
  do {
    index += decrement ? -amount : amount;
  } while (
    index >= 0 &&
    index <= list.length - 1 &&
    isDisabled(list, index, disabledIndices)
  );

  return index;
}

export function getMaxIndex(
  listRef: React.MutableRefObject<Array<HTMLElement | null>>,
  disabledIndices: Array<number> | undefined,
) {
  return findNonDisabledIndex(listRef, {
    decrement: true,
    startingIndex: listRef.current.length,
    disabledIndices,
  });
}
