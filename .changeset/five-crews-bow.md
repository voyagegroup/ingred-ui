---
"ingred-ui": patch
---

fix(ContextMenu2): ドロップダウンコンポーネントのスタイルと機能を改善

- ContextMenu2のパディングとマージンを調整し、より一貫性のあるデザインに修正
  - パネルのパディングを `10px 8px` から `8px` に統一
  - ヘッダーのパディングを調整（`8px 16px 16px`）
  - アイテム間のマージンを8pxに統一
- FilterSelectInputの検索機能の実装方法を改善（stickyHeaderとして実装）
- Select2の検索機能をオプション化
  - `searchable` propを追加（デフォルト: `false`）
  - 検索機能が無効の場合は検索UIを表示しない
- テキストユーティリティを追加（`textUtils.trimVertical`）