---
name: "one type icon component"
description: "component of description"
message: "Please enter icon name."
root: "src/components/atoms/Icon/internal/"
ignore: []
---

# `{{ input | pascal }}Icon/index.tsx`

```typescript
import * as React from "react";
import { IconProps } from "../../Icon";

const {{ input | pascal }}Icon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        fill={fill}
        d=""
      />
    </svg>
  )
};

export { {{ input | pascal }}Icon };

```
