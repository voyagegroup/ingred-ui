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
import RadioButton from "../../../RadioButton";
import { useLocaleProps } from "../../../../hooks/useLocaleProps";

export type EditFilterCardProps = {
  onClose: () => void;
  onEdit: (editedReferedFilter: ReferedFilterType) => void;
  willEditFilter?: ReferedFilterType;
  selectedFilterPack?: FilterPackType;
  editButtonTitle?: string;
  formErrorText?: string;
  inputErrorText?: string;
  formPlaceholder?: string;
  sectionTitle?: string;
  conditionTitle?: string;
};

type FormType = {
  section: string;
  condition: string;
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
    formErrorText = "Please fill in all fields.",
    inputErrorText = "Please input",
    formPlaceholder = "search",
    sectionTitle = "Section",
    conditionTitle = "Condition",
  } = props;

  const theme = useTheme();
  const { register, setValue, handleSubmit, errors } = useForm({
    shouldUnregister: false,
    defaultValues: {
      section: willEditFilter?.filterName,
      condition: willEditFilter?.filterCondition,
    },
  });
  const [submitError, setSubmitError] = React.useState<string | undefined>(
    undefined,
  );

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
            icon="search"
            placeholder={formPlaceholder}
            inputRef={register({ required: true })}
            name="condition"
            errorText={errors.condition ? inputErrorText : ""}
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
              defaultChecked={willEditFilter?.filterCondition as boolean}
              inputRef={register()}
              name="condition"
              value="true"
            >
              true
            </RadioButton>
            <br />
            <RadioButton
              defaultChecked={willEditFilter?.filterCondition as boolean}
              inputRef={register()}
              name="condition"
              value="false"
            >
              false
            </RadioButton>
          </div>
        );
    }
  };

  const onSubmit = (data: FormType) => {
    if (data.condition) {
      setSubmitError(undefined);
    } else {
      setSubmitError(formErrorText);
      return;
    }

    const editedFilter: ReferedFilterType = {
      filterCondition: data.condition,
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
          {selectedFilterPack?.sectionTitle || sectionTitle}
        </Typography>
        <Spacer py={0.5} />
        <TextField readOnly value={willEditFilter?.filterName} />
        <Spacer py={1} />
        <Typography weight="bold" size="lg">
          {selectedFilterPack?.filters.find(
            (filter) => filter.filterName === willEditFilter?.filterName,
          )?.conditionTitle || conditionTitle}
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

        {submitError && (
          <Spacer py={2}>
            <ErrorText>{submitError}</ErrorText>
          </Spacer>
        )}

        <Styled.ButtonContainer>
          <Button size="small" inline={true} onClick={handleSubmit(onSubmit)}>
            {editButtonTitle}
          </Button>
        </Styled.ButtonContainer>
      </Styled.FilterContent>
    </Styled.FilterCard>
  );
};
