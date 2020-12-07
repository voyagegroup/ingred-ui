---
name: "component"
description: "component of description"
message: "Please enter component name."
root: "src"
ignore: []
---

# `{{ input | pascal }}/index.tsx`

```typescript
export { default, {{ input | pascal }}Props } from "./{{ input | pascal }}";

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

# `{{ input | pascal }}/{{ input | pascal }}.stories.mdx`

```typescript
import { Meta, Story, ArgsTable, Canvas } from "@storybook/addon-docs/blocks";
import {{ input | pascal }} from "./index";

<Meta
  title="{{ input | pascal }}"
  component={ {{ input | pascal }} }
  argTypes={
    { onClick: { action: "clicked" } }
  }
/>

# {{ input | pascal }}

<ArgsTable of={ {{ input | pascal }} } />

## Samples

### Something

<Canvas>
  <Story
    name="something"
    args={{}}
  >
    {(args) => <{{ input | pascal }} {...args} />}
  </Story>
</Canvas>

```
