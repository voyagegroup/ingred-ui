import { getSections } from "../utils";

describe("getSections", () => {
  it("should return a start:0 end: -1 when no numbers are present", () => {
    const formattedDate = "abcd";
    const result = getSections(formattedDate);
    expect(result).toEqual([
      { start: 0, end: 3, value: "abcd", editable: false },
    ]);
  });

  it("should correctly parse a date string with YYYY-MM-DD", () => {
    const formattedDate = "2023-01-02";
    const result = getSections(formattedDate);
    const expected = [
      { start: 0, end: 3, value: "2023", editable: true },
      { start: 4, end: 4, value: "-", editable: false },
      { start: 5, end: 6, value: "01", editable: true },
      { start: 7, end: 7, value: "-", editable: false },
      { start: 8, end: 9, value: "02", editable: true },
    ];
    expect(result).toEqual(expected);
  });

  it("should handle a date string with MM/DD/YYYY", () => {
    const formattedDate = "01/02/2023";
    const result = getSections(formattedDate);
    const expected = [
      { start: 0, end: 1, value: "01", editable: true },
      { start: 2, end: 2, value: "/", editable: false },
      { start: 3, end: 4, value: "02", editable: true },
      { start: 5, end: 5, value: "/", editable: false },
      { start: 6, end: 9, value: "2023", editable: true },
    ];
    expect(result).toEqual(expected);
  });

  it("should handle a date string with YYYY年MM月NN日", () => {
    const formattedDate = "2023年01月02日";
    const result = getSections(formattedDate);
    const expected = [
      { start: 0, end: 3, value: "2023", editable: true },
      { start: 4, end: 4, value: "年", editable: false },
      { start: 5, end: 6, value: "01", editable: true },
      { start: 7, end: 7, value: "月", editable: false },
      { start: 8, end: 9, value: "02", editable: true },
      { start: 10, end: 10, value: "日", editable: false },
    ];
    expect(result).toEqual(expected);
  });

  it("should handle a date string with DD----MM+-*/===YY", () => {
    const formattedDate = "02----01+-*/===23";
    const result = getSections(formattedDate);
    const expected = [
      { start: 0, end: 1, value: "02", editable: true },
      { start: 2, end: 5, value: "----", editable: false },
      { start: 6, end: 7, value: "01", editable: true },
      { start: 8, end: 14, value: "+-*/===", editable: false },
      { start: 15, end: 16, value: "23", editable: true },
    ];
    expect(result).toEqual(expected);
  });
});
