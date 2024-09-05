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
    "JobWorker",
    "Product",
    "Order",
    "Paper",
    "Brand",
    "Print",
  ],
  endpoints: (builder) => ({
    getProfile: builder.query<object, null>({
      query: () => ({
        method: "GET",
        url: "User/Profile",
      }),
      providesTags: ["Admin", "Client", "JobWorker"],
    }),
    updateAdmin: builder.mutation<Global.apiResponse<string>, object>({
      query: (data) => ({
        method: "PUT",
        url: "User/Update-admin",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateAdminMutation } = indexApi;
