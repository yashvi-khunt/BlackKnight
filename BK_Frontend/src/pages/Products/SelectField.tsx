import { Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState, forwardRef } from "react";

const SelectField = forwardRef<
  unknown,
  {
    name: string;
    control: any;
    options: Global.Option[];
    label: string;
    value?: string | null;
  }
>(({ name, control, options, label, value }, ref) => {
  const [selectedValue, setValue] = useState<Global.Option | null>(null);

  useEffect(() => {
    if (!value || !options) return;

    const vl = options.find((x) => x.value == value);

    setValue(vl || null);
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
          onChange={(_, newValue) => {
            setValue(newValue);
            field.onChange(newValue); // Update the value in the form control
          }}
          ref={ref} // Forward ref to the Autocomplete component
        />
      )}
    />
  );
});

export default SelectField;
