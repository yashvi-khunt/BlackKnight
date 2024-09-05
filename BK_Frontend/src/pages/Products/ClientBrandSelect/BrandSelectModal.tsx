import { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Autocomplete,
  Grid,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  useAddBrandMutation,
  useUpdateBrandMutation,
} from "../../../redux/api/brandApi";
import { useAppDispatch } from "../../../redux/hooks";
import { openSnackbar } from "../../../redux/slice/snackbarSlice";

const BrandSelectModal = ({
  open,
  handleClose,
  clientId,
  mode,
  brandData,
  options,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      clientId: clientId || "",
      name: brandData?.label || "",
    },
  });
  const [addBrand, { error: addError, data: addResponse }] =
    useAddBrandMutation();
  const [updateBrand, { error: updateError, data: updateResponse }] =
    useUpdateBrandMutation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (mode === "edit" && brandData) {
      reset({
        clientId: clientId,
        name: brandData.label,
      });
    } else {
      reset({
        clientId: "",
        name: "",
      });
    }
  }, [mode, brandData, clientId, reset]);

  useEffect(() => {
    if (addResponse) {
      dispatch(
        openSnackbar({ severity: "success", message: addResponse.message })
      );
      handleClose();
    }
    if (addError) {
      dispatch(
        openSnackbar({
          severity: "error",
          message: (addError as any).data?.message,
        })
      );
    }
  }, [addResponse, addError, dispatch, handleClose]);

  useEffect(() => {
    if (updateResponse) {
      dispatch(
        openSnackbar({ severity: "success", message: updateResponse.message })
      );
      handleClose();
    }
    if (updateError) {
      dispatch(
        openSnackbar({
          severity: "error",
          message: (updateError as any).data?.message,
        })
      );
    }
  }, [updateResponse, updateError, dispatch, handleClose]);

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    if (mode === "add") {
      addBrand(data);
    } else if (mode === "edit" && brandData.value) {
      updateBrand({ id: brandData.value, data });
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{mode === "add" ? "Add Brand" : "Edit Brand"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            {/* Client Selection */}
            <Grid item xs={12}>
              <Controller
                name="clientId"
                control={control}
                rules={{ required: "Client is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Select Client"
                    variant="outlined"
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                    {...register("clientId", {
                      required: "Client is required.",
                    })}
                  >
                    <option value="">Select Client</option>
                    {options.map((client) => (
                      <option key={client.value} value={client.value}>
                        {client.label}
                      </option>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            {/* Brand Name Input */}
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Brand name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Brand Name"
                    variant="outlined"
                    fullWidth
                    {...register("name", {
                      required: "Brand name is required.",
                    })}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>

        {/* Actions: Cancel and Submit */}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" color="primary">
            {mode === "add" ? "Add" : "Save"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BrandSelectModal;
