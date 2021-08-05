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

const defaultTextFieldErrorText = "Please input";

export type Props = {
  onClose: () => void;
  onApply: (newReferredFilter: ReferredFilterType) => void;
  selectedFilterPack?: FilterPackType;
  currentReferredFilters: ReferredFilterType[];
  applyButtonTitle?: string;
  inputErrorText?: string;
  formPlaceholder?: string;
  width?: string;
};

export const FilterCard: React.FunctionComponent<Props> = ({
  onClose,
  onApply,
  selectedFilterPack,
  currentReferredFilters,
  applyButtonTitle,
  inputErrorText,
  formPlaceholder,
  width,
}) => {
  const theme = useTheme();
  const [section, setSection] = React.useState<string | undefined>();
  const [condition, setCondition] = React.useState<string | undefined>();
  const [selectedFilter, setSelectedFilter] = React.useState<FilterType>();
  const [textFieldErrorText, setTextFieldErrorText] =
    React.useState<string>("");

  const filter = selectedFilterPack?.filters.find(
    (filter) => filter.filterName === selectedFilter?.filterName,
  );
  const options = selectedFilterPack?.filters.map((filter) => ({
    label: filter.filterName,
    value: filter.filterName,
  }));

  const checkIsDisabled = () => {
    return !section || !condition ? true : false;
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldErrorText("");
    setCondition(e.target.value);
  };

  const handleBlurInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setTextFieldErrorText(inputErrorText || defaultTextFieldErrorText);
      return;
    }
  };

  const handleSelect = (option: OptionType<any> | null) => {
    if (option === null) {
      setCondition(undefined);
      return;
    }

    setCondition(option.value);
  };

  const getInputField = (filter: FilterType) => {
    const type = filter?.control.type;
    switch (type) {
      case "text":
        return (
          <TextField
            placeholder={formPlaceholder || "search"}
            icon="search"
            name="condition"
            errorText={textFieldErrorText}
            onChange={handleChangeInput}
            onBlur={handleBlurInput}
          />
        );
      case "select":
        const options = filter?.control.options as string[];
        return (
          <Select
            options={options.map((option) => ({
              label: option,
              value: option,
            }))}
            onChange={handleSelect}
          />
        );
      case "boolean":
        return (
          <div>
            <RadioButton
              name="condition"
              value="true"
              onChange={handleChangeInput}
              onBlur={handleBlurInput}
            >
              true
            </RadioButton>
            <br />
            <RadioButton
              name="condition"
              value="false"
              onChange={handleChangeInput}
              onBlur={handleBlurInput}
            >
              false
            </RadioButton>
          </div>
        );
    }
  };

  const handleSubmit = () => {
    const newFilter = {
      categoryName: selectedFilterPack?.categoryName as string,
      filterName: selectedFilter?.filterName as string,
      filterType: selectedFilter?.control.type as Types,
      filterCondition: condition,
    };
    onApply(newFilter);
  };

  const handleFilterChange = (option: OptionType<string> | null) => {
    setTextFieldErrorText("");

    if (option === null) {
      setSection(undefined);
      setSelectedFilter(undefined);
      return;
    }

    const filter = selectedFilterPack?.filters.find(
      (f) => f.filterName === option.value,
    );
    setSection(filter?.filterName);
    setSelectedFilter(filter);
  };

  const getUnSelectedOption = (options: OptionType[] | undefined) => {
    return options?.filter(
      (option) =>
        !currentReferredFilters
          .map((referredFilter) => referredFilter.filterName)
          .includes(option.label),
    );
  };

  return (
    <Styled.FilterCard width={width}>
      <Styled.FilterCardHeader>
        <Typography weight="bold" size="xxl">
          {selectedFilterPack?.categoryName}
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
        <Select
          maxMenuHeight={250}
          options={getUnSelectedOption(options)}
          onChange={handleFilterChange}
        />
        <Spacer py={1} />
        {selectedFilter && (
          <div>
            <Typography weight="bold" size="lg">
              {filter?.conditionTitle || "Condition"}
            </Typography>
            <Spacer py={0.5} />
            {filter && getInputField(filter)}
            <Spacer py={1} />
          </div>
        )}
        <Divider
          orientation="horizontal"
          color={theme.palette.gray.light}
          my={2}
        />

        <Styled.ButtonContainer>
          <Button
            size="small"
            inline={true}
            disabled={checkIsDisabled()}
            onClick={handleSubmit}
          >
            {applyButtonTitle || "Apply"}
          </Button>
        </Styled.ButtonContainer>
      </Styled.FilterContent>
    </Styled.FilterCard>
  );
};
