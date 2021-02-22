import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render } from "@testing-library/react";
import Spacer from "../";
import { Space } from "../../../styles/space";
import { createTheme } from "../../../themes/createTheme";
import { getMargin, getPadding } from "../../../utils/spacer";

describe("Spacer component testing", () => {
  afterEach(cleanup);

  const theme = createTheme();

  test("Spacer", () => {
    const { asFragment } = render(<Spacer />);
    expect(asFragment()).toMatchSnapshot();
  });

  describe("margin", () => {
    test("When using 'm', the value of all direction margin is 'Space * m'", () => {
      const margin = getMargin({
        theme,
        m: 1,
      });
      expect(margin).toEqual(
        `margin: ${Space * 1}px ${Space * 1}px ${Space * 1}px ${Space * 1}px`,
      );
    });
    test("When using 'my', the value of Y axis margin is 'Space * my'", () => {
      const margin = getMargin({
        theme,
        my: 1,
      });
      expect(margin).toEqual(`margin: ${Space * 1}px 0px ${Space * 1}px 0px`);
    });
    test("When using 'mx', the value of X axis margin is 'Space * mx'", () => {
      const margin = getMargin({
        theme,
        mx: 1,
      });
      expect(margin).toEqual(`margin: 0px ${Space * 1}px 0px ${Space * 1}px`);
    });
    test("'m' can be overwritten with 'mx','my'", () => {
      const margin = getMargin({
        theme,
        m: 1,
        mx: 2,
        my: 2,
      });
      expect(margin).toEqual(
        `margin: ${Space * 2}px ${Space * 2}px ${Space * 2}px ${Space * 2}px`,
      );
    });
    test("'mx','my' can be overwritten by 'mt','mr','mb','ml'", () => {
      const margin = getMargin({
        theme,
        mx: 1,
        my: 1,
        mt: 2,
        mr: 2,
        mb: 2,
        ml: 2,
      });
      expect(margin).toEqual(
        `margin: ${Space * 2}px ${Space * 2}px ${Space * 2}px ${Space * 2}px`,
      );
    });
  });

  describe("padding", () => {
    test("When using 'p', the value of all direction padding is 'Space * p'", () => {
      const padding = getPadding({
        theme,
        p: 1,
      });
      expect(padding).toEqual(
        `padding: ${Space * 1}px ${Space * 1}px ${Space * 1}px ${Space * 1}px`,
      );
    });
    test("When using 'py', the value of Y axis padding is 'Space * py'", () => {
      const padding = getPadding({
        theme,
        py: 1,
      });
      expect(padding).toEqual(`padding: ${Space * 1}px 0px ${Space * 1}px 0px`);
    });
    test("When using 'px', the value of X axis padding is 'Space * px'", () => {
      const padding = getPadding({
        theme,
        px: 1,
      });
      expect(padding).toEqual(`padding: 0px ${Space * 1}px 0px ${Space * 1}px`);
    });
    test("'p' can be overwritten with 'px','py'", () => {
      const padding = getPadding({
        theme,
        p: 1,
        px: 2,
        py: 2,
      });
      expect(padding).toEqual(
        `padding: ${Space * 2}px ${Space * 2}px ${Space * 2}px ${Space * 2}px`,
      );
    });
    test("'px','py' can be overwritten by 'pt','pr','pb','pl'", () => {
      const padding = getPadding({
        theme,
        px: 1,
        py: 1,
        pt: 2,
        pr: 2,
        pb: 2,
        pl: 2,
      });
      expect(padding).toEqual(
        `padding: ${Space * 2}px ${Space * 2}px ${Space * 2}px ${Space * 2}px`,
      );
    });
  });
});
