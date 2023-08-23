import { renderHook, act } from "@testing-library/react";
import dayjs, { Dayjs } from "dayjs";
import {
  useScrollCalendar,
  getNextMonthList,
  getPrevMonthList,
} from "../useScrollCalendar";

(global as any).IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: () => jest.fn(),
  unobserve: () => jest.fn(),
  disconnect: () => jest.fn(),
}));

describe("useScroll hook", () => {
  let date: Dayjs;
  let ref: React.RefObject<HTMLDivElement>;

  beforeEach(() => {
    date = dayjs("2021-01-01");
    ref = { current: document.createElement("div") };
  });

  test("loads next six months when reaching the bottom 10% of ScrollArea", () => {
    const { result } = renderHook(() => useScrollCalendar(date, ref));

    act(() => {
      //   const targets = document.getElementsByClassName(date.format("YYYY-MM"));
    });

    const months = [...getPrevMonthList(date), ...getNextMonthList(date)].map(
      (d) => d.format("YYYY-MM"),
    );
    expect(result.current.monthList.map((m) => m.format("YYYY-MM"))).toEqual(
      expect.arrayContaining(months),
    );
  });

  test("loads previous six months when reaching the top 10% of ScrollArea", () => {
    const { result } = renderHook(() => useScrollCalendar(date, ref));

    act(() => {
      //   const targets = document.getElementsByClassName(date.format("YYYY-MM"));
    });

    const months = [...getPrevMonthList(date), ...getNextMonthList(date)].map(
      (d) => d.format("YYYY-MM"),
    );
    expect(result.current.monthList.map((m) => m.format("YYYY-MM"))).toEqual(
      expect.arrayContaining(months),
    );
  });
});
