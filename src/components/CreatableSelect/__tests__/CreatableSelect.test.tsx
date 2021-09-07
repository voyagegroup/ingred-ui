import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import CreatableSelect from "../CreatableSelect";
import { OptionType } from "../../Select";

describe("CreatableSelect component testing", () => {
  afterEach(cleanup);

  const options: OptionType[] = [
    { label: "hoge", value: "1" },
    { label: "huga", value: "2" },
  ];

  describe("Normal", () => {
    test("not CreatableSelected", () => {
      const { asFragment } = renderWithThemeProvider(
        <CreatableSelect menuIsOpen options={options} />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
    test("one CreatableSelected", () => {
      const { asFragment } = renderWithThemeProvider(
        <CreatableSelect
          menuIsOpen
          options={options}
          defaultValue={{ label: "hoge", value: "1" }}
        />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
    test("multiple CreatableSelected", () => {
      const { asFragment } = renderWithThemeProvider(
        <CreatableSelect
          menuIsOpen
          isMulti
          options={options}
          defaultValue={[
            { label: "hoge", value: "1" },
            { label: "huga", value: "2" },
          ]}
        />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("Disable", () => {
    test("not CreatableSelected", () => {
      const { asFragment } = renderWithThemeProvider(
        <CreatableSelect menuIsOpen isDisabled options={options} />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
    test("one CreatableSelected", () => {
      const { asFragment } = renderWithThemeProvider(
        <CreatableSelect
          menuIsOpen
          isDisabled
          options={options}
          defaultValue={{ label: "hoge", value: "1" }}
        />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
    test("multiple CreatableSelected", () => {
      const { asFragment } = renderWithThemeProvider(
        <CreatableSelect
          menuIsOpen
          isDisabled
          isMulti
          options={options}
          defaultValue={[
            { label: "hoge", value: "1" },
            { label: "huga", value: "2" },
          ]}
        />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("Error", () => {
    test("not CreatableSelected", () => {
      const { asFragment } = renderWithThemeProvider(
        <CreatableSelect menuIsOpen error options={options} />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
    test("one CreatableSelected", () => {
      const { asFragment } = renderWithThemeProvider(
        <CreatableSelect
          menuIsOpen
          error
          options={options}
          defaultValue={{ label: "hoge", value: "1" }}
        />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
    test("multiple CreatableSelected", () => {
      const { asFragment } = renderWithThemeProvider(
        <CreatableSelect
          menuIsOpen
          error
          isMulti
          options={options}
          defaultValue={[
            { label: "hoge", value: "1" },
            { label: "huga", value: "2" },
          ]}
        />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
