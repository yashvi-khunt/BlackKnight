import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Logo from "../Logo";
import { adminRoutes } from "../../routes/AdminRoutes";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Person, ShoppingCartOutlined } from "@mui/icons-material";
import { logout } from "../../redux/slice/authSlice";
import AdminModal from "../../pages/AdminModal";
import ClientModal from "../../pages/Clients/ClientModal";
import { useGetProfileQuery } from "../../redux/api/indexApi";
import JobWorkerModal from "../../pages/JobWorkers/JobWorkerModel";
import ShoppingCart from "../../pages/Wishlist/ShoppingCart";

const drawerWidth = 240;
const appBarHeight = 64; // Assuming the AppBar height is 64px

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openCart, setOpenCart] = useState(false); // Shopping cart state

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const userStatus = useAppSelector((state) => state.auth.status);
  const userRole = useAppSelector((state) => state.auth?.userData?.role);
  const userName = useAppSelector((state) => state.auth?.userData?.userName);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetProfileQuery(null);
  console.log(data);
  const handleLogout = () => {
    console.log("logout");
    dispatch(logout());
    navigate("/auth/login");
  };

  const handleOpenUserRoleMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (userRole === "Admin") {
      setOpenAdminModal(true);
    } else if (userRole === "Client") {
      setOpenClientModal(true);
    } else if (userRole === "JobWorker") {
      setOpenJobWorkerModal(true);
    }
  };

  const settings = [
    { name: "Profile", function: handleOpenUserRoleMenu },
    { name: "Logout", function: handleLogout },
  ];
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [openAdminModal, setOpenAdminModal] = useState(false);
  const [openClientModal, setOpenClientModal] = useState(false);
  const [openJobWorkerModal, setOpenJobWorkerModal] = useState(false);

  const handleCloseAdminModal = () => {
    setOpenAdminModal(false);
  };

  const handleCloseClientModal = () => {
    setOpenClientModal(false);
  };

  const handleCloseJobWorkerModal = () => {
    setOpenJobWorkerModal(false);
  };

  useEffect(() => {
    if (currentPath === "/") {
      userStatus ? navigate("/dashboard") : navigate("/login");
    }
  }, [currentPath]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box component="main" sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" color="white" elevation={0} open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 3,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            {open ? (
              adminRoutes.find((r) => currentPath.includes(r.path))?.name
            ) : (
              <Logo />
            )}
          </Typography>
          <Box sx={{ flexGrow: 1, display: "flex" }}></Box>

          <Box
            sx={{ flexGrow: 0, display: "flex", alignItems: "center", gap: 1 }}
          >
            {userName && (
              <Typography fontWeight={600}>{userName.toUpperCase()}</Typography>
            )}
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: "primary.main" }}>
                <Person />
              </Avatar>
            </IconButton>
          </Box>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <div key={setting.name}>
                <MenuItem onClick={setting.function}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              </div>
            ))}
          </Menu>
          {/* </Box> */}
        </Toolbar>
        <Divider />
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Logo />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box
          display={"flex"}
          flexDirection="column"
          justifyContent={"space-between"}
          height="100%"
          sx={{ py: 2 }}
        >
          <List>
            {adminRoutes
              .filter((x) => x.roles.includes(userRole as Global.Role))
              .map((route) => (
                <ListItem
                  key={route.path}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  {open ? (
                    <ListItemButton
                      onClick={() => navigate(route.path)}
                      sx={{
                        minHeight: 48,
                        justifyContent: "center",
                        px: 2.5,
                        m: 1,
                        borderRadius: "10px",
                        backgroundColor: currentPath.includes(route.path)
                          ? "secondary.light"
                          : "inherit",
                        boxShadow: currentPath.includes(route.path) ? 3 : 0,
                        ":hover": {
                          backgroundColor: "secondary.light",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 2 : "auto",
                          justifyContent: "center",
                          color: "black",
                        }}
                      >
                        {route.iconClass}
                      </ListItemIcon>

                      <ListItemText
                        primary={route.name}
                        primaryTypographyProps={{ fontWeight: 600 }}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  ) : (
                    <Tooltip title={route.name} placement="right" arrow>
                      <ListItemButton
                        onClick={() => navigate(route.path)}
                        sx={{
                          minHeight: 48,
                          justifyContent: "center",
                          px: 2.5,
                          m: 1,
                          borderRadius: "10px",
                          backgroundColor: currentPath.includes(route.path)
                            ? "secondary.light"
                            : "inherit",
                          boxShadow: currentPath.includes(route.path) ? 3 : 0,
                          ":hover": {
                            backgroundColor: "secondary.light",
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 2 : "auto",
                            justifyContent: "center",
                            color: "black",
                          }}
                        >
                          {route.iconClass}
                        </ListItemIcon>

                        <ListItemText
                          primary={route.name}
                          primaryTypographyProps={{ fontWeight: 600 }}
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                      </ListItemButton>
                    </Tooltip>
                  )}
                </ListItem>
              ))}
          </List>
          {/* <IconButton onClick={() => setOpenCart(true)}>
            <ShoppingCartOutlined />
          </IconButton> */}
          <ListItem disablePadding sx={{ display: "block" }}>
            {open ? (
              <ListItemButton
                onClick={() => setOpenCart(true)}
                sx={{
                  minHeight: 48,
                  justifyContent: "center",
                  px: 2.5,
                  m: 1,
                  borderRadius: "10px",
                  backgroundColor: "inherit",
                  boxShadow: 0,
                  ":hover": {
                    backgroundColor: "secondary.light",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : "auto",
                    justifyContent: "center",
                    color: "black",
                  }}
                >
                  <ShoppingCartOutlined fontSize="small" />
                </ListItemIcon>

                <ListItemText
                  primary="Your Cart"
                  primaryTypographyProps={{ fontWeight: 600 }}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            ) : (
              <Tooltip title="Cart" placement="right" arrow>
                <ListItemButton
                  onClick={() => setOpenCart(true)}
                  sx={{
                    minHeight: 48,
                    justifyContent: "center",
                    px: 2.5,
                    m: 1,
                    borderRadius: "10px",
                    backgroundColor: "inherit",
                    boxShadow: 0,
                    ":hover": {
                      backgroundColor: "secondary.light",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color: "black",
                    }}
                  >
                    <ShoppingCartOutlined fontSize="small" />
                  </ListItemIcon>

                  <ListItemText
                    primary={"Your Cart"}
                    primaryTypographyProps={{ fontWeight: 600 }}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
            )}
          </ListItem>
        </Box>
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
      <AdminModal
        open={openAdminModal}
        handleClose={handleCloseAdminModal}
        adminData={data && data.data.profile}
        mode="edit"
      />

      {openCart && (
        <ShoppingCart
          open={openCart}
          onClose={() => setOpenCart(false)}
          // sx={{
          //   position: "fixed",

          //   top: appBarHeight, // Set top position to below the AppBar
          // }}
        />
      )}

      {/* Add Client Modal */}
      <ClientModal
        open={openClientModal}
        handleClose={handleCloseClientModal}
        clientData={data && data.data.profile}
        mode="edit" // or "view", based on the context
        data={null}
      />
      <JobWorkerModal
        open={openJobWorkerModal}
        handleClose={handleCloseJobWorkerModal}
        jobWorkerData={
          data && (data.data.profile as jobWorkerTypes.getJobWorkers)
        }
        mode={"edit"}
      />
    </Box>
  );
}
