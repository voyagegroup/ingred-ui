import * as React from "react";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import { FilterTagInput } from "../";
import Icon from "../../Icon";
import { colors } from "../../../styles";

describe("FileUploader component testing", () => {
  afterEach(cleanup);

  test("FileUploader", () => {
    const { asFragment } = renderWithThemeProvider(
      <FilterTagInput
        values={["テキスト", "value2", "value3"]}
        selectedIndex={0}
        selectOptions={[
          {
            icon: (
              <Icon
                name="operator_match"
                type="line"
                color={colors.basic[900]}
              />
            ),
            label: "含む",
          },
          {
            icon: (
              <Icon
                name="operator_does_not_match"
                type="line"
                color={colors.basic[900]}
              />
            ),
            label: "含まない",
          },
          {
            icon: (
              <Icon
                name="operator_contains"
                type="line"
                color={colors.basic[900]}
              />
            ),
            label: "いずれかを含む",
          },
          {
            icon: (
              <Icon
                name="operator_starts_with"
                type="line"
                color={colors.basic[900]}
              />
            ),
            label: "で始まる",
          },
          {
            icon: (
              <Icon
                name="operator_ends_with"
                type="line"
                color={colors.basic[900]}
              />
            ),
            label: "で終わる",
          },
          {
            icon: (
              <Icon
                name="operator_equal"
                type="line"
                color={colors.basic[900]}
              />
            ),
            label: "同じ",
          },
          {
            icon: (
              <Icon
                name="operator_not_equal"
                type="line"
                color={colors.basic[900]}
              />
            ),
            label: "同じでない",
          },
        ]}
        onChange={jest.fn()}
        onSelectChange={jest.fn()}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
