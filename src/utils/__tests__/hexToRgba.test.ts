import { hexToRgba } from "../hexToRgba";

describe("hexToRgba", () => {
  const primary = "#0b82f4";
  test.each<[string, number, string]>([
    [primary, 0, "rgba(11, 130, 244, 0)"],
    [primary, 0.5, "rgba(11, 130, 244, 0.5)"],
    [primary, 1, "rgba(11, 130, 244, 1)"],

    ["#FF0000", 1, "rgba(255, 0, 0, 1)"],

    ["#F00", 1, "rgba(255, 0, 0, 1)"],
  ])("hexToRgba - (color: %p, alpha: %p) = %p", (color, alpha, expected) => {
    expect(hexToRgba(color, alpha)).toBe(expected);
  });
});
