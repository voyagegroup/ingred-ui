---
"ingred-ui": minor
---

Storybook v8へアップグレード

- Storybook v6からv7を経由してv8にアップグレード
- ストーリーファイルの型定義を新しい形式に更新
  - `Meta<typeof Component>` → `satisfies Meta<typeof Component>`
  - `StoryObj<typeof Component>` → `StoryObj<typeof meta>`
  - `Template.bind({})` → オブジェクト形式に変更
- `.storybook/main.ts`の設定を更新
  - `autodocs: true`に変更
  - `defaultName: 'Documentation'`を追加