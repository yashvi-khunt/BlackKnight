import React, { useEffect } from "react";
import { Box, Typography, Modal, Button } from "@mui/material";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { FormInputText, FormInputPassword } from "../components/form";
import { useAppDispatch } from "../redux/hooks";
import capitalizeFirstLetter from "../helperFunctions/capitalizeFirstLetter";

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
      reset({ ...adminData, confirmPassword: adminData.userPassword });
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
          {`${capitalizeFirstLetter("edit")} Admin`}
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
          />

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
          />

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>

            <Button
              variant="contained"
              color="primary"
              sx={{ ml: 2 }}
              type="submit"
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default AdminModal;
