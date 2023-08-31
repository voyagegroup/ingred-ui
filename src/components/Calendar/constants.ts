import dayjs from "dayjs";

// for `<ScrollArea />`
export const HEIGHT = "400px";

const dayIndex = dayjs().day();
const startDay = dayjs().subtract(dayIndex, "day");

export const weekList = [...Array(7)].map((_, i) => startDay.add(i, "day"));
