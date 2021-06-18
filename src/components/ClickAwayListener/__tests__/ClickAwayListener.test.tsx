import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, act, fireEvent } from "@testing-library/react";
import ClickAwayListener from "../ClickAwayListener";

describe("ClickAwayListener component testing", () => {
  afterEach(cleanup);

  test("ClickAwayListener", async () => {
    let clickedAway = false;
    const { getByTestId } = render(
      <>
        <div data-testid="outer-listener">hoge</div>
        <ClickAwayListener onClickAway={() => (clickedAway = true)}>
          <div>huga</div>
        </ClickAwayListener>
      </>,
    );

    expect(clickedAway).toBeFalsy();

    // MEMO: Wait for mountedRef to be true.
    await new Promise((r) => setTimeout(r, 1));

    await act(async () => {
      fireEvent.click(getByTestId("outer-listener"));
    });

    expect(clickedAway).toBeTruthy();
  });
});
