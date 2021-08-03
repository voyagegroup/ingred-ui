import * as React from "react";
import moment from "moment";
import {
  Checkbox,
  DatePicker,
  DateRangePicker,
  FileUploader,
  Input,
  RadioButton,
  Select,
  Spacer,
  TextField,
  Typography,
  ToggleButton,
  Button,
  OptionType,
} from "../../../../src/components";

export default {
  title: "Information/CodeRecipes/Form",
  parameters: {
    docs: { page: null },
  },
};

type Values = {
  input: string;
  textField: string;
  checkbox: string;
  datePicker: moment.Moment;
  dateRangePicker: {
    start: moment.Moment;
    end: moment.Moment;
  };
  fileUploader: FileList | undefined;
  radioButton: string | number | readonly string[] | null;
  select: OptionType | undefined;
  toggleButton: boolean;
};

export const Overview: React.FC = () => {
  const [values, setValues] = React.useState<Values>({
    input: "hoge",
    textField: "",
    checkbox: "false",
    datePicker: moment(),
    dateRangePicker: { start: moment(), end: moment() },
    fileUploader: undefined,
    radioButton: null,
    select: undefined,
    toggleButton: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  const handleDateChange = (date: moment.Moment) => {
    setValues({ ...values, datePicker: date });
  };

  const handleDatesChange = (dates: {
    startDate: moment.Moment;
    endDate: moment.Moment;
  }) => {
    setValues({
      ...values,
      dateRangePicker: { start: dates.startDate, end: dates.endDate },
    });
  };

  const handleSelectFiles = (files: FileList) => {
    setValues({
      ...values,
      fileUploader: files,
    });
  };

  // TODO: 型をどうにかする
  const handleSelectChange = (value: any) => {
    setValues({
      ...values,
      select: { label: value?.label, value: value?.value },
    });
  };

  const handleToggleButton = () => {
    setValues((prev) => ({ ...values, toggleButton: !prev.toggleButton }));
  };

  const handleSubmit = () => {
    alert(`submitted values \n ${JSON.stringify(values)}`);
  };

  return (
    <>
      <Typography component="h1" size="xxxxxl" weight="bold">
        Form
      </Typography>
      <Spacer pt={5} />

      {/* Input */}
      <Typography size="xxl">Input</Typography>
      <Input value={values.input} name="input" onChange={handleInputChange} />
      <Spacer pt={2} />

      {/* TextField */}
      <Typography size="xxl">TextField</Typography>
      <TextField
        value={values.textField}
        name="textField"
        onChange={handleInputChange}
      />
      <Spacer pt={2} />

      {/* Checkbox */}
      <Typography size="xxl">Checkbox</Typography>
      <Checkbox
        value={values.checkbox}
        name="checkbox"
        onChange={handleInputChange}
      />
      <Spacer pt={2} />

      {/* DatePicker */}
      <Typography size="xxl">DatePicker</Typography>
      <DatePicker date={values.datePicker} onDateChange={handleDateChange} />
      <Spacer pt={2} />

      {/* DateRangePicker */}
      <Typography size="xxl">DateRangePicker</Typography>
      <DateRangePicker
        startDate={values.dateRangePicker.start}
        endDate={values.dateRangePicker.end}
        onDatesChange={handleDatesChange}
      />
      <Spacer pt={2} />

      {/* FileUploader */}
      <Typography size="xxl">FileUploader</Typography>
      <FileUploader onSelectFiles={(_e, files) => handleSelectFiles(files)} />
      <Spacer pt={2} />

      {/* RadioButton */}
      <Typography size="xxl">RadioButton</Typography>
      {["1", "2", "3"].map((val) => (
        <RadioButton
          key={val}
          name="radioButton"
          value={val}
          onChange={handleInputChange}
        >
          {val}
        </RadioButton>
      ))}
      <Spacer pt={2} />

      {/* Select */}
      <Typography size="xxl">Select</Typography>
      <Select
        closeMenuOnSelect={true}
        options={["1", "2", "3"].map((val) => ({ label: val, value: val }))}
        onChange={handleSelectChange}
      />
      <Spacer pt={2} />

      {/* ToggleButton */}
      <Typography size="xxl">ToggleButton</Typography>
      <ToggleButton
        active={values.toggleButton}
        onChange={handleToggleButton}
      />
      <Spacer pt={2} />

      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
};
