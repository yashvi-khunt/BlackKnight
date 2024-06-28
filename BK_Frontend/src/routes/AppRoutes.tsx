import MiniDrawer from "../components/NavBar/AppBar";
import { adminRoutes } from "./AdminRoutes";
import { authRoutes } from "./AuthRoutes";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  const protectedRoutes = [...adminRoutes];
  const unprotectedRoutes = [...authRoutes];

  // const userRole = useAppSelector((state) => state.auth.userData?.role);
  const userRole: Global.Role = "Admin";

  const filterRoute = (routeArray: Global.RouteConfig) => {
    return routeArray
      .filter((route) => route.roles?.includes(userRole))
      .map((route) => {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={route.element || <Outlet />}
          >
            {route.children && route.children.length > 0
              ? filterRoute(route.children)
              : null}
          </Route>
        );
      });
  };

  return (
    <BrowserRouter>
      <Routes>
        {unprotectedRoutes.map((route) => {
          if (route.children && route.children.length > 0) {
            const childRoutes = route.children.map((childRoute) => (
              <Route
                key={childRoute.path}
                path={childRoute.path}
                element={childRoute.element}
              />
            ));
            return (
              <Route key={route.path} path={route.path} element={<Outlet />}>
                <Route path="" element={route.element} />
                {childRoutes}
              </Route>
            );
          } else {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            );
          }
        })}
        <Route path="/" element={<MiniDrawer />}>
          {filterRoute(protectedRoutes)}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
