import { Autocomplete, TextField } from "@mui/material";
import { forwardRef, useState, useEffect } from "react";
import { Controller } from "react-hook-form";

const IsLaminationSwitch = forwardRef<
  unknown,
  {
    name: string;
    control: any;
    label: string;
    value?: string | boolean | null;
    onAddClick?: () => void;
  }
>(({ name, control, label, value, onAddClick }, ref) => {
  const [selectedValue, setValue] = useState<{
    value: boolean | string;
    label: string;
  } | null>(null);

  // Define the options for Yes/No
  const options = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
  ];

  useEffect(() => {
    if (value == null) return;

    const vl = options.find((x) => x.value === value.toString());
    setValue(vl || null);
  }, [value]);

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
          // Custom comparison logic
          isOptionEqualToValue={(option, value) =>
            option.value === value?.value
          }
          renderInput={(params) => <TextField {...params} label={label} />}
          onChange={(_, newValue) => {
            setValue(newValue);
            field.onChange(newValue?.value === "true");
          }}
          ref={ref}
        />
      )}
    />
  );
});

export default IsLaminationSwitch;
