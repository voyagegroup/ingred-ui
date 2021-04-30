import * as React from "react";

import Flex from "../../../Flex";
import Select from "../../../Select";
import Typography from "../../../Typography";
import Spacer from "../../../Spacer";
import { OptionType } from "../../../Select/Select";

const defaultOptions: OptionType<number>[] = [
  {
    label: "10",
    value: 10,
  },
  {
    label: "50",
    value: 50,
  },
  {
    label: "100",
    value: 100,
  },
  {
    label: "500",
    value: 500,
  },
  {
    label: "1000",
    value: 1000,
  },
];

export type LabelDisplayRows = ({
  from,
  to,
  total,
}: {
  from: number;
  to: number;
  total: number;
}) => string;

export type Props = {
  per: number;
  total: number;
  index?: number;
  onChange: (per: number) => void;
  options?: OptionType<number>[];
  labelRowsPerPage: string;
  labelDisplayedRows: LabelDisplayRows;
};

const CountChanger: React.FunctionComponent<Props> = ({
  per,
  total,
  index = 1,
  onChange,
  options = defaultOptions,
  labelRowsPerPage,
  labelDisplayedRows,
}) => {
  const handleChange = (selectedOption: any) => {
    const option: OptionType<number> = selectedOption || options[0];
    onChange(option.value);
  };

  const firstItemIndex = per * (index - 1) + 1;
  const lastItemIndex = per * index > total ? total : per * index;

  return (
    <Flex display="flex" alignItems="center">
      <Typography component="span" color="secondary">
        {labelDisplayedRows({
          from: firstItemIndex,
          to: lastItemIndex,
          total,
        })}
      </Typography>
      <Spacer mx={1} />
      <Typography component="span" color="secondary">
        {labelRowsPerPage}
      </Typography>
      <Spacer pl={1} />
      <Select
        isSearchable={false}
        name="count_changer"
        defaultValue={{ value: per, label: per.toString() }}
        options={options}
        isClearable={false}
        minWidth={"80px"}
        onChange={handleChange}
      />
    </Flex>
  );
};

export { CountChanger };
