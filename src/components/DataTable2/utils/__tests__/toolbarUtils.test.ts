import React from "react";
import {
  getDynamicIcon,
  categorizeActionsByEnabledWhen,
  categorizeActionsByDisplayIn,
  isActionDisabled,
} from "../toolbarUtils";
import { defaultTheme } from "../../../../themes/defaultTheme";
import type { TableAction } from "../../types/tableActions";

describe("toolbarUtils", () => {
  describe("getDynamicIcon", () => {
    it("should return original icon when dynamicIconColor is undefined", () => {
      const originalIcon = React.createElement("span", { testid: "icon" });
      const result = getDynamicIcon(
        originalIcon,
        undefined,
        true,
        defaultTheme,
      );
      expect(result).toBe(originalIcon);
    });

    it("should return original icon when originalIcon is not a valid React element", () => {
      const originalIcon = "text-icon";
      const dynamicIconColor = { enabled: "success", disabled: "currentColor" };
      const result = getDynamicIcon(
        originalIcon,
        dynamicIconColor,
        true,
        defaultTheme,
      );
      expect(result).toBe(originalIcon);
    });

    it("should apply theme color when enabled and dynamicIconColor is set", () => {
      const originalIcon = React.createElement("span", { testid: "icon" });
      const dynamicIconColor = { enabled: "success", disabled: "currentColor" };
      const result = getDynamicIcon(
        originalIcon,
        dynamicIconColor,
        true,
        defaultTheme,
      );

      expect(React.isValidElement(result)).toBe(true);
      // テーマのsuccess色が適用されることを確認
      expect(result).toMatchObject(
        expect.objectContaining({
          props: expect.objectContaining({
            color: defaultTheme.palette.success.main,
          }),
        }),
      );
    });

    it("should apply disabled color when not enabled", () => {
      const originalIcon = React.createElement("span", { testid: "icon" });
      const dynamicIconColor = { enabled: "success", disabled: "danger" };
      const result = getDynamicIcon(
        originalIcon,
        dynamicIconColor,
        false,
        defaultTheme,
      );

      expect(React.isValidElement(result)).toBe(true);
      expect(result).toMatchObject(
        expect.objectContaining({
          props: expect.objectContaining({
            color: defaultTheme.palette.danger.main,
          }),
        }),
      );
    });

    it("should use currentColor as default when disabled color is not specified", () => {
      const originalIcon = React.createElement("span", { testid: "icon" });
      const dynamicIconColor = { enabled: "success" };
      const result = getDynamicIcon(
        originalIcon,
        dynamicIconColor,
        false,
        defaultTheme,
      );

      expect(React.isValidElement(result)).toBe(true);
      expect(result).toMatchObject(
        expect.objectContaining({
          props: expect.objectContaining({
            color: "currentColor",
          }),
        }),
      );
    });
  });

  describe("categorizeActionsByEnabledWhen", () => {
    it("should categorize actions by enabledWhen property", () => {
      const actions: TableAction[] = [
        {
          type: "singleButton",
          label: "Action 1",
          onClick: () => {},
          enabledWhen: "checked",
        },
        {
          type: "singleButton",
          label: "Action 2",
          onClick: () => {},
          enabledWhen: "unchecked",
        },
        {
          type: "singleButton",
          label: "Action 3",
          onClick: () => {},
          enabledWhen: "checked",
        },
        {
          type: "singleButton",
          label: "Action 4",
          onClick: () => {},
          // デフォルトはchecked扱い
        },
        {
          type: "divider",
          // enabledWhenプロパティなし
        },
      ];

      const result = categorizeActionsByEnabledWhen(actions);

      expect(result.checkedActions).toHaveLength(4); // 3つのchecked + 1つのデフォルト + 1つのdivider
      expect(result.uncheckedActions).toHaveLength(1);
    });
  });

  describe("categorizeActionsByDisplayIn", () => {
    it("should categorize actions by displayIn property", () => {
      const actions: TableAction[] = [
        {
          type: "singleButton",
          label: "Action 1",
          onClick: () => {},
          displayIn: "toolbar",
        },
        {
          type: "singleButton",
          label: "Action 2",
          onClick: () => {},
          displayIn: "dropdown",
        },
        {
          type: "singleButton",
          label: "Action 3",
          onClick: () => {},
          // デフォルトはtoolbar扱い
        },
        {
          type: "divider",
          // displayInプロパティなし
        },
      ];

      const result = categorizeActionsByDisplayIn(actions);

      expect(result.toolbarActions).toHaveLength(3); // 1つのtoolbar + 1つのデフォルト + 1つのdivider
      expect(result.dropdownActions).toHaveLength(1);
    });
  });

  describe("isActionDisabled", () => {
    const checkedRows = ["row1", "row2"];
    const emptyCheckedRows: string[] = [];

    it("should handle checked enabledWhen", () => {
      const action = { enabledWhen: "checked" as const };

      expect(isActionDisabled(action, checkedRows)).toBe(false);
      expect(isActionDisabled(action, emptyCheckedRows)).toBe(true);
    });

    it("should handle unchecked enabledWhen", () => {
      const action = { enabledWhen: "unchecked" as const };

      expect(isActionDisabled(action, checkedRows)).toBe(true);
      expect(isActionDisabled(action, emptyCheckedRows)).toBe(false);
    });

    it("should handle undefined enabledWhen as checked", () => {
      const action = {};

      expect(isActionDisabled(action, checkedRows)).toBe(false);
      expect(isActionDisabled(action, emptyCheckedRows)).toBe(true);
    });

    it("should handle custom enabledWhen with disabled function", () => {
      const action = {
        enabledWhen: "custom" as const,
        disabled: (rows: string[]) => rows.length < 2,
      };

      expect(isActionDisabled(action, checkedRows)).toBe(false); // 2件選択なのでfalse
      expect(isActionDisabled(action, ["row1"])).toBe(true); // 1件選択なのでtrue
      expect(isActionDisabled(action, emptyCheckedRows)).toBe(true); // 0件選択なのでtrue
    });

    it("should handle custom enabledWhen without disabled function", () => {
      const action = { enabledWhen: "custom" as const };

      expect(isActionDisabled(action, checkedRows)).toBe(false);
      expect(isActionDisabled(action, emptyCheckedRows)).toBe(false);
    });

    it("should handle unchecked context", () => {
      const action = { enabledWhen: "checked" as const };

      // uncheckedコンテキストでは選択状態に関係なく、行が選択されていると無効
      expect(isActionDisabled(action, checkedRows, true)).toBe(true);
      expect(isActionDisabled(action, emptyCheckedRows, true)).toBe(false);
    });
  });
});
