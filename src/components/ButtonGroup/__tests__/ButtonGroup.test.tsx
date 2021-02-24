import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import ButtonGroup from "..";
import Button from "../../Button";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

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
