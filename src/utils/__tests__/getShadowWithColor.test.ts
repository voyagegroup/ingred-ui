import { ShadowsType } from "../../styles/shadows";
import { getShadowWithColor } from "../getShadowWithColor";

describe("getShadowWithColor", () => {
  const primary = "#0b82f4";
  const shadows: ShadowsType = [
    "none",
    "0px 0px 0px 0px rgba(4, 28, 51, 0.16) inset, 0px 0px 0px 0px rgba(4, 28, 51, 0.08)",
    "0px 0px 0px 0px rgba(4, 28, 51, 0.16) inset, 0px 0px 0px 0px rgba(4, 28, 51, 0.08)",
    "0px 0px 0px 0px rgba(4, 28, 51, 0.16) inset, 0px 0px 0px 0px rgba(4, 28, 51, 0.08)",
    "0px 0px 0px 0px rgba(4, 28, 51, 0.16) inset",
    "0px 0px 0px 0px rgba(4, 28, 51, 0.16)",
  ];

  test.each<[number, string | undefined, string]>([
    [0, primary, "none"],
    [
      1,
      primary,
      "0px 0px 0px 0px rgba(11, 130, 244, 0.16) inset, 0px 0px 0px 0px rgba(11, 130, 244, 0.08)",
    ],
    [
      2,
      primary,
      "0px 0px 0px 0px rgba(11, 130, 244, 0.16) inset, 0px 0px 0px 0px rgba(11, 130, 244, 0.08)",
    ],
    [
      3,
      primary,
      "0px 0px 0px 0px rgba(11, 130, 244, 0.16) inset, 0px 0px 0px 0px rgba(11, 130, 244, 0.08)",
    ],
    [4, primary, "0px 0px 0px 0px rgba(11, 130, 244, 0.16) inset"],
    [5, primary, "0px 0px 0px 0px rgba(11, 130, 244, 0.16)"],
    [1, undefined, shadows[1]],
  ])("getShadowWithColor(%i, %s) = %s", (tokenNumber, color, expected) => {
    expect(getShadowWithColor(shadows, tokenNumber, color)).toBe(expected);
  });
});
