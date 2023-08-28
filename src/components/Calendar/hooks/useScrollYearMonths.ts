import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

export const useScrollYearMonths = (
  current: Dayjs,
  ref: React.RefObject<HTMLDivElement>,
) => {
  const [years, setYears] = useState<number[]>(
    Array.from(new Array(5), (_, i) => current.year() + i - 5).concat(
      Array.from(new Array(5), (_, i) => current.year() + i),
    ),
  );

  useEffect(() => {
    const targets = document.getElementsByClassName(current.format("YYYY"));
    for (const target of Array.from(targets)) {
      target.scrollIntoView({ block: "center" });
    }
  }, [current]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const year = parseInt(entry.target.className);
            if (year === years[0]) {
              const newYears = Array.from(
                new Array(5),
                (_, i) => year + i - 5,
              ).concat(Array.from(new Array(5), (_, i) => year + i));
              setYears(newYears);
            } else if (year === years[years.length - 1]) {
              const newYears = Array.from(
                new Array(5),
                (_, i) => year + i - 5,
              ).concat(Array.from(new Array(5), (_, i) => year + i));
              setYears(newYears);
            }
          }
        });
      },
      {
        root: ref.current,
        threshold: 0.1,
      },
    );

    const targets = [
      document.getElementsByClassName(years[0].toString()),
      document.getElementsByClassName(years[years.length - 1].toString()),
    ];

    for (const target of Array.from(targets)) {
      for (const t of Array.from(target)) {
        observer.observe(t);
      }
    }

    return () => {
      for (const target of Array.from(targets)) {
        for (const t of Array.from(target)) {
          observer.unobserve(t);
        }
      }
    };
  }, [years, current, ref]);

  return {
    ref,
    years,
  };
};
