import { DualListBoxItem, DualListBoxSelectedItem } from "../DualListBox";
import { getCandidateItems } from "../utils";

describe("getCandidateItems", () => {
  it("should return an empty array when given empty arrays", () => {
    const candidateItems: DualListBoxItem[] = [];
    const selectedItems: DualListBoxSelectedItem[] = [];
    const result = getCandidateItems(candidateItems, selectedItems);
    expect(result).toStrictEqual([]);
  });

  it("should return the same candidate items when no selected items are provided", () => {
    const candidateItems: DualListBoxItem[] = [
      { id: "1", label: "Item 1" },
      { id: "2", label: "Item 2" },
      { id: "3", label: "Item 3" },
    ];
    const selectedItems: DualListBoxSelectedItem[] = [];
    const result = getCandidateItems(candidateItems, selectedItems);
    expect(result).toStrictEqual(candidateItems);
  });

  it("should mark selected items as selected", () => {
    const candidateItems: DualListBoxItem[] = [
      { id: "1", label: "Item 1" },
      { id: "2", label: "Item 2" },
      { id: "3", label: "Item 3" },
    ];
    const selectedItems: DualListBoxSelectedItem[] = [
      { id: "2", label: "Item 2" },
    ];
    const result = getCandidateItems(candidateItems, selectedItems);
    expect(result).toStrictEqual([
      { id: "1", label: "Item 1" },
      { id: "2", label: "Item 2", selected: true },
      { id: "3", label: "Item 3" },
    ]);
  });

  it("should recursively mark selected items as selected", () => {
    const candidateItems: DualListBoxItem[] = [
      {
        id: "1",
        label: "Item 1",
        items: [
          { id: "2", label: "Item 2" },
          { id: "3", label: "Item 3" },
        ],
      },
      { id: "4", label: "Item 4" },
    ];
    const selectedItems: DualListBoxSelectedItem[] = [
      { id: "2", label: "Item 2" },
    ];
    const result = getCandidateItems(candidateItems, selectedItems);
    expect(result).toStrictEqual([
      {
        id: "1",
        label: "Item 1",
        items: [
          { id: "2", label: "Item 2", selected: true },
          { id: "3", label: "Item 3" },
        ],
      },
      { id: "4", label: "Item 4" },
    ]);
  });
});
