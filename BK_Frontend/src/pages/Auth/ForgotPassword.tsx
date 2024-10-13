import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { openSnackbar } from "../../redux/slice/snackbarSlice";
import { useForgotPasswordMutation } from "../../redux/api/authApi";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Container,
} from "@mui/material";
import bgImg from "../../assets/LoginBG.png";
import Logo from "../../assets/Logo.png";

function ForgotPassword() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [edata, setData] = useState<authTypes.forgotPasswordParams>({
    email: "",
  });

  const [forgotPasswordApi, { data, error, isLoading }] =
    useForgotPasswordMutation();
  const dispatch = useAppDispatch();

  const onSubmit = (data: unknown) => {
    //console.log(data as authTypes.forgotPasswordParams);
    setData(data as authTypes.forgotPasswordParams);
    forgotPasswordApi(data as authTypes.forgotPasswordParams);
  };

  useEffect(() => {
    if (data?.success) navigate(`/sent-password-email?email=${edata.email}`);
  }, [data?.data]);

  useEffect(() => {
    // console.log(error?.data.message);
    if ((error as any)?.data && !(error as any)?.success)
      dispatch(
        openSnackbar({
          severity: "error",
          message: (error as any)?.data.message,
        })
      );
  }, [(error as any)?.data]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper sx={{ p: 4, borderRadius: 7, width: 400 }} elevation={5}>
        <Box display="flex" flexDirection="column">
          <Box
            component="img"
            sx={{
              width: "300px",
              m: "auto",
            }}
            alt="Black Knight Logo"
            src={Logo}
          />
          <Typography
            variant="h5"
            sx={{ width: "fit-content", m: "auto", mt: 2 }}
          >
            Forgot Password
          </Typography>
        </Box>
        <Container
          maxWidth="xs"
          component="form"
          noValidate
          sx={{ mt: 3 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                {...register("userName", {
                  required: "Username is required.",
                  //   pattern: {
                  //     value: /^\S+@\S+\.\S+$/,
                  //     message: "Enter a valid email.",
                  //   },
                })}
              />
            </Grid>
            {errors.userName && (
              <Grid item xs={12} textAlign="center" color="red">
                {errors.userName.message.toString()}
              </Grid>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            disabled={isLoading}
          >
            Request New Password
            {isLoading && <CircularProgress size={24} sx={{ ml: 2 }} />}
          </Button>
        </Container>
      </Paper>
    </Box>
  );
}

export default ForgotPassword;
