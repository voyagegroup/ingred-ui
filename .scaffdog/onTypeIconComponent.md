---
name: "one type icon component"
questions:
  name: "Please enter icon name."
root: "src/components/Icon/internal/"
output: '!*'
ignore: []
---

# `{{ inputs.name | pascal }}Icon/index.tsx`

```typescript
import * as React from "react";
import { IconProps } from "../../Icon";

const {{ inputs.name | pascal }}Icon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
      <path d="M0 0h18v18H0z" fill="none" />
      <path
        fill={fill}
        d=""
      />
    </svg>
  )
};

export { {{ inputs.name | pascal }}Icon };

```
