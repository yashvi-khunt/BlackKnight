declare namespace Global {
  type route = {
    name?: string;
    path: string;
    element: React.ReactNode;
    roles: Array<Role>;
    children?: Array<route>;
    iconClass?: SvgIconTypeMap;
  };
  type RouteConfig = Array<route>;

  type Role = "Admin" | "Client" | "Jobworker";

  type AuthRoutes = Array<{
    path: string;
    element?: React.ReactNode;
    children?: AuthRoutes;
  }>;

  type Option = {
    label: string;
    value: number | string;
  };

  type UserData = {
    role: string;
    id: string;
    email: string;
  };

  type InitialUser = {
    status: boolean;
    userData: UserData | null;
    token: string | null;
  };

  type dropDownOptions = Global.apiResponse<Global.Option[]>;

  type SearchParams = {
    page?: number;
    pageSize?: number;
    field?: string;
    sort?: GridSortDirection;
  };

  type apiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
  };

  type DecodedToken = {
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  };
}
