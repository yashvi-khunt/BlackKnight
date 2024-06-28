import {
  AddEditProducts,
  Clients,
  Dashboard,
  Jobworkers,
  OrderDetails,
  Orders,
  Products,
} from "../pages";
import {
  HomeOutlined,
  ManageAccountsOutlined,
  PermContactCalendarOutlined,
  ShoppingCartOutlined,
  WidgetsOutlined,
} from "@mui/icons-material";

export const adminRoutes: Global.RouteConfig = [
  {
    name: "Dashboard",
    path: "/dashboard",
    element: <Dashboard />,
    iconClass: <HomeOutlined fontSize="small" />,
    roles: ["Admin"],
  },
  {
    name: "Orders",
    path: "/orders",
    element: null,
    roles: ["Admin"],
    iconClass: <ShoppingCartOutlined fontSize="small" />,
    children: [
      {
        path: "",
        element: <Orders />,
        roles: ["Admin"],
      },
      {
        path: "details/:id",
        element: <OrderDetails />,
        roles: ["Admin"],
      },
    ],
  },
  {
    name: "Products",
    path: "/products",
    element: null,
    roles: ["Admin"],
    iconClass: <WidgetsOutlined fontSize="small" />,
    children: [
      {
        path: "",
        element: <Products />,
        roles: ["Admin"],
      },
      {
        path: "add",
        element: <AddEditProducts />,
        roles: ["Admin"],
      },
      {
        path: "edit/:id",
        element: <AddEditProducts />,
        roles: ["Admin"],
      },
      {
        path: "details/:id",
        element: <AddEditProducts />,
        roles: ["Admin"],
      },
    ],
  },
  {
    name: "Clients",
    path: "/clients",
    element: <Clients />,
    roles: ["Admin"],
    iconClass: <PermContactCalendarOutlined fontSize="small" />,
  },
  {
    name: "Job Workers",
    path: "/job-workers",
    element: <Jobworkers />,
    roles: ["Admin"],
    iconClass: <ManageAccountsOutlined fontSize="small" />,
  },
];
