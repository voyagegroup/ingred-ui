import * as React from "react";
import Icon, { icons, IconName, Props } from "./Icon";
import Typography from "../Typography";
import Flex from "../Flex";
import Spacer from "../Spacer";
import styled from "styled-components";
import { useTheme } from "../../themes/useTheme";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

const RowContainer = styled.div`
  margin: ${({ theme }) => theme.spacing * 3}px;
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const Column = styled.div`
  width: calc(100% / 6);
  padding: ${({ theme }) => theme.spacing * 2}px
    ${({ theme }) => theme.spacing * 3}px;
`;

export default {
  title: "Components/Data Display/Icon",
  component: Icon,
  args: {
    name: "dashboard",
  },
};

const renderIcons = (props: Omit<Props, "name">) => (
  <RowContainer>
    <Flex display="flex" alignItems="center" flexWrap="wrap">
      {Object.keys(icons).map((iconName) => (
        <Column key={iconName}>
          <Flex display="flex" alignItems="center">
            <Spacer pr={1}>
              <Icon name={iconName as IconName} {...props} />
            </Spacer>
            <Typography>{iconName}</Typography>
          </Flex>
        </Column>
      ))}
    </Flex>
  </RowContainer>
);

export const Sample: React.FunctionComponent<Props> = (args) => (
  <Icon {...args} />
);

export const Overview = () => (
  <Container>
    <Typography weight="bold" size="xxl">
      size: lg (24px)
    </Typography>
    {renderIcons({ size: "lg" })}

    <Typography weight="bold" size="xxl">
      size: md (18px)
    </Typography>
    {renderIcons({ size: "md" })}

    <Typography weight="bold" size="xxl">
      size: sm (12px)
    </Typography>
    {renderIcons({ size: "sm" })}
  </Container>
);

export const ForColor = () => {
  const theme = useTheme();
  return (
    <Container>
      <Typography weight="bold" size="xxl">
        active
      </Typography>
      {renderIcons({ size: "lg", color: "active" })}

      <Typography weight="bold" size="xxl">
        fill
      </Typography>
      {renderIcons({ size: "lg", color: "fill", type: "fill" })}

      <Typography weight="bold" size="xxl">
        line
      </Typography>
      {renderIcons({ size: "lg", color: "line" })}

      <Typography weight="bold" size="xxl">
        other
      </Typography>
      {renderIcons({
        size: "lg",
        color: theme.palette.danger.main,
      })}
    </Container>
  );
};
