import * as React from "react";
import * as Styled from "./styled";
import Spacer from "../Spacer";
import Typography from "../Typography";

type Props = {
  title: string;
  subtitle?: string;
};

// TODO: 画像入れる
const ItemEmpty: React.FunctionComponent<Props> = ({ title, subtitle }) => (
  <Styled.EmptyContainer>
    <Spacer pt={5} pb={1}>
      <Typography weight="bold" size="xxxl" align="center">
        {title}
      </Typography>
    </Spacer>
    {subtitle && <Typography size="md">{subtitle}</Typography>}
  </Styled.EmptyContainer>
);

export default ItemEmpty;
