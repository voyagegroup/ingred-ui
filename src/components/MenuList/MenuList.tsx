import React from "react";
import * as Styled from "./styled";
import Divider from "../Divider";
import Typography from "../Typography";
import Spacer from "../Spacer";

export type ContentProp = React.ComponentPropsWithRef<"div"> & {
  text: string;
  onClick: () => void;
  divideTop?: boolean;
};

type Props = {
  inline?: boolean;
  contents: ContentProp[];
};

const MenuList = React.forwardRef<HTMLDivElement, Props>(
  ({ inline = false, contents, ...rest }, ref) => (
    <Styled.Container inline={inline} {...rest} ref={ref}>
      {contents.map((content) => (
        <React.Fragment key={content.text}>
          {content.divideTop && (
            <Spacer py={1}>
              <Divider variant="middle" />
            </Spacer>
          )}
          <Styled.TextContainer onClick={content.onClick}>
            <Typography size="sm">{content.text}</Typography>
          </Styled.TextContainer>
        </React.Fragment>
      ))}
    </Styled.Container>
  ),
);

export default MenuList;
