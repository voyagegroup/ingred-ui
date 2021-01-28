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
} from "../../../../src/components";
import { Controller, useForm, UnpackNestedValue } from "react-hook-form";

export default {
  title: "Information/CodeRecipes/Form",
  parameters: {
    docs: { page: null },
  },
};

type FormType = {
  input: string;
  textField: string;
  checkbox: boolean;
  datePicker: moment.Moment;
  dateRangePicker: { start: moment.Moment; end: moment.Moment };
  fileUploader: FileList;
  radioButton: "1" | "2" | "3";
  select: "1" | "2" | "3";
  toggleButton: boolean;
};

export const Overview: React.FC = () => {
  const { register, handleSubmit, control } = useForm<FormType>({
    defaultValues: {
      input: "hoge",
      datePicker: moment(),
      dateRangePicker: { start: moment(), end: moment() },
      toggleButton: true,
    },
  });

  const submit = (value: UnpackNestedValue<FormType>) => {
    alert(`submitted values \n ${JSON.stringify(value)}`);
  };

  return (
    <>
      <Typography component="h1" size="xxxxxl" weight="bold">
        Form
      </Typography>
      <Typography>
        We recommend to use{" "}
        <a href="http://react-hook-form.com/">react-hook-form</a>. It&apos;s the
        easiest way to implement form feature.
        <br />
        Here is examples. Source code is written in &rdquo;Story&rdquo; Tab at
        footer.
      </Typography>
      <Spacer pt={5} />

      {/* Input */}
      <Typography size="xxl">Input</Typography>
      <Input ref={register} name="input" />
      <Spacer pt={2} />

      {/* TextField */}
      <Typography size="xxl">TextField</Typography>
      <TextField inputRef={register} name="textField" />
      <Spacer pt={2} />

      {/* Checkbox */}
      <Typography size="xxl">Checkbox</Typography>
      <Checkbox inputRef={register} name="checkbox" />
      <Spacer pt={2} />

      {/* DatePicker */}
      <Typography size="xxl">DatePicker</Typography>
      <Controller
        name="datePicker"
        control={control}
        render={(props) => (
          <DatePicker
            date={props.value}
            onDateChange={(date) => props.onChange(date)}
          />
        )}
      />
      <Spacer pt={2} />

      {/* DateRangePicker */}
      <Typography size="xxl">DateRangePicker</Typography>
      <Controller
        name="dateRangePicker"
        control={control}
        render={(props) => (
          <DateRangePicker
            startDate={props.value.start}
            endDate={props.value.end}
            onDatesChange={(dates) =>
              props.onChange({ start: dates.startDate, end: dates.endDate })
            }
          />
        )}
      />
      <Spacer pt={2} />

      {/* FileUploader */}
      <Typography size="xxl">FileUploader</Typography>
      <Controller
        name="fileUploader"
        control={control}
        render={(props) => (
          <FileUploader onSelectFiles={(_e, files) => props.onChange(files)} />
        )}
      />
      <Spacer pt={2} />

      {/* RadioButton */}
      <Typography size="xxl">RadioButton</Typography>
      {["1", "2", "3"].map((val) => (
        <RadioButton
          key={val}
          inputRef={register}
          name="radioButton"
          value={val}
        >
          {val}
        </RadioButton>
      ))}
      <Spacer pt={2} />

      {/* Select */}
      <Typography size="xxl">Select</Typography>
      <Controller
        name="select"
        control={control}
        render={(props) => (
          <Select
            options={["1", "2", "3"].map((val) => ({ label: val, value: val }))}
            onChange={(value) => props.onChange(value)}
          />
        )}
      />
      <Spacer pt={2} />

      {/* ToggleButton */}
      <Typography size="xxl">ToggleButton</Typography>
      <Controller
        name="toggleButton"
        control={control}
        render={(props) => (
          <ToggleButton
            active={props.value}
            onChange={() => props.onChange(!props.value)}
          />
        )}
      />
      <Spacer pt={2} />

      <Button onClick={handleSubmit(submit)}>Submit</Button>
    </>
  );
};
