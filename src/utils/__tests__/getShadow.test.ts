import { getShadow, TokenType } from "../getShadow";

describe("getShadow", () => {
  const primary = "#0b82f4";
  const shadowBase = "#041C33";
  const shadowOpacity = 0.08;

  test.each<[TokenType, number, string, string]>([
    [
      1,
      shadowOpacity,
      shadowBase,
      "0px -3px rgba(4, 28, 51, 0.16) inset, 0px 2px rgba(4, 28, 51, 0.08)",
    ],
    [2, shadowOpacity, shadowBase, "0px 3px rgba(4, 28, 51, 0.16) inset"],
    [
      3,
      shadowOpacity,
      shadowBase,
      "0px -2px rgba(4, 28, 51, 0.16) inset, 0px 1px rgba(4, 28, 51, 0.08)",
    ],
    [4, shadowOpacity, shadowBase, "0px 1px rgba(4, 28, 51, 0.16) inset"],
    [5, shadowOpacity, shadowBase, "0px 0px 16px rgba(4, 28, 51, 0.16)"],
    [5, shadowOpacity, primary, "0px 0px 16px rgba(11, 130, 244, 0.16)"],
  ])(
    "getShadowWithColor(%i, %s) = %s",
    (tokenNumber, opacityBase, color, expected) => {
      expect(getShadow(tokenNumber, opacityBase, color)).toBe(expected);
    },
  );
});
