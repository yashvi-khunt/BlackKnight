import { Login } from "../pages";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import SendEmail from "../pages/Auth/SendEmail";

export const authRoutes: Global.AuthRoutes = [
  {
    path: "/auth",
    element: null,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "sent-password-email",
        element: <SendEmail />,
      },
    ],
  },
];
