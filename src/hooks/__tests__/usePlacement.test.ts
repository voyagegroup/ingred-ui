import { renderHook } from "@testing-library/react";
import { usePlacement } from "../usePlacement";

describe("usePlacement", () => {
  test("auto included", () => {
    const { placements, isAuto } = renderHook(() =>
      usePlacement(["auto-start", "left", "auto", "right", "auto-end"]),
    ).result.current;
    expect(placements).toEqual(["left", "right"]);
    expect(isAuto).toBe(true);
  });
  test("auto not included", () => {
    const { placements, isAuto } = renderHook(() =>
      usePlacement(["left", "right"]),
    ).result.current;
    expect(placements).toEqual(["left", "right"]);
    expect(isAuto).toBe(false);
  });
});
