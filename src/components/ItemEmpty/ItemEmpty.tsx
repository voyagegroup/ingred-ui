import * as React from "react";
import * as Styled from "./styled";
import Spacer from "../Spacer";
import Typography from "../Typography";
import { EmptyImage } from "./internal/EmptyImage";

type Props = {
  title: string;
  subtitle?: string;
  emptyImage?: string;
  imageWidth?: string;
  imageHeight?: string;
};

const ItemEmpty: React.FunctionComponent<Props> = ({
  title,
  subtitle,
  emptyImage,
  imageWidth,
  imageHeight,
}) => (
  <Styled.EmptyContainer>
    <Styled.EmptyImageContainer>
      {emptyImage ? (
        <img src={emptyImage} width={imageWidth} height={imageHeight} />
      ) : (
        <Styled.DefaultEmptyImageContainer>
          <EmptyImage />
        </Styled.DefaultEmptyImageContainer>
      )}
    </Styled.EmptyImageContainer>
    <Spacer pt={5} pb={1}>
      <Typography weight="bold" size="xxxl" align="center">
        {title}
      </Typography>
    </Spacer>
    {subtitle && <Typography size="md">{subtitle}</Typography>}
  </Styled.EmptyContainer>
);

export default ItemEmpty;
