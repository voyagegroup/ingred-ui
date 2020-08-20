import * as React from "react";
import * as Styled from "./styled";
import Spacer from "../Spacer";
import Typography from "../Typography";
import defaultEmptyImage from "../../../assets/emptyImage.png";

export type ItemEmptyProps = {
  title: string;
  subtitle?: string;
  emptyImage?: string;
  imageWidth?: number;
  imageHeight?: number;
};

const ItemEmpty: React.FunctionComponent<ItemEmptyProps> = ({
  title,
  subtitle,
  emptyImage,
  imageWidth = 135,
  imageHeight = 135,
}) => (
  <Styled.EmptyContainer>
    <Styled.EmptyImageContainer>
      <img
        src={emptyImage ? emptyImage : defaultEmptyImage}
        width={imageWidth}
        height={imageHeight}
      />
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
