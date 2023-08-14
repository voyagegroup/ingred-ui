import { renderHook, act } from "@testing-library/react";
import dayjs, { Dayjs } from "dayjs";
import { useDateField } from "../useDateField";

import React from "react";

/**
 * なんかユニットテストじゃまかないきれない気がしてきた
 *
 * @memo setSelectionRange のテストができないので、ArrowRight/ArrowLeft で移動してそのセクションで操作した結果をテストする
 */
describe("useDateField", () => {
  let date: Dayjs;
  let onDateChange: (date: Dayjs) => void;
  const rest = {
    changeState: null,
    handleChangeState: () => {},
  };

  beforeEach(() => {
    date = dayjs("2023-01-01");
    onDateChange = jest.fn();
    jest.resetAllMocks();
  });

  it("should initialize correctly", () => {
    const { result } = renderHook(() =>
      useDateField({ date, format: "YYYY-MM-DD", onDateChange, ...rest }),
    );

    expect(result.current.value).toBe(date.format("YYYY-MM-DD"));
  });

  it("should initialize correctly when format is MM/DD/YYYY", () => {
    const { result } = renderHook(() =>
      useDateField({ date, format: "MM/DD/YYYY", onDateChange, ...rest }),
    );

    expect(result.current.value).toBe(date.format("MM/DD/YYYY"));
  });

  // setSelectionRange のテストができないので、ArrowRight/ArrowLeft で移動してそのセクションで操作した結果をテストする
  // つまり、ArrowRight/ArrowLeft で移動できることのテストも兼ねている（本当は分離したい）
  describe("should update the date when a number key is pressed", () => {
    it('should change the year to "1999" when press 1999 in year section', () => {
      const { result } = renderHook(() =>
        useDateField({ date, format: "YYYY-MM-DD", onDateChange, ...rest }),
      );

      act(() => {
        result.current.onMouseDown();
      });

      const keys = ["1", "9", "9", "9"];

      keys.forEach((key) => {
        act(() => {
          result.current.onKeyDown({
            key,
            preventDefault: jest.fn(),
          } as unknown as React.KeyboardEvent<HTMLInputElement>);
        });
      });

      expect(result.current.value).toBe("1999-01-01");
    });

    it('should change the month to "02" when press 2 in month section', () => {
      const { result } = renderHook(() =>
        useDateField({ date, format: "YYYY-MM-DD", onDateChange, ...rest }),
      );

      act(() => {
        result.current.onKeyDown({
          key: "ArrowRight",
          preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.onKeyDown({
          key: "2",
          preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>);
      });

      expect(result.current.value).toBe("2023-02-01");
    });

    it('should change the day to "02" when press 2 in day section', () => {
      const { result } = renderHook(() =>
        useDateField({ date, format: "YYYY-MM-DD", onDateChange, ...rest }),
      );

      act(() => {
        result.current.onKeyDown({
          key: "ArrowRight",
          preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.onKeyDown({
          key: "ArrowRight",
          preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.onKeyDown({
          key: "2",
          preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>);
      });

      expect(result.current.value).toBe("2023-01-02");
    });

    it('should change the year to "1999" when press 1999 in year section after ArrowRight and ArrowLeft', () => {
      const { result } = renderHook(() =>
        useDateField({ date, format: "YYYY-MM-DD", onDateChange, ...rest }),
      );

      act(() => {
        result.current.onKeyDown({
          key: "ArrowRight",
          preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.onKeyDown({
          key: "ArrowLeft",
          preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>);
      });

      const keys = ["1", "9", "9", "9"];

      keys.forEach((key) => {
        act(() => {
          result.current.onKeyDown({
            key,
            preventDefault: jest.fn(),
          } as unknown as React.KeyboardEvent<HTMLInputElement>);
        });
      });

      expect(result.current.value).toBe("1999-01-01");
    });
  });
});
