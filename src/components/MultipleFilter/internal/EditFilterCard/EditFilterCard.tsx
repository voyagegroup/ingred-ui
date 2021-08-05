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
import ErrorText from "../../../ErrorText";
import RadioButton from "../../../RadioButton";

const defaultTextFieldErrorText = "Please input";
const defaultSubmitErrorText = "Please fill in all fields.";

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
  formErrorText,
  inputErrorText,
  formPlaceholder,
}) => {
  const theme = useTheme();
  const [condition, setCondition] = React.useState<
    ReferredFilterType["filterCondition"] | undefined
  >(willEditFilter?.filterCondition);
  const [textFieldErrorText, setTextFieldErrorText] =
    React.useState<string>("");
  const [submitErrorText, setSubmitErrorText] = React.useState<string>("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const filter = selectedFilterPack?.filters.find(
    (filter) => filter.filterName === willEditFilter?.filterName,
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCondition(e.target.value);

    if (isSubmitted && !e.target.value) {
      setTextFieldErrorText(inputErrorText || defaultTextFieldErrorText);
      return;
    }

    setTextFieldErrorText("");
  };

  const handleSelect = (option: OptionType<string> | null) => {
    if (option === null) {
      return setCondition(undefined);
    }

    setCondition(option.value);
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
            errorText={textFieldErrorText}
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

    if (!condition && filter?.control.type === "text") {
      setTextFieldErrorText(inputErrorText || defaultTextFieldErrorText);
      return;
    }

    if (!condition) {
      setSubmitErrorText(formErrorText || defaultSubmitErrorText);
      return;
    }

    setSubmitErrorText("");

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
          {filter?.conditionTitle || "Condition"}
        </Typography>
        <Spacer py={0.5} />
        {filter && getInputField(filter)}
        <Spacer py={1} />
        <Divider
          orientation="horizontal"
          color={theme.palette.gray.light}
          my={2}
        />

        {submitErrorText && (
          <Spacer py={2}>
            <ErrorText>{submitErrorText}</ErrorText>
          </Spacer>
        )}

        <Styled.ButtonContainer>
          <Button size="small" inline={true} onClick={handleSubmit}>
            {editButtonTitle || "Edit"}
          </Button>
        </Styled.ButtonContainer>
      </Styled.FilterContent>
    </Styled.FilterCard>
  );
};
