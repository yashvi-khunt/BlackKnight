import { Box, Typography, Modal, Button } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import capitalizeFirstLetter from "../../helperFunctions/capitalizeFirstLetter";
import { FormInputPassword, FormInputText } from "../../components/form";
import {
  useAddClientMutation,
  useUpdateClientMutation,
} from "../../redux/api/clientApi";
import { useAppDispatch } from "../../redux/hooks";
import { openSnackbar } from "../../redux/slice/snackbarSlice";

function ClientModal({ open, handleClose, clientData, mode }) {
  const { control, register, handleSubmit, reset, watch } = useForm();
  const [addClient, { error: addError, data: addResponse }] =
    useAddClientMutation();
  const [updateClient, { error: updateError, data: updateResponse }] =
    useUpdateClientMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (clientData) {
      reset({ ...clientData, confirmPassword: clientData.userPassword });
    } else {
      reset({
        companyName: "",
        userName: "",
        userPassword: "",
        phoneNumber: "",
      });
    }
  }, [clientData, reset]);

  useEffect(() => {
    if (addResponse) {
      dispatch(
        openSnackbar({
          severity: "success",
          message: addResponse.message,
        })
      );
      handleClose();
    }
    if (addError) {
      dispatch(
        openSnackbar({
          severity: "error",
          message: addError?.data?.message,
        })
      );
      console.log("error"); /// toast
    }
  }, [addResponse, addError?.data]);

  useEffect(() => {
    if (updateResponse) {
      dispatch(
        openSnackbar({
          severity: "success",
          message: updateResponse?.message,
        })
      );
      handleClose();
    }
    if (updateError) {
      dispatch(
        openSnackbar({
          severity: "error",
          message: updateError?.data?.message,
        })
      );
      console.log("error");
    }
  }, [updateResponse, updateError?.data]);

  const onSubmit = async (data) => {
    if (mode === "add") {
      await addClient(data);
    } else if (mode === "edit") {
      await updateClient({ data, id: clientData.id });
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          {`${capitalizeFirstLetter(mode)} Client`}
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInputText
            control={control}
            label="Company Name"
            disabled={mode === "view"}
            {...register("companyName", {
              required: {
                value: true,
                message: "Company name is required.",
              },
            })}
          />
          <FormInputText
            control={control}
            label="Username"
            disabled={mode === "view"}
            {...register("userName", {
              required: {
                value: true,
                message: "User name is required.",
              },
            })}
          />
          <FormInputPassword
            control={control}
            label="Password"
            {...register("userPassword", {
              required: {
                value: true,
                message: "Password field is required.",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@+._-])[a-zA-Z@+._-\d]{8,}$/,
                message:
                  "Password should have at least one uppercase, one lowercase, one special character and should be of the minimum length 8.",
              },
            })}
            disabled={mode === "view"}
          />
          {mode !== "view" && (
            <FormInputPassword
              control={control}
              label="Confirm password"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Confirm Password field is required.",
                },
                validate: (val) => {
                  if (watch("userPassword") !== val) {
                    return "Password and Confirm password should be the same.";
                  }
                },
              })}
            />
          )}
          <FormInputText
            control={control}
            label="Phone"
            {...register("phoneNumber", {
              required: {
                value: true,
                message: "Phone number is required.",
              },
              pattern: {
                value: /^\d{10}$/,
                message: "Please enter a 10-digit  number.",
              },
            })}
            disabled={mode === "view"}
          />
          <FormInputText
            control={control}
            label="GST Number"
            placeholder="11AAAAA1111A1AA"
            {...register("gstNumber", {
              pattern: {
                value: /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d{1}[A-Z]{2}$/,
                message: "Please enter a valid GST Number",
              },
            })}
            disabled={mode === "view"}
          />

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            {mode !== "view" && (
              <Button
                variant="contained"
                color="primary"
                sx={{ ml: 2 }}
                type="submit"
              >
                Save
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default ClientModal;
