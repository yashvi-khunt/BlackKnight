import { Controller } from "react-hook-form";
import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import { useEffect, useState, forwardRef } from "react";

const filter = createFilterOptions<paperTypes.PaperTypeOptions>();

const SelectField = forwardRef<
  unknown,
  {
    name: string;
    control: any;
    options: paperTypes.PaperTypeOptions[];
    label: string;
    value?: string | null;
    onAddClick?: () => void; // Ensure onAddClick is part of the props
  }
>(({ name, control, options, label, value, onAddClick }, ref) => {
  // Destructure onAddClick from props
  const [selectedValue, setValue] =
    useState<paperTypes.PaperTypeOptions | null>(null);

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
          onChange={(event, newValue) => {
            if (typeof newValue === "string") {
              console.log("1st");
              // Timeout to avoid instant validation of the dialog's form.
              setTimeout(() => {
                if (onAddClick) onAddClick(); // Call onAddClick if defined
              });
            } else if (newValue && newValue.inputValue) {
              console.log("2nd");
              if (onAddClick) onAddClick(); // Call onAddClick if defined
            } else {
              setValue(newValue);
              field.onChange(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            if (params.inputValue !== "") {
              filtered.push({
                inputValue: params.inputValue,
                label: `Add "${params.inputValue}"`,
              });
            }

            return filtered;
          }}
          ref={ref}
        />
      )}
    />
  );
});

export default SelectField;
