import {
  AddEditProducts,
  Clients,
  Dashboard,
  JobWorkers,
  OrderDetails,
  Orders,
  ProductDetails,
  ProductEditPage,
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
    roles: ["Admin", "JobWorker", "Client"],
  },
  {
    name: "Orders",
    path: "/orders",
    element: null,
    roles: ["Admin", "JobWorker", "Client"],
    iconClass: <ShoppingCartOutlined fontSize="small" />,
    children: [
      {
        path: "",
        element: <Orders />,
        roles: ["Admin", "JobWorker", "Client"],
      },
      {
        path: "details/:id",
        element: <OrderDetails />,
        roles: ["Admin", "JobWorker", "Client"],
      },
    ],
  },
  {
    name: "Products",
    path: "/products",
    element: null,
    roles: ["Admin", "JobWorker", "Client"],
    iconClass: <WidgetsOutlined fontSize="small" />,
    children: [
      {
        path: "",
        element: <Products />,
        roles: ["Admin", "JobWorker", "Client"],
      },
      {
        path: "add",
        element: <AddEditProducts isEdit={false} productData={null} />,
        roles: ["Admin"],
      },
      {
        path: "edit/:id",
        element: <ProductEditPage />,
        roles: ["Admin"],
      },
      {
        path: "details/:id",
        element: <ProductDetails />,
        roles: ["Admin", "JobWorker", "Client"],
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
    element: <JobWorkers />,
    roles: ["Admin"],
    iconClass: <ManageAccountsOutlined fontSize="small" />,
  },
];
