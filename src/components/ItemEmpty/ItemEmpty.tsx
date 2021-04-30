import * as React from "react";
import * as Styled from "./styled";
import Spacer from "../Spacer";
import Typography from "../Typography";
import defaultEmptyImage from "../../../assets/emptyImage.png";

export type ItemEmptyProps = {
  title?: string;
  subtitle?: string;
  emptyImage?: string;
  imageWidth?: number;
};

const ItemEmpty: React.FunctionComponent<ItemEmptyProps> = ({
  title = "Not found.",
  subtitle,
  emptyImage,
  imageWidth = 80,
}) => (
  <Styled.EmptyContainer>
    <Styled.EmptyImage
      src={emptyImage ? emptyImage : defaultEmptyImage}
      width={imageWidth}
    />
    <Spacer pt={2} pb={1}>
      <Typography weight="bold" size="md" align="center">
        {title}
      </Typography>
    </Spacer>
    {subtitle && <Typography size="sm">{subtitle}</Typography>}
  </Styled.EmptyContainer>
);

export default ItemEmpty;
