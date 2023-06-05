import { usePlacement } from "../usePlacement";
import { renderHook } from "@testing-library/react";

describe("usePlacement", () => {
  test("auto included", () => {
    const { current } = renderHook(() =>
      usePlacement(["auto-start", "left", "auto", "right", "auto-end"]),
    ).result;
    expect(current.placements).toEqual(["left", "right"]);
    expect(current.isAuto).toBe(true);
  });
  test("auto not included", () => {
    const { current } = renderHook(() =>
      usePlacement(["left", "right"]),
    ).result;
    expect(current.placements).toEqual(["left", "right"]);
    expect(current.isAuto).toBe(false);
  });
});
