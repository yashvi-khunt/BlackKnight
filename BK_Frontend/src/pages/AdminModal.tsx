import React, { useEffect } from "react";
import { Box, Typography, Modal } from "@mui/material";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { FormInputText, FormInputPassword } from "../../components/form";
import { useAppDispatch } from "../../redux/hooks";
import { openSnackbar } from "../../redux/slice/snackbarSlice";

interface AdminModalProps {
  open: boolean;
  handleClose: () => void;
  adminData?: any; // Replace `any` with your specific admin data type
  mode: "edit";
}

function AdminModal({ open, handleClose, adminData, mode }: AdminModalProps) {
  const { control, register, handleSubmit, reset, watch } = useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (adminData) {
      reset({ ...adminData });
    } else {
      reset({
        userName: "",
        password: "",
        number: "",
        gstNumber: "",
      });
    }
  }, [adminData, reset]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // Handle the admin data update here
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
          Edit Admin
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
            label="Username"
            {...register("userName", {
              required: {
                value: true,
                message: "Username is required.",
              },
            })}
          />
          <FormInputPassword
            control={control}
            label="Password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required.",
              },
            })}
          />
          <FormInputText
            control={control}
            label="Number"
            {...register("number", {
              required: {
                value: true,
                message: "Number is required.",
              },
            })}
          />
          <FormInputText
            control={control}
            label="GST Number"
            {...register("gstNumber", {
              required: {
                value: true,
                message: "GST Number is required.",
              },
            })}
          />
        </Box>
      </Box>
    </Modal>
  );
}

export default AdminModal;
