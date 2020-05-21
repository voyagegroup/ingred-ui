import React from "react";
import { Tooltip } from "./index";
import Spacer from "../Spacer";

export default {
  title: "Tooltip",
  component: Tooltip,
};

export const Basic = () => {
  return (
    <Spacer p={50}>
      <Tooltip content="RIGHT-ENDhogehogehogheo">
        <button style={{ width: "150px" }}>Hover Me!</button>
      </Tooltip>
    </Spacer>
  );
};
