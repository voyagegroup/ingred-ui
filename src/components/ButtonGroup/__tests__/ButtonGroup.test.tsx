import { cleanup } from "@testing-library/react";
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import ButtonGroup from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import Button from "../../Button";

describe("Button component testing", () => {
  afterEach(cleanup);

  test("ButtonGroup", () => {
    const { asFragment } = renderWithThemeProvider(
      <ButtonGroup>
        <Button>Edit</Button>
        <Button>Save</Button>
      </ButtonGroup>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
