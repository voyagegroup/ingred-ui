const { addons } = require("@storybook/manager-api");
require("../assets/IngredUi/faviconIngredUi.png");

// テーマ設定が必要な場合は以下のようにします
// const myTheme = require("./myTheme");
// addons.setConfig({
//   theme: myTheme,
// });

// 基本的な設定
addons.setConfig({
  sidebar: {
    showRoots: true,
  },
}); 