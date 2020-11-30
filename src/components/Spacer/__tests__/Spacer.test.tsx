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

  test("margin: mを指定するとmt, mr, mb, ml全てがSpaceのm倍になる", () => {
    const margin = getMargin({
      theme,
      m: 1,
    });
    expect(margin).toEqual(
      `margin: ${Space * 1}px ${Space * 1}px ${Space * 1}px ${Space * 1}px`,
    );
  });
  test("margin: myを指定するとmt, mbだけがSpaceのmy倍になる", () => {
    const margin = getMargin({
      theme,
      my: 1,
    });
    expect(margin).toEqual(`margin: ${Space * 1}px 0px ${Space * 1}px 0px`);
  });
  test("margin: mxを指定するとmr, mlだけがSpaceのmx倍になる", () => {
    const margin = getMargin({
      theme,
      mx: 1,
    });
    expect(margin).toEqual(`margin: 0px ${Space * 1}px 0px ${Space * 1}px`);
  });
  test("margin: mはmx, myで上書きできる", () => {
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
  test("margin: mx, myはmt, mr, mb, mlで上書きできる", () => {
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

  test("padding: pを指定するとpt, pr, pb, pl全てがSpaceのp倍になる", () => {
    const padding = getPadding({
      theme,
      p: 1,
    });
    expect(padding).toEqual(
      `padding: ${Space * 1}px ${Space * 1}px ${Space * 1}px ${Space * 1}px`,
    );
  });
  test("padding: pyを指定するとpt, pbだけがSpaceのpy倍になる", () => {
    const padding = getPadding({
      theme,
      py: 1,
    });
    expect(padding).toEqual(`padding: ${Space * 1}px 0px ${Space * 1}px 0px`);
  });
  test("padding: pxを指定するとpr, plだけがSpaceのpx倍になる", () => {
    const padding = getPadding({
      theme,
      px: 1,
    });
    expect(padding).toEqual(`padding: 0px ${Space * 1}px 0px ${Space * 1}px`);
  });
  test("padding: pはpx, pyで上書きできる", () => {
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
  test("padding: px, pyはpt, pr, pb, plで上書きできる", () => {
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
