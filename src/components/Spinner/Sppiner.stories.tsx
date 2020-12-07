import * as React from "react";
import Spinner from "./Spinner";

export default {
  title: "Spinner",
  component: Spinner,
  parameters: {
    docs: { page: null },
  },
};

export const Overview = () => (
  <div>
    <Spinner />
  </div>
);
