import { Placement } from "@floating-ui/react";
import { useMemo } from "react";

export const autoPlacements = ["auto", "auto-start", "auto-end"] as const;
export type AutoPlacement = (typeof autoPlacements)[number];

export const usePlacement = (placements: (Placement | AutoPlacement)[]) => {
  const placementsWithoutAuto = useMemo(
    () =>
      placements.filter(
        (placement): placement is Placement =>
          !autoPlacements.includes(placement as AutoPlacement),
      ),
    [placements],
  );
  const isAuto = useMemo(
    () =>
      placements.some((placement) =>
        autoPlacements.includes(placement as AutoPlacement),
      ),
    [placements],
  );
  return {
    placements: placementsWithoutAuto,
    isAuto,
  };
};
