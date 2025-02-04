import { toGroupedItems, type Item } from "../";

describe("ContextMenu2 util: toGroupedItems", () => {
  it("toGroupedItems should work", () => {
    const items: Item[] = [
      {
        id: "unique-1",
        groupName: "セクション1",
        label: "リストアイテム1",
      },
      {
        id: "unique-2",
        groupName: "セクション1",
        label: "リストアイテム2",
      },
      {
        id: "unique-3",
        groupName: "セクション2",
        label: "リストアイテム3",
      },
      {
        id: "unique-4",
        groupName: "セクション2",
        label:
          "長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い名前のリストアイテム",
      },
      {
        id: "unique-5",
        label: "所属なしアイテム",
      },
    ];

    const groupedItem = [
      {
        groupName: "セクション1",
        items: [
          {
            id: "unique-1",
            groupName: "セクション1",
            label: "リストアイテム1",
          },
          {
            id: "unique-2",
            groupName: "セクション1",
            label: "リストアイテム2",
          },
        ],
      },
      {
        groupName: "セクション2",
        items: [
          {
            id: "unique-3",
            groupName: "セクション2",
            label: "リストアイテム3",
          },
          {
            id: "unique-4",
            groupName: "セクション2",
            label:
              "長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い名前のリストアイテム",
          },
        ],
      },
      {
        groupName: undefined,
        items: [
          {
            id: "unique-5",
            label: "所属なしアイテム",
          },
        ],
      },
    ];

    const result = toGroupedItems(items);
    expect(result).toStrictEqual(groupedItem);
  });
});
