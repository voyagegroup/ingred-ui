import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Table from "../";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("Table component testing", () => {
  afterEach(cleanup);

  test("Table", () => {
    const { asFragment } = renderWithThemeProvider(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell width="177px">Title</Table.HeaderCell>
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell width="177px">Title</Table.HeaderCell>
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell width="177px">Title</Table.HeaderCell>
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
