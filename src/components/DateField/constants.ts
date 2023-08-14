export const AllowedKeys = {
  Backspace: "Backspace",
  Delete: "Delete",
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
  Tab: "Tab",
  // Enter: "Enter",
  // Escape: "Escape",
  "0": "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
} as const;

export const numberKeys = Object.keys(AllowedKeys).filter(
  (key) => !isNaN(Number(key)),
);

export const allowedKeys = Object.values(AllowedKeys);

export type AllowedKeys = (typeof AllowedKeys)[keyof typeof AllowedKeys];
