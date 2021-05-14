---
name: "component"
questions:
  name: "Please enter component name."
root: "src/components"
output: '**/*'
ignore: []
---

# `{{ inputs.name | pascal }}/index.tsx`

```typescript
export { default } from "./{{ inputs.name | pascal }}";
export type { {{ inputs.name | pascal }}Props } from "./{{ inputs.name | pascal }}";

```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.tsx`

```typescript
import * as React from "react";
import * as Styled from "./styled";

export type {{ inputs.name | pascal }}Props = {
}

const {{ inputs.name | pascal }}: React.FunctionComponent<{{ inputs.name | pascal }}Props> = () => (
  <Styled.Container>

  </Styled.Container>
);

export default {{ inputs.name | pascal }};

```

# `{{ inputs.name | pascal }}/styled.ts`

```typescript
import styled from "styled-components";

export const Container = styled.div``;

```

# `{{ inputs.name | pascal }}/__tests__/{{ inputs.name | pascal }}.test.tsx`

```typescript
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import {{ inputs.name | pascal }} from "../";

describe("{{ inputs.name | pascal }} component testing", () => {
  afterEach(cleanup);

  test("{{ inputs.name | pascal }}", () => {
    const { asFragment } = renderWithThemeProvider(<{{ inputs.name | pascal }} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.stories.tsx`

```typescript
import * as React from "react";
import { Story } from "@storybook/react/types-6-0";
import {{ inputs.name | pascal }}, { {{ inputs.name | pascal }}Props } from ".";

export default {
  title: "Components/〇〇/{{ inputs.name | pascal }}",
  component: {{ inputs.name | pascal }},
};

export const Example: Story<{{ inputs.name | pascal }}Props> = (args) => (
  <{{ inputs.name | pascal }} {...args} />
);
```
