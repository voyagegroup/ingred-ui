import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import DataTable from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("DataTable component testing", () => {
  afterEach(cleanup);

  test("DataTable", () => {
    const { asFragment } = renderWithThemeProvider(
      <DataTable
        columns={[
          { selector: (row) => row.name, name: "A" },
          { selector: (row) => row.name, name: "B" },
        ]}
        data={[
          { id: 1, name: "name1" },
          { id: 2, name: "name2" },
        ]}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
