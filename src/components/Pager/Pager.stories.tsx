import * as React from "react";
import styled from "styled-components";
import Pager, { useFilterState, getFilteredItems } from "./";
import Flex from "../Flex";
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
`;

const Column = styled.div`
  & + & {
    margin-left: ${({ theme }) => theme.spacing * 5}px;
  }
`;

export default {
  title: "Pager",
  parameters: {
    component: Pager
  }
};

const BasicExample: React.FunctionComponent = () => {
  const mockArray: number[] = [...Array(61)].map((_, i) => i);
  const [filterState, setFilterState] = useFilterState();

  const filteredItems = getFilteredItems(mockArray, filterState);

  const onHandleChangePager = (index: number) => {
    setFilterState({ ...filterState, index });
  };

  return (
    <>
      <ul>
        {filteredItems.map(num => (
          <li key={num}>{num}</li>
        ))}
      </ul>
      <Flex display="flex" alignItems="center" justifyContent="space-between">
        <Pager
          per={filterState.per}
          total={mockArray.length}
          index={filterState.index}
          onClick={onHandleChangePager}
        />
      </Flex>
    </>
  );
};

export const Overview = () => (
  <Container>
    <Typography weight="bold" size="xxl">
      Basic Example
    </Typography>
    <RowContainer>
      <BasicExample />
    </RowContainer>

    <Typography weight="bold" size="xxl">
      Design Sample
    </Typography>
    <RowContainer flex>
      <Column>
        <Typography weight="bold" size="xxl">
          Can&apos;t Forward
        </Typography>
        <Spacer mb={3} />
        <Pager per={1} total={2} index={2} onClick={() => {}} />
      </Column>
      <Column>
        <Typography weight="bold" size="xxl">
          Can&apos;t Back
        </Typography>
        <Spacer mb={3} />
        <Pager per={1} total={2} index={1} onClick={() => {}} />
      </Column>
      <Column>
        <Typography weight="bold" size="xxl">
          Can Both
        </Typography>
        <Spacer mb={3} />
        <Pager per={1} total={3} index={2} onClick={() => {}} />
      </Column>
    </RowContainer>

    <RowContainer flex>
      <Column>
        <Typography weight="bold" size="xxl">
          Left Three Dots
        </Typography>
        <Spacer mb={3} />
        <Pager per={1} total={7} index={7} onClick={() => {}} />
      </Column>
      <Column>
        <Typography weight="bold" size="xxl">
          Both Three Dots
        </Typography>
        <Spacer mb={3} />
        <Pager per={1} total={7} index={4} onClick={() => {}} />
      </Column>
      <Column>
        <Typography weight="bold" size="xxl">
          Rignt Three Dots
        </Typography>
        <Spacer mb={3} />
        <Pager per={1} total={7} index={1} onClick={() => {}} />
      </Column>
    </RowContainer>
  </Container>
  /* eslint-enable react/jsx-no-bind */
);
