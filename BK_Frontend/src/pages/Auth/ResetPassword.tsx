import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Container,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/api/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { openSnackbar } from "../../redux/slice/snackbarSlice";
import { FormInputPassword } from "../../components/form"; // Assuming reusable form components
import bgImg from "../../assets/LoginBG.png";
import Logo from "../../assets/Logo.png";

function ResetPassword() {
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const [resetApi, { data, error, isLoading }] = useResetPasswordMutation();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    resetApi({
      newPassword: data.password,
      email: searchParams.get("userEmail"),
      token: searchParams.get("token")?.split(" ").join("+"),
    });
  };

  useEffect(() => {
    if (data?.success) {
      dispatch(openSnackbar({ severity: "success", message: data.message }));
      navigate("/auth/login");
    }
    if ((error as any)?.data && !(error as any).data.success) {
      dispatch(
        openSnackbar({
          severity: "error",
          message: (error as any).data.message,
        })
      );
    }
  }, [data, error as any]);

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
            Reset Password
          </Typography>
        </Box>
        <Container
          maxWidth="xs"
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormInputPassword
                control={control}
                {...register("password", {
                  required: "Password is required.",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@+._-])[a-zA-Z@+._-\d]{8,}$/,
                    message:
                      "Password should have atleast one uppercase,one lowercase, one special character and should be of the minimum length 8.",
                  },
                })}
                label="New Password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputPassword
                control={control}
                {...register("confirmPassword", {
                  required: "Confirm your password.",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                label="Confirm Password"
              />
            </Grid>
            {/* {errors.password && (
              <Grid item xs={12} textAlign="center" color="red">
                {errors.password.message.toString()}
              </Grid>
            )} */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            disabled={isLoading}
          >
            Change Password
            {isLoading && <CircularProgress size={24} sx={{ ml: 2 }} />}
          </Button>
        </Container>
      </Paper>
    </Box>
  );
}

export default ResetPassword;
