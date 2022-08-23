import { getColorWithOpacity } from "../getColorWithOpacity";

describe("getColorWithOpacity", () => {
  const primary = "#0b82f4";
  test.each<[number, string | undefined, string]>([
    [0, primary, "transparent"],
    [1, primary, "rgba(11, 130, 244, 0.08)"],
    [2, undefined, "rgba(4, 28, 51, 0.16)"],
  ])("getColorWithOpacity(%i, %s) = %s", (opacity, color, expected) => {
    expect(getColorWithOpacity(opacity, color)).toBe(expected);
  });
});
