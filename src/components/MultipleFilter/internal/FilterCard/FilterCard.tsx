import * as React from "react";
import { useTheme } from "styled-components";
import Button from "../../../Button";
import { Divider } from "../../../Divider/styled";
import Icon from "../../../Icon";
import Select from "../../../Select";
import Spacer from "../../../Spacer";
import Typography from "../../../Typography";
import * as Styled from "./styled";

export type Props = {
  onClose: () => void;
  onSubmit: () => void;
  // TODO: このデータ型を考える
  selectedFilter?: string | null;
};

export const FilterCard: React.FunctionComponent<Props> = ({
  onClose,
  onSubmit,
  selectedFilter,
}) => {
  const theme = useTheme();
  return (
    <Styled.FilterCard>
      <Styled.FilterCardHeader>
        <Typography weight="bold" size="xxl">
          {selectedFilter}
        </Typography>

        <Spacer pr={2} />
        <Styled.CloseIconContainer key={"close"} onClick={onClose}>
          <Icon name="close" size="md" color={theme.palette.black} />
        </Styled.CloseIconContainer>
      </Styled.FilterCardHeader>
      <Styled.FilterContent>
        <Typography weight="bold" size="lg">
          区分
        </Typography>
        <Spacer py={0.5} />
        <Select />
        <Spacer py={1} />
        <Typography weight="bold" size="lg">
          状態
        </Typography>
        <Spacer py={0.5} />
        <Select />
        <Spacer py={1} />
        <Divider
          orientation="horizontal"
          color={theme.palette.divider}
          my={2}
        />
        {/* TODO: エラー操作 */}
        <Spacer py={0.5} />
        <Styled.ButtonContainer>
          {/* TODO: submit処理 */}
          <Button inline={true} onClick={onSubmit}>
            適用する
          </Button>
        </Styled.ButtonContainer>
      </Styled.FilterContent>
    </Styled.FilterCard>
  );
};
