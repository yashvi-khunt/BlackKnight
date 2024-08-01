import { Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";

const SelectField = ({
  name,
  control,
  options,
  label,
  value,
}: {
  name: string;
  control: any;
  options: Global.Option[];
  label: string;
  value?: null;
}) => {
  const [selectedValue, setValue] = useState<Global.Option | null>(null);

  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    newValue: Global.Option[] | Global.Option | null
  ) => {
    console.log(newValue);
  };

  useEffect(() => {
    console.log(value);
    if (!value || !options) return;

    var vl = options.find((x) => x.value == value);
    setValue(vl || null);
    console.log(value, selectedValue);
  }, [value, options]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...field}
          options={options}
          value={selectedValue}
          getOptionLabel={(option) => option.label || ""}
          renderInput={(params) => <TextField {...params} label={label} />}
          onChange={handleChange}
        />
      )}
    />
  );
};

export default SelectField;
