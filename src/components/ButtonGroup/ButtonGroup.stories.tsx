import * as React from "react";
import styled from "styled-components";
import ButtonGroup from ".";
import Button from "../Button";
import { boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Typography from "../Typography";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

const RowContainer = styled.div`
  margin: ${({ theme }) => theme.spacing * 3}px;
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const Link: React.FunctionComponent<{ href: string; className: string }> = ({
  href,
  className,
  children,
  ...rest
}) => (
  <a href={href} className={className} onClick={action("clicked")} {...rest}>
    {children}
  </a>
);

export default {
  title: "Components/Inputs/ButtonGroup",
  component: Button,
  parameters: {
    docs: { page: null },
  },
};

export const Overview = () => {
  const midiumButtonRight = boolean("Midium Button Right Disable", false);
  const midiumButtonLeft = boolean("Midium Button Left Disable", false);
  const smallButtonRight = boolean("Small Button Right Disable", false);
  const smallButtonCenterLeft = boolean(
    "Small Button Center Left Disable",
    false,
  );
  const smallButtonCenterRight = boolean(
    "Small Button Center Right Disable",
    false,
  );
  const smallButtonLeft = boolean("Small Button Left Disable", false);
  const linkButtonRight = boolean("Link Mixed Button Right Disable", false);
  const linkButtonCenterLeft = boolean(
    "Link Mixed Button Center Left Disable",
    false,
  );
  const linkButtonCenterRight = boolean(
    "Link Mixed Button Center Right Disable",
    false,
  );
  const linkButtonLeft = boolean("Link Mixed Button Left Disable", false);

  return (
    <Container>
      <Typography weight="bold" size="xxl">
        Medium Button
      </Typography>
      <RowContainer>
        <ButtonGroup>
          <Button disabled={midiumButtonRight} onClick={action("clicked")}>
            保存する
          </Button>
          <Button disabled={midiumButtonLeft} onClick={action("clicked")}>
            編集する
          </Button>
        </ButtonGroup>
      </RowContainer>

      <Typography weight="bold" size="xxl">
        Small Button
      </Typography>
      <RowContainer>
        <ButtonGroup size="small">
          <Button disabled={smallButtonRight} onClick={action("clicked")}>
            保存する
          </Button>
          <Button disabled={smallButtonCenterLeft} onClick={action("clicked")}>
            編集する
          </Button>
          <Button disabled={smallButtonCenterRight} onClick={action("clicked")}>
            削除する
          </Button>
          <Button disabled={smallButtonLeft} onClick={action("clicked")}>
            キャンセル
          </Button>
        </ButtonGroup>
      </RowContainer>

      <Typography weight="bold" size="xxl">
        Link Mixed
      </Typography>
      <RowContainer>
        <ButtonGroup size="small">
          <Button disabled={linkButtonRight} component={Link}>
            保存する
          </Button>
          <Button
            disabled={linkButtonCenterLeft}
            href="#"
            onClick={action("clicked")}
          >
            編集する
          </Button>
          <Button disabled={linkButtonCenterRight} component={Link}>
            削除する
          </Button>
          <Button disabled={linkButtonLeft} onClick={action("clicked")}>
            キャンセル
          </Button>
        </ButtonGroup>
      </RowContainer>

      <Typography weight="bold" size="xxl">
        Disabled Button
      </Typography>
      <RowContainer>
        <ButtonGroup disabled>
          <Button onClick={action("clicked")}>保存する</Button>
          <Button onClick={action("clicked")}>編集する</Button>
        </ButtonGroup>
      </RowContainer>
    </Container>
  );
};
