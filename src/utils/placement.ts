import { Placement } from "@floating-ui/react";

export const autoPlacements = ["auto", "auto-start", "auto-end"] as const;
export type AutoPlacement = typeof autoPlacements[number];

export const extractAuto = (placements: (Placement | AutoPlacement)[]) => {
  const placementsWithoutAuto = placements.filter(
    (placement): placement is Placement =>
      !autoPlacements.includes(placement as AutoPlacement),
  );
  const isAuto = placements.some((placement) =>
    autoPlacements.includes(placement as AutoPlacement),
  );

  return {
    placements: placementsWithoutAuto,
    isAuto,
  };
};
