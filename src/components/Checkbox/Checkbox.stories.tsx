import { action } from "@storybook/addon-actions";

import React from "react";
import Checkbox from ".";
import Spacer from "../Spacer";

export default {
  title: "Checkbox",
  parameters: {
    components: Checkbox,
  },
};

export const Overview = () => (
  <>
    <Checkbox checked={true} name="group" onChange={action("onChange1")}>
      チェックボックス
    </Checkbox>
    <Spacer pt={1} />
    <Checkbox name="group" onChange={action("onChange2")}>
      チェックボックス
    </Checkbox>
    <Spacer pt={1} />
    <Checkbox disabled={true} name="group" onChange={action("onChange2")}>
      チェックボックス
    </Checkbox>
    <Spacer pt={1} />
    <Checkbox
      checked={true}
      disabled={true}
      name="group"
      onChange={action("onChange2")}
    >
      チェックボックス
    </Checkbox>
    <Spacer pt={1} />
    <Checkbox error={true} name="group" onChange={action("onChange2")}>
      チェックボックス
    </Checkbox>
  </>
);
