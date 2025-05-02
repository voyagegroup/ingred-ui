import { addons } from "@storybook/manager-api";
import myTheme from "./myTheme";
import "../assets/IngredUi/faviconIngredUi.png";

addons.setConfig({
  theme: myTheme,
});
