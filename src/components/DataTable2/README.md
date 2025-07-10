# DataTable2 Component

高度なテーブル機能を提供するReactコンポーネントです。ページネーション、ソート、フィルタリング、一括操作などの機能を統合的に提供します。

## 概要

DataTable2は大規模なデータセットを効率的に表示・操作するためのコンポーネントです。デスクトップとモバイルの両方でシームレスに動作し、豊富なカスタマイズオプションを提供します。

## 主な機能

- ✅ **ページネーション**: 大量データの効率的な表示
- ✅ **ソート機能**: カラムごとの昇順・降順ソート
- ✅ **フィルタリング**: 複数条件での絞り込み
- ✅ **一括操作**: 選択行に対するバッチ処理
- ✅ **レスポンシブ対応**: デスクトップ・モバイル最適化
- ✅ **カラム管理**: 表示・非表示、並び替え
- ✅ **カスタマイズ**: 柔軟なアクション定義

## 設計思想

1. **関心の分離**: 型定義、ユーティリティ、UI描画を明確に分離
2. **段階的リファクタリング**: 既存APIの100%互換性を保持
3. **テスト駆動**: 全変更に対してテストを先行実装
4. **パフォーマンス重視**: 関数の再利用とメモ化を活用

## API リファレンス

### 基本的な使用方法

```tsx
import {
  DataTable2,
  DataTable2Head,
  DataTable2Row,
  DataTable2Cell,
} from "@ingred-ui/ingred-ui";

function MyTable() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [columns, setColumns] = useState([
    { id: "name", label: "名前", sortable: true },
    { id: "email", label: "メール", sortable: true },
  ]);

  return (
    <DataTable2
      columns={columns}
      currentPage={currentPage}
      pageSize={pageSize}
      totalCount={100}
      onPageChange={setCurrentPage}
      onPageSizeChange={setPageSize}
      onColumnsChange={setColumns}
    >
      <DataTable2Head />
      {data.map((row) => (
        <DataTable2Row key={row.id} id={row.id}>
          <DataTable2Cell>{row.name}</DataTable2Cell>
          <DataTable2Cell>{row.email}</DataTable2Cell>
        </DataTable2Row>
      ))}
    </DataTable2>
  );
}
```

### Props

#### DataTable2Props

| Prop                    | Type                                    | Required | Description                  |
| ----------------------- | --------------------------------------- | -------- | ---------------------------- |
| `columns`               | `TableColumn[]`                         | ✅       | カラム定義配列               |
| `currentPage`           | `number`                                | ✅       | 現在のページ番号             |
| `pageSize`              | `number`                                | ✅       | 1ページあたりの表示件数      |
| `pageSizeOptions`       | `number[]`                              | ✅       | ページサイズ選択肢           |
| `totalCount`            | `number`                                | ✅       | 全件数                       |
| `onPageChange`          | `(page: number) => void`                | ✅       | ページ変更コールバック       |
| `onPageSizeChange`      | `(size: number) => void`                | ✅       | ページサイズ変更コールバック |
| `onColumnsChange`       | `(columns: TableColumn[]) => void`      | ✅       | カラム状態変更コールバック   |
| `tableActions`          | `TableAction[]`                         | ❌       | テーブルアクション定義       |
| `customTableActionArea` | `(context: ActionContext) => ReactNode` | ❌       | カスタムアクションエリア     |
| `bordered`              | `boolean`                               | ❌       | 枠線表示フラグ               |
| `onCheckedRowsChange`   | `(rows: string[]) => void`              | ❌       | 選択行変更コールバック       |

#### TableColumn

```tsx
interface TableColumn {
  id: string; // カラム識別子
  label: string; // 表示ラベル
  sortable?: boolean; // ソート可能フラグ
  visible?: boolean; // 表示・非表示
  order: number; // 表示順序
  fixed?: "start" | "end"; // 固定位置
  filtered?: boolean; // フィルタ適用状態
}
```

## 一括操作機能 (TableActions)

### 基本概念

一括操作は`enabledWhen`と`displayIn`プロパティで表示位置と有効条件を制御します：

```tsx
type TableAction = {
  type: "singleButton" | "groupButton" | "separator" | "heading" | "divider";
  enabledWhen?: "checked" | "unchecked" | "custom";
  displayIn?: "toolbar" | "dropdown";
  // その他のプロパティ...
};
```

### 表示位置マトリックス

| enabledWhen | displayIn  | デスクトップ    | モバイル                    |
| ----------- | ---------- | --------------- | --------------------------- |
| `checked`   | `toolbar`  | 左側直接ボタン  | 「n件を操作」ドロップダウン |
| `checked`   | `dropdown` | 左側3点リーダー | 「n件を操作」ドロップダウン |
| `unchecked` | `toolbar`  | 右側直接ボタン  | 右側3点リーダー             |
| `unchecked` | `dropdown` | 右側3点リーダー | 右側3点リーダー             |

### 動的アイコン色 (dynamicIconColor)

アイコンの色を選択状態に応じて動的に変更できます：

```tsx
const tableActions: TableAction[] = [
  {
    type: "singleButton",
    label: "有効にする",
    icon: <Icon name="circle" type="fill" color="currentColor" />,
    enabledWhen: "checked",
    dynamicIconColor: {
      enabled: "success", // 選択時: 緑色
      disabled: "currentColor", // 非選択時: デフォルト色
    },
    onClick: (selectedRows) => {
      // 選択行を有効化
    },
  },
  {
    type: "singleButton",
    label: "停止する",
    icon: <Icon name="circle" type="fill" color="currentColor" />,
    enabledWhen: "checked",
    dynamicIconColor: {
      enabled: "danger", // 選択時: 赤色
      disabled: "currentColor",
    },
    onClick: (selectedRows) => {
      // 選択行を停止
    },
  },
];
```

#### サポートされる色

- `success`: テーマのsuccess色 (通常は緑)
- `danger`: テーマのdanger色 (通常は赤)
- `primary`: テーマのprimary色
- `warning`: テーマのwarning色
- `currentColor`: 継承色
- その他のCSS色値 (`#ff0000`, `rgb(255,0,0)` など)

### グループ化とヘッディング

モバイル表示では`headingLabel`を使用してアクションをグループ化できます：

```tsx
const tableActions: TableAction[] = [
  {
    type: "groupButton",
    headingLabel: "ステータス変更",
    items: [
      {
        label: "有効にする",
        icon: <Icon name="check" />,
        onClick: (rows) => {
          /* ... */
        },
      },
      {
        label: "無効にする",
        icon: <Icon name="close" />,
        onClick: (rows) => {
          /* ... */
        },
      },
    ],
  },
  {
    type: "separator",
    enabledWhen: "checked",
  },
  {
    type: "heading",
    label: "一括操作",
    enabledWhen: "checked",
  },
];
```

### カスタム有効条件

`enabledWhen: 'custom'`と`disabled`関数で独自の条件を設定：

```tsx
{
  type: 'singleButton',
  label: '特別な操作',
  enabledWhen: 'custom',
  disabled: (checkedRows) => {
    // 3個以上選択された場合のみ有効
    return checkedRows.length < 3;
  },
  onClick: (selectedRows) => { /* ... */ }
}
```

## フィルタリング機能

### カラムレベルフィルタ

```tsx
const columns: TableColumn[] = [
  {
    id: "name",
    label: "名前",
    sortable: true,
    filtered: true, // フィルタ適用中
  },
];

// フィルタ状態変更時
const handleColumnsChange = (newColumns: TableColumn[]) => {
  newColumns.forEach((column) => {
    if (!column.filtered) {
      // このカラムのフィルタがクリアされた
      clearFilterForColumn(column.id);
    }
  });
  setColumns(newColumns);
};
```

## スタイリング

### テーマ対応

DataTable2は`useTheme`フックを使用してテーマに対応しています：

```tsx
// カスタムテーマでの使用
import { ThemeProvider } from "@ingred-ui/ingred-ui";

const customTheme = {
  palette: {
    primary: { main: "#007bff" },
    success: { main: "#28a745" },
    danger: { main: "#dc3545" },
  },
};

<ThemeProvider theme={customTheme}>
  <DataTable2 {...props} />
</ThemeProvider>;
```

### カスタムスタイル

個別のアクションボタンにカスタムスタイルを適用：

```tsx
{
  type: 'singleButton',
  label: 'カスタムボタン',
  style: {
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '4px'
  },
  onClick: (rows) => { /* ... */ }
}
```

## パフォーマンス最適化

### メモ化の活用

```tsx
const tableActions = useMemo(
  () => [
    {
      type: "singleButton",
      label: "削除",
      onClick: (rows) => handleDelete(rows),
    },
  ],
  [],
); // 依存配列を適切に設定

const columns = useMemo(
  () => [{ id: "name", label: "名前", sortable: true }],
  [sortConfig],
); // ソート設定が変更された場合のみ再生成
```

### 大量データの処理

```tsx
// ページング前のデータフィルタリング
const filteredData = useMemo(() => {
  return rawData.filter((item) => item.name.includes(searchTerm));
}, [rawData, searchTerm]);

// 現在ページのデータのみを表示
const pageData = useMemo(() => {
  const start = currentPage * pageSize;
  return filteredData.slice(start, start + pageSize);
}, [filteredData, currentPage, pageSize]);
```

## トラブルシューティング

### よくある問題

**Q: アイコンの色が変わらない**
A: `dynamicIconColor`を使用する場合、アイコンの初期`color`プロパティは`"currentColor"`に設定してください。

**Q: モバイルでアクションが表示されない**
A: `enabledWhen`と`displayIn`の組み合わせを確認してください。モバイル表示では表示位置が異なります。

**Q: ページネーションが正しく動作しない**
A: `totalCount`に全件数（フィルタリング後）、`onPageChange`で状態更新を確実に行ってください。

### デバッグ

開発時にはコンソールでコンポーネントの状態を確認できます：

```tsx
useEffect(() => {
  console.log("Current page:", currentPage);
  console.log("Page size:", pageSize);
  console.log("Total count:", totalCount);
  console.log("Filtered data length:", filteredData.length);
}, [currentPage, pageSize, totalCount, filteredData]);
```
