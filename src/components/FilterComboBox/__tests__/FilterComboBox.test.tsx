import * as React from "react";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import { FilterSelectInput } from "../";
import Icon from "../../Icon";

describe("FileUploader component testing", () => {
  afterEach(cleanup);

  test("FileUploader", () => {
    const { asFragment } = renderWithThemeProvider(
      <FilterSelectInput
        value="項目1"
        values={[
          "項目1",
          "value2",
          "すごく長い値すごく長い値すごく長い値すごく長い値すごく長い値",
        ]}
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
        onChange={jest.fn}
        onSelectChange={jest.fn}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
