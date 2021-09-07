import * as React from "react";
import CreatableSelect from ".";

export default {
  title: "Components/Inputs/CreatableSelect",
  component: CreatableSelect,
  source: {
    type: "code",
  },
};

export const Example = () => {
  const options = [
    { label: "One", value: 1 },
    { label: "Two", value: 2 },
    { label: "Three", value: 3 },
  ];
  const handleChange = (newValue: any, actionMeta: any) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  return (
    <div style={{ height: "200px" }}>
      <CreatableSelect options={options} onChange={handleChange} />
    </div>
  );
};

export const MultipleSelect = () => {
  const options = [
    { label: "One", value: 1 },
    { label: "Two", value: 2 },
    { label: "Three", value: 3 },
  ];
  const handleChange = (newValue: any, actionMeta: any) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  return (
    <div style={{ height: "200px" }}>
      <CreatableSelect
        isMulti={true}
        options={options}
        onChange={handleChange}
      />
    </div>
  );
};
