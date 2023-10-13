import { DualListBoxCandidateItem, DualListBoxItem } from "../DualListBox";
import { getCandidateItems } from "../utils";

describe("getCandidateItems", () => {
  it("should return an empty array when given empty arrays", () => {
    const candidateItems: DualListBoxCandidateItem[] = [];
    const selectedItems: DualListBoxItem[] = [];
    const result = getCandidateItems(candidateItems, selectedItems);
    expect(result).toStrictEqual([]);
  });

  it("should return the same candidate items when no selected items are provided", () => {
    const candidateItems: DualListBoxCandidateItem[] = [
      { id: "1", content: "Item 1" },
      { id: "2", content: "Item 2" },
      { id: "3", content: "Item 3" },
    ];
    const selectedItems: DualListBoxItem[] = [];
    const result = getCandidateItems(candidateItems, selectedItems);
    expect(result).toStrictEqual(candidateItems);
  });

  it("should mark selected items as selected", () => {
    const candidateItems: DualListBoxCandidateItem[] = [
      { id: "1", content: "Item 1" },
      { id: "2", content: "Item 2" },
      { id: "3", content: "Item 3" },
    ];
    const selectedItems: DualListBoxItem[] = [{ id: "2", content: "Item 2" }];
    const result = getCandidateItems(candidateItems, selectedItems);
    expect(result).toStrictEqual([
      { id: "1", content: "Item 1" },
      { id: "2", content: "Item 2", selected: true },
      { id: "3", content: "Item 3" },
    ]);
  });

  it("should recursively mark selected items as selected", () => {
    const candidateItems: DualListBoxCandidateItem[] = [
      {
        id: "1",
        content: "Item 1",
        items: [
          { id: "2", content: "Item 2" },
          { id: "3", content: "Item 3" },
        ],
      },
      { id: "4", content: "Item 4" },
    ];
    const selectedItems: DualListBoxItem[] = [{ id: "2", content: "Item 2" }];
    const result = getCandidateItems(candidateItems, selectedItems);
    expect(result).toStrictEqual([
      {
        id: "1",
        content: "Item 1",
        items: [
          { id: "2", content: "Item 2", selected: true },
          { id: "3", content: "Item 3" },
        ],
      },
      { id: "4", content: "Item 4" },
    ]);
  });
});
