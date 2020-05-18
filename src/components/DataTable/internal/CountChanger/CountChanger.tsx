import * as React from "react";

import Flex from "../../../Flex";
import Select from "../../../Select";
import Typography from "../../../Typography";
import Spacer from "../../../Spacer";
import { OptionType } from "../../../Select/Select";

const defaultOptions: OptionType[] = [
  {
    label: "10件",
    value: "10",
  },
  {
    label: "50件",
    value: "50",
  },
  {
    label: "100件",
    value: "100",
  },
  {
    label: "500件",
    value: "500",
  },
  {
    label: "1000件",
    value: "1000",
  },
];

export type Props = {
  per: number;
  total: number;
  index?: number;
  onChange: (per: number) => void;
  options?: OptionType[];
};

const CountChanger: React.FunctionComponent<Props> = ({
  per,
  total,
  index = 1,
  onChange,
  options = defaultOptions,
}) => {
  const handleChange = (selectedOption: any) => {
    const option: OptionType = selectedOption || options[0];
    onChange(parseInt(option.value));
  };

  const firstItemIndex = () => per * (index - 1) + 1;
  const lastItemIndex = () => (per * index > total ? total : per * index);

  return (
    <Flex display="flex" alignItems="center">
      <Typography color="secondary">
        {`${total}件中`}
        <Typography
          component="span"
          color="secondary"
          weight="bold"
        >{`${firstItemIndex()}〜${lastItemIndex()}`}</Typography>
        {`件を表示中`}
      </Typography>
      <Spacer mx={1} />
      <Select
        isSearchable={false}
        name="count_changer"
        defaultValue={{ value: per.toString(), label: `${per}件` }}
        options={options}
        isClearable={false}
        minWidth={"98px"}
        onChange={handleChange}
      />
    </Flex>
  );
};

export { CountChanger };
