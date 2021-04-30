---
name: "component"
description: "component of description"
message: "Please enter component name."
root: "src/components"
output: '**/*'
ignore: []
---

# `{{ input | pascal }}/index.tsx`

```typescript
export { default } from "./{{ input | pascal }}";
export type { {{ input | pascal }}Props } from "./{{ input | pascal }}";

```

# `{{ input | pascal }}/{{ input | pascal }}.tsx`

```typescript
import * as React from "react";
import * as Styled from "./styled";

export type {{ input | pascal }}Props = {
}

const {{ input | pascal }}: React.FunctionComponent<{{ input | pascal }}Props> = () => (
  <Styled.Container>

  </Styled.Container>
);

export default {{ input | pascal }};

```

# `{{ input | pascal }}/styled.ts`

```typescript
import styled from "styled-components";

export const Container = styled.div``;

```

# `{{ input | pascal }}/__tests__/{{ input | pascal }}.test.tsx`

```typescript
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import {{ input | pascal }} from "../";

describe("{{ input | pascal }} component testing", () => {
  afterEach(cleanup);

  test("{{ input | pascal }}", () => {
    const { asFragment } = renderWithThemeProvider(<{{ input | pascal }} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

```

# `{{ input | pascal }}/{{ input | pascal }}.stories.tsx`

```typescript
import * as React from "react";
import { Story } from "@storybook/react/types-6-0";
import {{ input | pascal }}, { {{ input | pascal }}Props } from ".";

export default {
  title: "Components/〇〇/{{ input | pascal }}",
  component: {{ input | pascal }},
};

export const Example: Story<{{ input | pascal }}Props> = (args) => (
  <{{ input | pascal }} {...args} />
);
```
