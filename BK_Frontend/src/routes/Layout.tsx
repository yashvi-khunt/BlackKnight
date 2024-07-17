import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import MiniDrawer from "../components/NavBar/AppBar";

const Layout = () => {
  //   const { isVisible, handleClick } = useScrollToTop();
  const location = useLocation();
  const isAuth = location.pathname.includes("/auth");
  const isLoggedIn = useAppSelector((state) => state.auth.status);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(location);
    if (isLoggedIn) {
      if (location.pathname === "/") {
        navigate("/dashboard");
      } else {
        navigate(location.pathname + location.search);
      }
    } else {
      navigate("/auth/login");
    }
  }, []);
  return (
    <>
      <div className="wrapper">
        {isAuth ? (
          <Outlet />
        ) : (
          <>
            <MiniDrawer />
          </>
        )}

        {/* <Fade in={isVisible}>
          <Box
            onClick={handleClick}
            role="presentation"
            sx={{ position: "fixed", bottom: 16, right: 16 }}
          >
            <Fab size="small" aria-label="scroll back to top">
              <i className="fa fa-chevron-up" />
            </Fab>
          </Box>
        </Fade> */}
      </div>
    </>
  );
};

export default Layout;
