import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import React from "react";

const FormInputText = React.forwardRef(
  (
    {
      name,
      control,
      label,
      value,
      disabled,
      placeholder,
      type,
    }: FormTypes.FormInputProps,
    ref
  ) => {
    return (
      <Controller
        name={name}
        defaultValue={value}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            type={type}
            helperText={error ? error.message : null}
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            label={label}
            variant="outlined"
            inputRef={ref}
            disabled={disabled}
            placeholder={placeholder}
          />
        )}
      />
    );
  }
);
export default FormInputText;
