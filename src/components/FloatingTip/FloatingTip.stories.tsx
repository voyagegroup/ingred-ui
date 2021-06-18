import * as React from "react";
import styled from "styled-components";
import FloatingTip from ".";
import Icon from "../Icon";
import { FloatingTipProps } from "./FloatingTip";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  margin: ${({ theme }) => theme.spacing * 3}px;
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;

export default {
  title: "Components/Data Display/FloatingTip",
  component: FloatingTip,
};

export const Sample: React.FunctionComponent<FloatingTipProps> = (args) => {
  const [iconWrapperElement, setIconWrapperElement] =
    React.useState<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const handleIsOpen = (isOpen: boolean) => () => {
    setIsOpen(isOpen);
  };
  return (
    <Container>
      <p>Source code is written in &rdquo;Story&rdquo; Tab at footer.</p>
      <RowContainer>
        <IconWrapper
          ref={setIconWrapperElement}
          onClick={handleIsOpen(!isOpen)}
        >
          <Icon name="question" type="fill" />
        </IconWrapper>
        <FloatingTip
          {...args}
          baseElement={iconWrapperElement}
          isOpen={isOpen || !!args.isOpen}
          onClose={handleIsOpen(false)}
        >
          <p>Some message.</p>
        </FloatingTip>
      </RowContainer>
    </Container>
  );
};
