import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DataTable2 } from "../DataTable2";
import { DataTable2Head } from "../DataTable2Head";
import { DataTable2Body } from "../DataTable2Body";
import { DataTable2Column } from "../DataTable2Column";
import { DataTable2Row } from "../DataTable2Row";
import { DataTable2Cell } from "../DataTable2Cell";
import { ThemeProvider, defaultTheme } from "../../../themes";

const mockColumns = [
  {
    id: "name",
    label: "Name",
    visible: true,
    order: 0,
    sortable: true,
    filtered: false,
  },
  {
    id: "status",
    label: "Status",
    visible: true,
    order: 1,
    sortable: true,
    filtered: false,
  },
];

const TestDataTable2 = ({
  availableRowIds,
  onCheckedRowsChange,
}: {
  availableRowIds?: string[];
  onCheckedRowsChange?: (checkedRows: string[]) => void;
}) => (
  <ThemeProvider theme={defaultTheme}>
    <DataTable2
      currentPage={0}
      pageSize={10}
      pageSizeOptions={[10, 20]}
      totalCount={3}
      columns={mockColumns}
      availableRowIds={availableRowIds}
      rowControls={<div>Row controls</div>}
      onCheckedRowsChange={onCheckedRowsChange}
      onPageChange={() => {}}
      onPageSizeChange={() => {}}
      onColumnsChange={() => {}}
    >
      <DataTable2Head>
        <DataTable2Column>Name</DataTable2Column>
        <DataTable2Column>Status</DataTable2Column>
      </DataTable2Head>
      <DataTable2Body>
        <DataTable2Row id="row1">
          <DataTable2Cell>Item 1</DataTable2Cell>
          <DataTable2Cell>Active</DataTable2Cell>
        </DataTable2Row>
        <DataTable2Row id="row2">
          <DataTable2Cell>Item 2</DataTable2Cell>
          <DataTable2Cell>Inactive</DataTable2Cell>
        </DataTable2Row>
        <DataTable2Row id="row3">
          <DataTable2Cell>Item 3</DataTable2Cell>
          <DataTable2Cell>Active</DataTable2Cell>
        </DataTable2Row>
      </DataTable2Body>
    </DataTable2>
  </ThemeProvider>
);

describe("DataTable2", () => {
  it("通常の一括選択が正常に動作する", () => {
    const onCheckedRowsChange = jest.fn();
    render(<TestDataTable2 onCheckedRowsChange={onCheckedRowsChange} />);

    // ヘッダーのチェックボックスをクリックして一括選択
    const headerCheckbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(headerCheckbox);

    // 全ての行が選択されることを確認
    expect(onCheckedRowsChange).toHaveBeenCalledWith(["row1", "row2", "row3"]);
  });

  it("availableRowIdsが指定された場合、指定された行のみが一括選択される", () => {
    const onCheckedRowsChange = jest.fn();
    render(
      <TestDataTable2
        availableRowIds={["row1", "row3"]}
        onCheckedRowsChange={onCheckedRowsChange}
      />,
    );

    // ヘッダーのチェックボックスをクリックして一括選択
    const headerCheckbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(headerCheckbox);

    // availableRowIdsで指定された行のみが選択されることを確認
    expect(onCheckedRowsChange).toHaveBeenCalledWith(["row1", "row3"]);
  });

  it("availableRowIdsが変更されると、選択状態が自動的にフィルタリングされる", () => {
    const onCheckedRowsChange = jest.fn();
    const { rerender } = render(
      <TestDataTable2 onCheckedRowsChange={onCheckedRowsChange} />,
    );

    // 最初に全行を選択
    const headerCheckbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(headerCheckbox);

    expect(onCheckedRowsChange).toHaveBeenLastCalledWith([
      "row1",
      "row2",
      "row3",
    ]);

    // availableRowIdsを指定して再レンダリング
    rerender(
      <TestDataTable2
        availableRowIds={["row1", "row3"]}
        onCheckedRowsChange={onCheckedRowsChange}
      />,
    );

    // 無効な行（row2）が選択状態から除外されることを確認
    expect(onCheckedRowsChange).toHaveBeenLastCalledWith(["row1", "row3"]);
  });

  it("availableRowIdsが空配列の場合、全ての選択が解除される", () => {
    const onCheckedRowsChange = jest.fn();
    const { rerender } = render(
      <TestDataTable2 onCheckedRowsChange={onCheckedRowsChange} />,
    );

    // 最初に全行を選択
    const headerCheckbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(headerCheckbox);

    expect(onCheckedRowsChange).toHaveBeenLastCalledWith([
      "row1",
      "row2",
      "row3",
    ]);

    // availableRowIdsを空配列で再レンダリング
    rerender(
      <TestDataTable2
        availableRowIds={[]}
        onCheckedRowsChange={onCheckedRowsChange}
      />,
    );

    // 全ての選択が解除されることを確認
    expect(onCheckedRowsChange).toHaveBeenLastCalledWith([]);
  });

  it("個別の行選択でも、availableRowIdsでフィルタリングが行われる", () => {
    const onCheckedRowsChange = jest.fn();
    render(
      <TestDataTable2
        availableRowIds={["row1", "row3"]}
        onCheckedRowsChange={onCheckedRowsChange}
      />,
    );

    // row1を選択
    const row1Checkbox = screen.getAllByRole("checkbox")[1]; // 0番目はヘッダー
    fireEvent.click(row1Checkbox);

    expect(onCheckedRowsChange).toHaveBeenCalledWith(["row1"]);

    // row2を選択しようとする（availableRowIdsに含まれていない）
    const row2Checkbox = screen.getAllByRole("checkbox")[2];
    fireEvent.click(row2Checkbox);

    // row2は選択されないことを確認（availableRowIdsに含まれていないため）
    expect(onCheckedRowsChange).toHaveBeenLastCalledWith(["row1"]);
  });
});
