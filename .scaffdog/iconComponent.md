---
name: "icon component"
description: "component of description"
message: "Please enter icon name."
root: "src/components/Icon/internal/"
output: '!*'
ignore: []
---

# `{{ input | pascal }}Icon/index.tsx`

```typescript
import * as React from "react";
import { IconProps } from "../../Icon";

const {{ input | pascal }}Icon: React.FunctionComponent<IconProps> = ({ type, fill }) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            fill={fill}
            d=""
          />
        </svg>
      );
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path
            fill={fill}
            d=""
          />
        </svg>
      );
  }
};

export { {{ input | pascal }}Icon };

```
