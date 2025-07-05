# DataTable2 要件分析レポート

## 要件の整理

### 主旨
テーブル上部のボタン群のユーザビリティ改善

### 具体的な要件
1. **課題**: チェック行に対するアクションが全てプルダウンメニューに隠れていて、ユーザーが気づきづらい
2. **解決策**: 開発者が任意でボタンを露出できるようにしてユーザーに認識しやすくする
3. **動作仕様**:
   - チェックアイテムに対する一括操作ボタン: チェック無し→disable、チェック有り→enable
   - チェックアイテムに無関係なボタン: チェック有り→disable、チェック無し→enable
   - 利用意図が違うボタン間には区切り線を入れることが可能
4. **レスポンシブ対応**:
   - スマホビュー: 一括操作ボタンは全てプルダウンボタンに内包
   - 無関係なボタンも同じプルダウンメニューに内包されるが区切り線で分離

## 実装の要件充足度評価

### ✅ 要件を満たしている部分

#### 1. ボタンの露出機能
- `bulkActions`配列でボタンを定義可能
- デスクトップ時にツールバーに横並びで表示される
- 開発者が任意でボタンを露出できる

#### 2. enable/disable動作
- チェック一括操作: `enabledWhen: "checked"` で適切に制御
- チェック無関係操作: `enabledWhen: "custom"` + `disabled`関数で制御可能

#### 3. 区切り線機能
- `type: "divider"` で区切り線を挿入可能
- デスクトップ時に適切に表示される

#### 4. 基本的なレスポンシブ対応
- `isSmallLayout`で画面サイズを判定
- モバイル・デスクトップで異なるレイアウトを提供

### ❌ 要件を満たしていない部分

#### 1. デフォルト動作が要件と不一致
**問題**: `displayIn`のデフォルトが`"dropdown"`
```typescript
displayIn?: "dropdown" | "toolbar";
// デフォルトは"dropdown"
```

**要件との乖離**: 要件では「ボタンを露出できるようにすることでユーザーに認識できるようにした」とあるが、デフォルトで隠れている。

**実際の使用例**:
```typescript
{
  type: "single",
  label: "新規作成",
  // displayIn: "toolbar" を明示的に指定しないと露出されない
  displayIn: "toolbar",
}
```

#### 2. スマホでのレスポンシブ対応が不完全
**問題**: `displayIn: "toolbar"`指定のボタンがスマホでもツールバーに表示される
```typescript
// モバイル時の処理
const toolbarActions = bulkActions.filter(
  (action) => (action.displayIn ?? "dropdown") === "toolbar",
);
// toolbarActionsはモバイルでもツールバーに表示される
```

**要件との乖離**: 要件では「スマホビューでは一括操作ボタンは全てプルダウンボタンに内包」とあるが、実装では一部がツールバーに残る。

#### 3. ドロップダウンメニューでの区切り線が未実装
**問題**: ドロップダウンメニューでdividerが表示されない
```typescript
} else {
  // divider type
  return []; // 空配列を返すため、区切り線が表示されない
}
```

**要件との乖離**: 要件では「区切り線を入れます」とあるが、実装されていない。

## 開発者体験・設計の評価

### 🔶 複雑性の問題

#### 1. APIの学習コストが高い
開発者が最も基本的な「チェック無関係なボタン」を作る場合：
```typescript
{
  type: "single",
  label: "新規作成",
  onClick: () => {},
  enabledWhen: "custom",                           // 必須
  disabled: (checkedRows) => checkedRows.length > 0, // 必須
  displayIn: "toolbar",                            // 必須
}
```

**問題点**: 3つのプロパティの組み合わせを理解する必要がある。

#### 2. 型定義の冗長性
```typescript
// single と group で似たようなプロパティが重複
type: "single" | "group"
// 両方に同じプロパティが存在
color?, displayIn?, enabledWhen?, disabled?, style?
```

#### 3. 条件分岐の複雑性
```typescript
// renderBulkActionButton 関数が複雑
if (action.type === "single") {
  // single の処理
} else if (action.type === "group") {
  // group の処理
} else {
  // divider の処理
}
```

### 🔶 無駄なコードの存在

#### 1. 重複したdisabled計算
```typescript
// single と group で同じロジックが繰り返される
disabled={
  (action.enabledWhen ?? "checked") === "checked"
    ? checkedRows.length === 0
    : action.disabled?.(checkedRows) ?? false
}
```

#### 2. 複雑な条件分岐
```typescript
// デスクトップ・モバイルの分岐が複雑
if (isSmallLayout) {
  // モバイル時の処理
} else {
  // デスクトップ時の処理
}
```

## 改善提案

### 1. デフォルト動作の修正
```typescript
// 現在
displayIn?: "dropdown" | "toolbar"; // デフォルト: "dropdown"

// 提案
displayIn?: "dropdown" | "toolbar"; // デフォルト: "toolbar"
```

### 2. より直感的なAPI設計
```typescript
// 現在の複雑な設定
{
  type: "single",
  label: "新規作成",
  enabledWhen: "custom",
  disabled: (checkedRows) => checkedRows.length > 0,
  displayIn: "toolbar",
}

// 提案: より直感的な設定
{
  type: "single",
  label: "新規作成",
  enabledWhen: "unchecked", // 新しいオプション
  // displayIn は不要（デフォルトでツールバー）
}
```

### 3. レスポンシブ対応の修正
```typescript
// 提案: モバイル時は全てドロップダウンに統一
if (isSmallLayout) {
  // displayIn の設定に関わらず、全てドロップダウンに表示
  const allActions = bulkActions; // 全てのアクション
} else {
  // デスクトップ時のみ displayIn を考慮
}
```

### 4. 型定義の簡素化
```typescript
// 提案: 共通プロパティを抽出
type BulkActionBase = {
  label: string;
  icon?: React.ReactNode;
  onClick: (selectedRows: string[]) => void;
  color?: "danger" | "primary" | "basicLight";
  enabledWhen?: "checked" | "unchecked" | "custom";
  disabled?: (checkedRows: string[]) => boolean;
};

export type BulkAction =
  | (BulkActionBase & { type: "single" })
  | (BulkActionBase & { type: "group"; items: BulkActionBase[] })
  | { type: "divider" };
```

### 5. ドロップダウンでの区切り線実装
```typescript
// DropdownButton のcontentsで区切り線を表現
contents={[
  { text: "操作1", onClick: () => {} },
  { text: "操作2", onClick: () => {} },
  { isDivider: true }, // 区切り線
  { text: "操作3", onClick: () => {} },
]}
```

## 総合評価

### 要件充足度: 7/10
- 基本的な機能は実装されているが、細部で要件と乖離がある
- デフォルト動作が要件の意図と異なる
- モバイル対応が不完全

### 開発者体験: 6/10
- API が複雑で学習コストが高い
- 最も基本的な使用例でも複数のプロパティの組み合わせが必要
- 型定義が冗長で理解しにくい

### 設計のシンプルさ: 5/10
- 3つの型（single/group/divider）の組み合わせが複雑
- 条件分岐が多く、保守性に課題
- 重複したロジックが存在

### コードの効率性: 6/10
- 適切なリファクタリングが行われている
- 一部で重複したロジックが残っている
- パフォーマンスに大きな問題はない

## 結論

実装は要件の大部分を満たしているものの、以下の点で改善の余地があります：

1. **要件の完全な実装**: デフォルト動作とモバイル対応の修正
2. **開発者体験の向上**: より直感的なAPI設計
3. **コードの簡素化**: 型定義と条件分岐の整理
4. **細部の実装**: ドロップダウンでの区切り線対応

これらの改善により、要件を完全に満たし、開発者にとってより使いやすいコンポーネントになると考えられます。