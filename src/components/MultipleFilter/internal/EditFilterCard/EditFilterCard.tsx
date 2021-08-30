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
import { useLocaleProps } from "../../../../hooks/useLocaleProps";

export type EditFilterCardProps = {
  onClose: () => void;
  onEdit: (editedReferredFilter: ReferredFilterType) => void;
  willEditFilter?: ReferredFilterType;
  selectedFilterPack?: FilterPackType;
  editButtonTitle?: string;
  inputErrorText?: string;
  formPlaceholder?: string;

  sectionTitle?: string;
  conditionTitle?: string;
  width?: string;
};

export const EditFilterCard: React.FunctionComponent<EditFilterCardProps> = (
  inProps,
) => {
  const props = useLocaleProps({ props: inProps, name: "EditFilterCard" });
  const {
    onClose,
    onEdit,
    willEditFilter,
    selectedFilterPack,
    editButtonTitle = "Edit",
    inputErrorText = "Please input",
    formPlaceholder = "search",
    sectionTitle = "Section",
    conditionTitle = "Condition",
    width,
  } = props;
  const theme = useTheme();
  const [condition, setCondition] = React.useState<
    ReferredFilterType["filterCondition"] | undefined
  >(willEditFilter?.filterCondition);
  const [textFieldErrorText, setTextFieldErrorText] =
    React.useState<string>("");

  const filter = selectedFilterPack?.filters.find(
    (filter) => filter.filterName === willEditFilter?.filterName,
  );

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldErrorText("");
    setCondition(e.target.value);
  };

  const handleBlurInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setTextFieldErrorText(inputErrorText);
    }
  };

  const handleSelect = (option: OptionType<string> | null) => {
    setCondition(option?.value);
  };

  const getInputField = (filter: FilterType) => {
    const type = filter?.control.type;
    switch (type) {
      case "text":
        return (
          <TextField
            icon="search"
            placeholder={formPlaceholder}
            name="condition"
            value={condition as string}
            errorText={textFieldErrorText}
            onChange={handleChangeInput}
            onBlur={handleBlurInput}
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
              onChange={handleChangeInput}
            >
              true
            </RadioButton>
            <br />

            <RadioButton
              name="condition"
              value="false"
              defaultChecked={willEditFilter?.filterCondition === "false"}
              onChange={handleChangeInput}
            >
              false
            </RadioButton>
          </div>
        );
    }
  };

  const handleSubmit = () => {
    const editedFilter: ReferredFilterType = {
      filterCondition: condition,
      filterType: willEditFilter?.filterType as Types,
      filterName: willEditFilter?.filterName as string,
      categoryName: willEditFilter?.categoryName as string,
    };
    onEdit(editedFilter);
  };

  return (
    <Styled.FilterCard width={width}>
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
          {selectedFilterPack?.sectionTitle || sectionTitle}
        </Typography>
        <Spacer py={0.5} />
        <TextField readOnly value={willEditFilter?.filterName} />
        <Spacer py={1} />
        <Typography weight="bold" size="lg">
          {filter?.conditionTitle || conditionTitle}
        </Typography>
        <Spacer py={0.5} />
        {filter && getInputField(filter)}
        <Spacer py={1} />
        <Divider
          orientation="horizontal"
          color={theme.palette.gray.light}
          my={2}
        />

        <Styled.ButtonContainer>
          <Button
            size="small"
            inline={true}
            disabled={!condition}
            onClick={handleSubmit}
          >
            {editButtonTitle}
          </Button>
        </Styled.ButtonContainer>
      </Styled.FilterContent>
    </Styled.FilterCard>
  );
};
