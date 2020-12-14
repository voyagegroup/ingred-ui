import { action } from "@storybook/addon-actions";

import React from "react";
import RadioButton, { RadioButtonSize } from "./";
import Spacer from "../Spacer";

export default {
  title: "Components/Inputs/RadioButton",
  component: RadioButton,
  parameters: {
    docs: { page: null },
  },
};

export const Overview = () => (
  <>
    <RadioButton
      defaultChecked={true}
      name="group"
      onChange={action("onChange1")}
    >
      ラジオボタン
    </RadioButton>
    <Spacer mt={1} />
    <RadioButton name="group" onChange={action("onChange2")}>
      ラジオボタン
    </RadioButton>
    <Spacer mt={1} />
    <RadioButton disabled={true} onChange={action("onChange2")}>
      ラジオボタン
    </RadioButton>
    <Spacer mt={1} />
    <RadioButton disabled={true} checked={true} onChange={action("onChange2")}>
      ラジオボタン
    </RadioButton>
  </>
);

export const WithControled = () => (
  <RadioButton checked name="group" onChange={action("onChange")} />
);

export const WithLongLabel = () => (
  <>
    <RadioButton
      name="group"
      size={RadioButtonSize.MEDIUM}
      onChange={action("onChange")}
    >
      {"長いラベル ".repeat(15).trim()}
    </RadioButton>
  </>
);
