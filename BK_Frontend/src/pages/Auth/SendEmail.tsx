import { Box, Paper, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import bgImg from "../../assets/LoginBG.png";
import Logo from "../../assets/Logo.png";

function SendEmail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get("email")) {
      setEmail(searchParams.get("email"));

      searchParams.delete("email");
      setSearchParams(searchParams);
    }
  }, [searchParams]);

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
      <Paper
        sx={{ p: 4, borderRadius: 7, width: 400, textAlign: "center" }}
        elevation={5}
      >
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
            sx={{ width: "fit-content", m: "auto", my: 2 }}
          >
            Password Reset Request Sent!
          </Typography>
          <Typography variant="body1">
            We have sent a password reset link to: <strong>{email}</strong>
          </Typography>
        </Box>
        <Button
          component={Link}
          to="/auth/login"
          variant="contained"
          sx={{ mt: 4 }}
        >
          Back to Login
        </Button>
      </Paper>
    </Box>
  );
}

export default SendEmail;
