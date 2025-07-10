import React from "react";
import type { TableAction } from "../tableActions";

// 型定義の正常性をテストするためのサンプルデータ
describe("TableAction Types", () => {
  it("should accept valid singleButton action", () => {
    const validSingleButton: TableAction = {
      type: "singleButton",
      label: "テストボタン",
      onClick: (checkedRows: string[]) => console.log(checkedRows),
      icon: React.createElement("div"),
      color: "primary",
      displayIn: "toolbar",
      enabledWhen: "checked",
      dynamicIconColor: {
        enabled: "success",
        disabled: "currentColor",
      },
    };

    expect(validSingleButton.type).toBe("singleButton");
    expect(validSingleButton.label).toBe("テストボタン");
  });

  it("should accept valid groupButton action", () => {
    const validGroupButton: TableAction = {
      type: "groupButton",
      items: [
        {
          label: "有効化",
          onClick: (checkedRows: string[]) => console.log(checkedRows),
          enabledWhen: "checked",
          dynamicIconColor: {
            enabled: "success",
            disabled: "currentColor",
          },
        },
        {
          label: "無効化",
          onClick: (checkedRows: string[]) => console.log(checkedRows),
          enabledWhen: "checked",
          dynamicIconColor: {
            enabled: "danger",
          },
        },
      ],
      enabledWhen: "checked",
      displayIn: "toolbar",
      headingLabel: "ステータス変更",
    };

    expect(validGroupButton.type).toBe("groupButton");
    expect(validGroupButton.items).toHaveLength(2);
  });

  it("should accept valid separator action", () => {
    const validSeparator: TableAction = {
      type: "separator",
      displayIn: "dropdown",
      enabledWhen: "checked",
    };

    expect(validSeparator.type).toBe("separator");
  });

  it("should accept valid heading action", () => {
    const validHeading: TableAction = {
      type: "heading",
      label: "テストヘッダー",
      displayIn: "dropdown",
      enabledWhen: "unchecked",
    };

    expect(validHeading.type).toBe("heading");
    expect(validHeading.label).toBe("テストヘッダー");
  });

  it("should accept valid divider action", () => {
    const validDivider: TableAction = {
      type: "divider",
      displayIn: "toolbar",
    };

    expect(validDivider.type).toBe("divider");
  });
});
