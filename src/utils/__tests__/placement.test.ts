import { Placement } from "@floating-ui/react";
import { AutoPlacement, extractAuto } from "../placement";

describe("extractAuto", () => {
  test("auto included", () => {
    const placements: (Placement | AutoPlacement)[] = [
      "auto",
      "top",
      "auto-end",
      "bottom",
      "auto-start",
    ];
    const { placements: result, isAuto } = extractAuto(placements);
    expect(result).toEqual(["top", "bottom"]);
    expect(isAuto).toBe(true);
  });

  test("auto not included", () => {
    const placements: Placement[] = ["top", "bottom"];
    const { placements: result, isAuto } = extractAuto(placements);
    expect(result).toEqual(["top", "bottom"]);
    expect(isAuto).toBe(false);
  });
});
