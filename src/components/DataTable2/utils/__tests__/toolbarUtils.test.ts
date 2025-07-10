import React from "react";
import { defaultTheme } from "../../../../themes/defaultTheme";
import {
  getDynamicIcon,
  categorizeActionsByEnabledWhen,
  categorizeActionsByDisplayIn,
} from "../toolbarUtils";

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
      const actions = [
        { id: 1, enabledWhen: "checked" as const },
        { id: 2, enabledWhen: "unchecked" as const },
        { id: 3, enabledWhen: "checked" as const },
        { id: 4 }, // デフォルトはchecked扱い
      ];

      const result = categorizeActionsByEnabledWhen(actions);

      expect(result.checkedActions).toHaveLength(3);
      expect(result.uncheckedActions).toHaveLength(1);
      expect(result.checkedActions.map((a) => a.id)).toEqual([1, 3, 4]);
      expect(result.uncheckedActions.map((a) => a.id)).toEqual([2]);
    });
  });

  describe("categorizeActionsByDisplayIn", () => {
    it("should categorize actions by displayIn property", () => {
      const actions = [
        { id: 1, displayIn: "toolbar" as const },
        { id: 2, displayIn: "dropdown" as const },
        { id: 3, displayIn: "toolbar" as const },
        { id: 4 }, // デフォルトはtoolbar扱い
      ];

      const result = categorizeActionsByDisplayIn(actions);

      expect(result.toolbarActions).toHaveLength(3);
      expect(result.dropdownActions).toHaveLength(1);
      expect(result.toolbarActions.map((a) => a.id)).toEqual([1, 3, 4]);
      expect(result.dropdownActions.map((a) => a.id)).toEqual([2]);
    });
  });
});
