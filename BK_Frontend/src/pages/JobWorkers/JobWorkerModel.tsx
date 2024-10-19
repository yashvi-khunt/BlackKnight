import { Box, Typography, Modal, Button } from "@mui/material";
import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import capitalizeFirstLetter from "../../helperFunctions/capitalizeFirstLetter";
import { FormInputPassword, FormInputText } from "../../components/form";
import {
  useAddJobWorkerMutation,
  useUpdateJobWorkerMutation,
} from "../../redux/api/jobWorkerApi";
import { useAppDispatch } from "../../redux/hooks";
import { openSnackbar } from "../../redux/slice/snackbarSlice";

interface JobWorkerModalProps {
  open: boolean;
  handleClose: () => void;
  jobWorkerData?: jobWorkerTypes.getJobWorkers;
  mode: "add" | "edit" | "view";
} // Define the types for the form data

// Define the types for the form data
interface JobWorkerFormData {
  companyName: string;
  userName: string;
  userPassword: string;
  phoneNumber: string;
  fluteRate: number;
  linerRate?: number;
  gstNumber?: string;
  id: string;
}

const JobWorkerModal: React.FC<JobWorkerModalProps> = ({
  open,
  handleClose,
  jobWorkerData,
  mode,
}) => {
  const { control, register, handleSubmit, reset, watch } = useForm();
  const [addJobWorker, { error: addError, data: addResponse }] =
    useAddJobWorkerMutation();
  const [updateJobWorker, { error: updateError, data: updateResponse }] =
    useUpdateJobWorkerMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (jobWorkerData) {
      console.log(jobWorkerData);
      reset({ ...jobWorkerData, confirmPassword: jobWorkerData.userPassword });
    } else {
      reset({
        companyName: "",
        userName: "",
        userPassword: "",
        phoneNumber: "",
        gstNumber: "",
        fluteRate: "",
        linerRate: 0,
      });
    }
  }, [jobWorkerData, reset]);

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
          message: (addError as any)?.data?.message,
        })
      );
      console.log("error"); /// toast
    }
  }, [addResponse, (addError as any)?.data]);

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
          message: (updateError as any)?.data?.message,
        })
      );
      console.log("error");
    }
  }, [updateResponse, (updateError as any)?.data]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const jwData = {
      ...data,
      linerRate: data.linerRate,
    };

    console.log(jwData);

    if (mode === "add") {
      addJobWorker(jwData as jobWorkerTypes.addJobWorker);
    } else if (mode === "edit") {
      updateJobWorker({ data: jwData, id: jobWorkerData?.id });
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
          {`${capitalizeFirstLetter(mode)} JobWorker`}
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
            label="Email"
            disabled={mode === "view"}
            {...register("email", {
              required: {
                value: true,
                message: "Email is required.",
              },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Please enter a valid email address.",
              },
            })}
          />

          <FormInputText
            control={control}
            label="Flute Rate"
            {...register("fluteRate", {
              required: {
                value: true,
                message: "Flute rate is required.",
              },
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message:
                  "Please enter a positive decimal number with up to two decimal places.",
              },
            })}
            disabled={mode === "view"}
          />
          <FormInputText
            control={control}
            label="Liner Rate"
            {...register("linerRate", {
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message:
                  "Please enter a positive decimal number with up to two decimal places.",
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
};

export default JobWorkerModal;
