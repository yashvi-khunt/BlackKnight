import { Controller } from "react-hook-form";
import { Checkbox, Stack, Switch, Typography } from "@mui/material";

const IsLaminationSwitch = ({ control }) => (
  <Controller
    name="isLamination"
    control={control}
    defaultValue={false}
    render={({ field }) => (
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography>Is Lamination?</Typography>
        <Checkbox {...field} checked={field.value} />
      </Stack>
    )}
  />
);

export default IsLaminationSwitch;
