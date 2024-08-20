import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const indexApi = createApi({
  reducerPath: "indexApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5063/api/",
    prepareHeaders: (headers, { getState }) => {
      const { token: token } = (getState() as RootState).auth;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Client",
    "Admin",
    "Jobworker",
    "Product",
    "Order",
    "Paper",
    "Brand",
    "Print",
  ],
  endpoints: () => ({}),
});

export const {} = indexApi;
