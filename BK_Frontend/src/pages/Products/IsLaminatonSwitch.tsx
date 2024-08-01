import { Controller } from "react-hook-form";
import { Stack, Switch, Typography } from "@mui/material";

const IsLaminationSwitch = ({ control }) => (
  <Controller
    name="isLamination"
    control={control}
    defaultValue={false}
    render={({ field }) => (
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography>Lamination</Typography>
        <Switch {...field} checked={field.value} />
      </Stack>
    )}
  />
);

export default IsLaminationSwitch;
