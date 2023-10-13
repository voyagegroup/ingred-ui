import {
  CandidateItem,
  DualListBoxCandidateItem,
  DualListBoxItem,
} from "./DualListBox";

export const getCandidateItems = (
  candidateItems: DualListBoxCandidateItem[],
  selectedItems: DualListBoxItem[],
) => {
  const result: CandidateItem[] = [];
  candidateItems.forEach((candidateItem) => {
    if (candidateItem.items) {
      result.push({
        ...candidateItem,
        items: getCandidateItems(candidateItem.items, selectedItems),
      });
      return;
    }

    const targetItem = selectedItems.find(
      (selectedItem) => selectedItem.id === candidateItem.id,
    );
    if (targetItem) {
      result.push({
        ...candidateItem,
        selected: true,
      });
    } else {
      result.push(candidateItem);
    }
  });

  return result;
};
