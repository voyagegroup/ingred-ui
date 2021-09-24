import * as React from "react";
import * as Styled from "./styled";
import Spacer from "../Spacer";
import Typography from "../Typography";
import defaultEmptyImage from "../../../assets/emptyImage.png";
import { useLocaleProps } from "../../hooks/useLocaleProps";

export type ItemEmptyProps = {
  title?: string;
  subtitle?: string;
  emptyImage?: string;
  imageWidth?: number;
};

const ItemEmpty = React.forwardRef<HTMLDivElement, ItemEmptyProps>(
  (inProps, ref) => {
    const props = useLocaleProps({ props: inProps, name: "ItemEmpty" });
    const {
      title = "Not found.",
      subtitle,
      emptyImage,
      imageWidth = 80,
    } = props;

    return (
      <Styled.EmptyContainer ref={ref}>
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
  },
);

export default ItemEmpty;
