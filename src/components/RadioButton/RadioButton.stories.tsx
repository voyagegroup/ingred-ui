import { action } from "@storybook/addon-actions";

import React from "react";
import RadioButton, { RadioButtonSize } from "./";

export default {
  title: "RadioButton",
  parameters: {
    components: RadioButton
  }
};

export const Overview = () => (
  <>
    <div style={{ marginBottom: 16 }}>
      <RadioButton
        defaultChecked={true}
        name="group"
        onChange={action("onChange1")}
      >
        ラジオボタン
      </RadioButton>
    </div>
    <div>
      <RadioButton name="group" onChange={action("onChange2")}>
        ラジオボタン
      </RadioButton>
    </div>
  </>
);

export const WithControled = () => (
  <RadioButton checked name="group" onChange={action("onChange")} />
);

export const WithLongLabel = () => (
  <>
    <div style={{ marginBottom: 16 }}>
      <RadioButton
        name="group"
        size={RadioButtonSize.MEDIUM}
        onChange={action("onChange")}
      >
        {"長いラベル ".repeat(15).trim()}
      </RadioButton>
    </div>
  </>
);
