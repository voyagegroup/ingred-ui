---
"ingred-ui": patch
---

Dual listbox2で件数変更メニューが不要な場合でも強制的に表示されてしまう状態だったのを修正したもの。

- menuButtons propsを判定する表示制御を組み込んだ
- その他細かい修正
  - 不要なwidthの削除
  - css gridの動的な変更