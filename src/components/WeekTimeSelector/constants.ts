export const weekList = ["日", "月", "火", "水", "木", "金", "土"] as const;
// 0 to 24 array
export const timeList = Array.from(Array(24)).map((_, i) => i);

export const defaultHoverWeekTime: string[][] = Array(7)
  .fill(Array(24).fill(false))
  .map((week) => week.map(() => 0));
