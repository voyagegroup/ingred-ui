import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { MONTH_SIZE } from "./constants";

export const getNextMonthList = (date: Dayjs) =>
  Array.from(new Array(MONTH_SIZE)).map((_, i) => date.add(i, "month"));

export const getPrevMonthList = (date: Dayjs) =>
  Array.from(new Array(MONTH_SIZE)).map((_, i) =>
    date.subtract(MONTH_SIZE - i, "month"),
  );

/**
 * @memo カレンダーを選択中の月にするときに、アニメーション等があるといいかもしれない
 *
 * @param date 選択中の日付
 * @param ref カレンダーの親要素のref、IntersectionObserverのrootに使う
 * @return monthList 表示する月のリスト
 */
export const useScrollCalendar = (
  date: Dayjs,
  ref: React.RefObject<HTMLDivElement>,
) => {
  // 読み込み済みの日付を保持する
  const [loaded, setLoaded] = useState<{
    prev: Dayjs;
    next: Dayjs;
  }>({
    prev: date.subtract(MONTH_SIZE, "month"),
    next: date.add(MONTH_SIZE, "month"),
  });
  // 表示する月のリスト
  // この hooks の戻り値
  const [monthList, setMonthList] = useState<Dayjs[]>([
    ...getPrevMonthList(date),
    ...getNextMonthList(date),
  ]);

  useEffect(() => {
    if (ref.current === null) return;
    const targets = document.getElementsByClassName(date.format("YYYY-MM"));
    for (const target of Array.from(targets)) {
      const containerHeight = ref.current.clientHeight;
      // Element には offsetTop と offsetHeight がないので、型を HTMLElement に変換する
      const t = target as HTMLElement;
      const targetPositionFromTop = t.offsetTop;
      const targetHeight = t.offsetHeight;

      const desiredScrollTop =
        targetPositionFromTop - containerHeight / 2 + targetHeight / 2;
      ref.current.scrollTop = desiredScrollTop;
    }
  }, [date, ref]);

  useEffect(() => {
    setLoaded({
      prev: date.subtract(MONTH_SIZE, "month"),
      next: date.add(MONTH_SIZE, "month"),
    });
    setMonthList([...getPrevMonthList(date), ...getNextMonthList(date)]);
  }, [date]);

  // next を読み込む
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // next、prev をそれぞれ MONTH_SIZE 分ずらす
            const next = loaded.next.add(MONTH_SIZE, "month");
            const prev = loaded.prev.add(MONTH_SIZE, "month");

            // prev と next の月のリストを取得
            const prevYearMonthList = getPrevMonthList(loaded.next);
            const nextYearMonthList = getNextMonthList(loaded.next);

            setLoaded({ next, prev });
            setMonthList([...prevYearMonthList, ...nextYearMonthList]);
          }
        });
      },
      {
        root: ref.current,
        threshold: 0.1,
      },
    );

    const targets = document.getElementsByClassName(
      loaded.next.subtract(1, "month").format("YYYY-MM"),
    );

    for (const target of Array.from(targets)) {
      observer.observe(target);
    }

    return () => {
      for (const target of Array.from(targets)) {
        observer.unobserve(target);
      }
    };
  }, [loaded, ref]);

  // prev を読み込む
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // next、prev をそれぞれ MONTH_SIZE 分ずらす
            const next = loaded.next.subtract(MONTH_SIZE, "month");
            const prev = loaded.prev.subtract(MONTH_SIZE, "month");

            // prev と next の月のリストを取得
            const prevYearMonthList = getPrevMonthList(loaded.prev);
            const nextYearMonthList = getNextMonthList(loaded.prev);

            setLoaded({ next, prev });
            setMonthList([...prevYearMonthList, ...nextYearMonthList]);
          }
        });
      },
      {
        root: ref.current,
        threshold: 0.1,
      },
    );

    const targets = document.getElementsByClassName(
      loaded.prev.add(1, "month").format("YYYY-MM"),
    );

    for (const target of Array.from(targets)) {
      observer.observe(target);
    }

    return () => {
      for (const target of Array.from(targets)) {
        observer.unobserve(target);
      }
    };
  }, [loaded, ref]);

  return { monthList };
};
