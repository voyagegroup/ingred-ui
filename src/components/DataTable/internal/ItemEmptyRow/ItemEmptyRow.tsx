import * as React from "react";
import * as Styled from "./styled";
import ItemEmpty from "../../../ItemEmpty";

export type Props = {
  rowSpan: number;
  title?: string;
  subtitle?: string;
};

export const ItemEmptyRow: React.FunctionComponent<Props> = ({
  rowSpan,
  subtitle,
  title = "見つかりませんでした",
}) => {
  return (
    <Styled.Container>
      <td colSpan={rowSpan}>
        <ItemEmpty title={title} subtitle={subtitle} />
      </td>
    </Styled.Container>
  );
};
