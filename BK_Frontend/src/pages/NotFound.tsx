import { Box, Paper, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import bgImg from "../assets/LoginBG.png";
import Logo from "../assets/Logo.png";

function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "fit",
        backgroundPosition: "center",
      }}
    >
      <Paper sx={{ p: 4, borderRadius: 7, textAlign: "center" }} elevation={5}>
        <Box
          component="img"
          sx={{
            width: "300px",
            m: "auto",
          }}
          alt="Black Knight Logo"
          src={Logo}
        />
        <Typography variant="h4" sx={{ mt: 2 }}>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
          The page you are looking for doesn't exist or has been moved.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Go to Dashboard
        </Button>
      </Paper>
    </Box>
  );
}

export default NotFound;
