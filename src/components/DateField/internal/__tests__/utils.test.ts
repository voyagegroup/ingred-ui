import { getInputWidth } from "../utils";

describe("getInputWidth", () => {
  it("should return the correct width for a single-byte character", () => {
    const input = "a";
    const expectedWidth = 1;
    expect(getInputWidth(input)).toEqual(expectedWidth);
  });

  it("should return the correct width for a double-byte character", () => {
    const input = "あ";
    const expectedWidth = 2;
    expect(getInputWidth(input)).toEqual(expectedWidth);
  });

  it("should return the correct width for a mix of single-byte and double-byte characters", () => {
    const input = "aあb";
    const expectedWidth = 4;
    expect(getInputWidth(input)).toEqual(expectedWidth);
  });

  it("should return 0 for an empty string", () => {
    const input = "";
    const expectedWidth = 0;
    expect(getInputWidth(input)).toEqual(expectedWidth);
  });
});
