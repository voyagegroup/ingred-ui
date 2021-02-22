import * as React from "react";
import styled from "styled-components";
import Pager, { useFilterState, getFilteredItems, PagerProps } from "./";
import { Story } from "@storybook/react/types-6-0";
import Typography from "../Typography";
import Spacer from "../Spacer";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

const RowContainer = styled.div<{ minHeight?: string; flex?: boolean }>`
  display: ${({ flex }) => (flex ? "flex" : "block")};
  align-items: ${({ flex }) => (flex ? "flex-start" : "normal")};
  margin: ${({ theme }) => theme.spacing * 3}px;
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.default};
  min-height: ${({ minHeight }) => minHeight || "0"};
  flex-wrap: wrap;
`;

export default {
  title: "Components/Data Display/Pager",
  component: Pager,
};

export const Example: Story<PagerProps> = () => {
  const mockArray: number[] = [...Array(61)].map((_, i) => i);

  // MEMO: `usefilterState()` & `getFilteredItems()` is available from ingred-ui.
  // e.g. filterState = { per: 10, index: 3 }
  const [filterState, setFilterState] = useFilterState(10, 1); // (per, index)
  const filteredItems = getFilteredItems(mockArray, filterState);

  const handleChangePager = (index: number) => {
    setFilterState({ ...filterState, index });
  };

  return (
    <>
      <ul>
        {filteredItems.map((num) => (
          <li key={num}>{num}</li>
        ))}
      </ul>
      <Pager
        per={filterState.per}
        total={mockArray.length}
        index={filterState.index}
        onClick={handleChangePager}
      />
    </>
  );
};

export const DesignSamples: Story = () => (
  <Container>
    <RowContainer flex>
      <div>
        <Typography weight="bold" size="xxl">
          Can&apos;t Forward
        </Typography>
        <Spacer mb={3} />
        <Pager per={1} total={2} index={2} onClick={() => {}} />
      </div>
      <Spacer pr={5} />
      <div>
        <Typography weight="bold" size="xxl">
          Can&apos;t Back
        </Typography>
        <Spacer mb={3} />
        <Pager per={1} total={2} index={1} onClick={() => {}} />
      </div>
      <Spacer pr={5} />
      <div>
        <Typography weight="bold" size="xxl">
          Can Both
        </Typography>
        <Spacer mb={3} />
        <Pager per={1} total={3} index={2} onClick={() => {}} />
      </div>
    </RowContainer>

    <RowContainer flex>
      <div>
        <Typography weight="bold" size="xxl">
          Left Three Dots
        </Typography>
        <Spacer mb={3} />
        <Pager per={1} total={7} index={7} onClick={() => {}} />
      </div>
      <Spacer pr={5} />
      <div>
        <Typography weight="bold" size="xxl">
          Both Three Dots
        </Typography>
        <Spacer mb={3} />
        <Pager per={1} total={7} index={4} onClick={() => {}} />
      </div>
      <Spacer pr={5} />
      <div>
        <Typography weight="bold" size="xxl">
          Rignt Three Dots
        </Typography>
        <Spacer mb={3} />
        <Pager per={1} total={7} index={1} onClick={() => {}} />
      </div>
    </RowContainer>
  </Container>
);
