import * as React from "react";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import { FilterInputAbstract } from "../FilterInputAbstract";
import Icon from "../../Icon";

describe("FileUploader component testing", () => {
  afterEach(cleanup);

  test("FileUploader", () => {
    const { asFragment } = renderWithThemeProvider(
      <FilterInputAbstract
        selectedIndex={0}
        selectOptions={[
          {
            icon: (
              <Icon name="operator_match" type="line" color="currentColor" />
            ),
            label: "含む",
          },
          {
            icon: (
              <Icon
                name="operator_does_not_match"
                type="line"
                color="currentColor"
              />
            ),
            label: "含まない",
          },
          {
            icon: (
              <Icon name="operator_contains" type="line" color="currentColor" />
            ),
            label: "いずれかを含む",
          },
        ]}
        onSelectChange={jest.fn}
      >
        children
      </FilterInputAbstract>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
