export type Item = {
  // 項目の一意の識別子
  id: string;
  // アコーディオンまたはセクションに属す場合、アコーディオン or セクションのラベルを明示する
  groupName?: string;
  // 項目のラベル
  label: string;
  // 階層構造のための追加プロパティ
  parentNode?: string;
  childNode?: string;
};
