import * as React from "react";
import { useTheme } from "styled-components";
import Button from "../../../Button";
import { Divider } from "../../../Divider/styled";
import Icon from "../../../Icon";
import Select, { OptionType } from "../../../Select";
import Spacer from "../../../Spacer";
import Typography from "../../../Typography";
import {
  FilterPackType,
  FilterType,
  ReferredFilterType,
  Types,
} from "../../types";
import * as Styled from "./styled";
import TextField from "../../../TextField";
import RadioButton from "../../../RadioButton";

export type Props = {
  onClose: () => void;
  onEdit: (editedReferredFilter: ReferredFilterType) => void;
  willEditFilter?: ReferredFilterType;
  selectedFilterPack?: FilterPackType;
  editButtonTitle?: string;
  formErrorText?: string;
  inputErrorText?: string;
  formPlaceholder?: string;
};

export const EditFilterCard: React.FunctionComponent<Props> = ({
  onClose,
  onEdit,
  willEditFilter,
  selectedFilterPack,
  editButtonTitle,
  inputErrorText,
  formPlaceholder,
}) => {
  const theme = useTheme();
  const [condition, setCondition] = React.useState<
    ReferredFilterType["filterCondition"] | undefined
  >(willEditFilter?.filterCondition);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCondition(e.target.value);
  };

  const handleSelect = (option: OptionType<string> | null) => {
    if (option === null) {
      return setCondition(undefined);
    }

    setCondition(option.value);
  };

  const validateCondition = () => {
    return condition === "" ? true : false;
  };

  const getTextFieldErrorText = () => {
    if (validateCondition() && isSubmitted) {
      return inputErrorText || "Please input";
    }

    return "";
  };

  const getInputField = (filter: FilterType) => {
    const type = filter?.control.type;
    switch (type) {
      case "text":
        return (
          <TextField
            icon="search"
            placeholder={formPlaceholder || "search"}
            name="condition"
            value={condition as string}
            errorText={getTextFieldErrorText()}
            onChange={handleInput}
          />
        );
      case "select":
        const options = filter?.control.options as string[];

        return (
          <Select
            maxMenuHeight={250}
            options={options.map((option) => ({
              label: option,
              value: option,
            }))}
            defaultValue={{
              label: willEditFilter?.filterCondition as string,
              value: willEditFilter?.filterCondition as string,
            }}
            onChange={handleSelect}
          />
        );
      case "boolean":
        return (
          <div>
            <RadioButton
              name="condition"
              value="true"
              defaultChecked={willEditFilter?.filterCondition === "true"}
              onChange={handleInput}
            >
              true
            </RadioButton>
            <br />

            <RadioButton
              name="condition"
              value="false"
              defaultChecked={willEditFilter?.filterCondition === "false"}
              onChange={handleInput}
            >
              false
            </RadioButton>
          </div>
        );
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);

    if (validateCondition()) {
      return;
    }

    const editedFilter: ReferredFilterType = {
      filterCondition: condition,
      filterType: willEditFilter?.filterType as Types,
      filterName: willEditFilter?.filterName as string,
      categoryName: willEditFilter?.categoryName as string,
    };
    onEdit(editedFilter);
  };

  return (
    <Styled.FilterCard>
      <Styled.FilterCardHeader>
        <Typography weight="bold" size="xxl">
          {willEditFilter?.categoryName}
        </Typography>

        <Spacer pr={2} />
        <Styled.CloseIconContainer key={"close"} onClick={onClose}>
          <Icon name="close" size="md" color={theme.palette.black} />
        </Styled.CloseIconContainer>
      </Styled.FilterCardHeader>
      <Styled.FilterContent>
        <Typography weight="bold" size="lg">
          {selectedFilterPack?.sectionTitle || "Section"}
        </Typography>
        <Spacer py={0.5} />
        <TextField readOnly value={willEditFilter?.filterName} />
        <Spacer py={1} />
        <Typography weight="bold" size="lg">
          {selectedFilterPack?.filters.find(
            (filter) => filter.filterName === willEditFilter?.filterName,
          )?.conditionTitle || "Condition"}
        </Typography>
        <Spacer py={0.5} />
        {getInputField(
          selectedFilterPack?.filters.find(
            (filter) => filter.filterName === willEditFilter?.filterName,
          ) as FilterType,
        )}
        <Spacer py={1} />
        <Divider
          orientation="horizontal"
          color={theme.palette.gray.light}
          my={2}
        />

        <Styled.ButtonContainer>
          <Button size="small" inline={true} onClick={handleSubmit}>
            {editButtonTitle || "Edit"}
          </Button>
        </Styled.ButtonContainer>
      </Styled.FilterContent>
    </Styled.FilterCard>
  );
};
