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
  ReferedFilterType,
  Types,
} from "../../types";
import * as Styled from "./styled";
import { useForm } from "react-hook-form";
import TextField from "../../../TextField";
import ErrorText from "../../../ErrorText";

export type Props = {
  onClose: () => void;
  onApply: (newReferedFilter: ReferedFilterType) => void;
  selectedFilterPack?: FilterPackType;
  currentReferedFilters: ReferedFilterType[];
};

type FormType = {
  section: string;
  condition: string;
};

export const FilterCard: React.FunctionComponent<Props> = ({
  onClose,
  onApply,
  selectedFilterPack,
  currentReferedFilters,
}) => {
  const [selectedFilter, setSelectedFilter] = React.useState<FilterType>();
  const [submitError, setSubmitError] = React.useState<string | undefined>(
    undefined,
  );
  const theme = useTheme();
  const options = selectedFilterPack?.filters.map((filter) => ({
    label: filter.filterName,
    value: filter.filterName,
  }));
  const { register, setValue, handleSubmit, errors } = useForm({
    shouldUnregister: false,
    defaultValues: {
      section: undefined,
      condition: undefined,
    },
  });

  const handleSelect = (option: OptionType<any>) => {
    if (option === null) {
      setValue("condition", undefined);
    } else {
      setValue("condition", option.value);
    }
  };

  const getInputField = (filter: FilterType) => {
    const type = filter?.control.type;
    switch (type) {
      case "text":
        return (
          <TextField
            inputRef={register({ required: true })}
            name="condition"
            errorText={errors.condition ? "入力してください" : ""}
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
          <TextField
            inputRef={register({ required: true })}
            name="condition"
            errorText={errors.condition ? "入力してください" : ""}
          />
        );
    }
  };

  const onSubmit = (data: FormType) => {
    if (data.section && data.condition) {
      setSubmitError(undefined);
    } else {
      setSubmitError("区分・状態を設定してください");
      return;
    }
    const newFilter = {
      categoryName: selectedFilterPack?.categoryName as string,
      filterName: selectedFilter?.filterName as string,
      filterType: selectedFilter?.control.type as Types,
      filterCondtion: data.condition,
    };
    onApply(newFilter);
  };

  const handleFilterChange = (option: OptionType<string>) => {
    if (option === null) {
      setValue("section", undefined);
      setSelectedFilter(undefined);
    } else {
      const filter = selectedFilterPack?.filters.find(
        (f) => f.filterName === option.value,
      );
      setValue("section", filter?.filterName);
      setSelectedFilter(filter);
    }
  };

  const getUnSelectedOption = (options: OptionType[] | undefined) => {
    return options?.filter(
      (option) =>
        !currentReferedFilters
          .map((referedFilter) => referedFilter.filterName)
          .includes(option.label),
    );
  };

  return (
    <Styled.FilterCard>
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
          区分
        </Typography>
        <Spacer py={0.5} />
        <Select
          options={getUnSelectedOption(options)}
          onChange={handleFilterChange}
        />
        <Spacer py={1} />
        {selectedFilter && (
          <div>
            <Typography weight="bold" size="lg">
              状態
            </Typography>
            <Spacer py={0.5} />
            {getInputField(
              selectedFilterPack?.filters.find(
                (filter) => filter.filterName === selectedFilter.filterName,
              ) as FilterType,
            )}
            <Spacer py={1} />
          </div>
        )}
        <Divider
          orientation="horizontal"
          color={theme.palette.divider}
          my={2}
        />

        {submitError && (
          <Spacer py={2}>
            <ErrorText>{submitError}</ErrorText>
          </Spacer>
        )}

        <Styled.ButtonContainer>
          <Button size="small" inline={true} onClick={handleSubmit(onSubmit)}>
            適用する
          </Button>
        </Styled.ButtonContainer>
      </Styled.FilterContent>
    </Styled.FilterCard>
  );
};
