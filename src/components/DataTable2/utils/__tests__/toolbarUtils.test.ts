import React from "react";
import {
  getDynamicIcon,
  categorizeActionsByEnabledWhen,
  categorizeActionsByDisplayIn,
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
});
