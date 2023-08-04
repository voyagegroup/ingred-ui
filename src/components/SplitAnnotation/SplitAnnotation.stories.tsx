import * as React from "react";
import Flex from "../Flex";
import Typography from "../Typography";
import SplitAnnotation from "./SplitAnnotation";

export default {
  title: "Components/Data Display/SplitAnnotation",
  component: SplitAnnotation,
};

export const Sample = () => (
  <Flex display="flex" alignItems="flex-start">
    <Typography size="md" weight="bold">
      Title
    </Typography>
    <SplitAnnotation>
      <Typography size="sm">discription</Typography>
    </SplitAnnotation>
  </Flex>
);
