import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Select from "../";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import { OptionType } from "../Select";

describe("Select component testing", () => {
  afterEach(cleanup);

  const options: OptionType[] = [
    { label: "hoge", value: "1" },
    { label: "huga", value: "2" },
  ];

  describe("Normal", () => {
    test("not selected", () => {
      const { asFragment } = renderWithThemeProvider(
        <Select menuIsOpen options={options} />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
    test("one selected", () => {
      const { asFragment } = renderWithThemeProvider(
        <Select
          menuIsOpen
          options={options}
          defaultValue={{ label: "hoge", value: "1" }}
        />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
    test("multiple selected", () => {
      const { asFragment } = renderWithThemeProvider(
        <Select
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
    test("not selected", () => {
      const { asFragment } = renderWithThemeProvider(
        <Select menuIsOpen isDisabled options={options} />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
    test("one selected", () => {
      const { asFragment } = renderWithThemeProvider(
        <Select
          menuIsOpen
          isDisabled
          options={options}
          defaultValue={{ label: "hoge", value: "1" }}
        />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
    test("multiple selected", () => {
      const { asFragment } = renderWithThemeProvider(
        <Select
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
    test("not selected", () => {
      const { asFragment } = renderWithThemeProvider(
        <Select menuIsOpen error options={options} />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
    test("one selected", () => {
      const { asFragment } = renderWithThemeProvider(
        <Select
          menuIsOpen
          error
          options={options}
          defaultValue={{ label: "hoge", value: "1" }}
        />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
    test("multiple selected", () => {
      const { asFragment } = renderWithThemeProvider(
        <Select
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
