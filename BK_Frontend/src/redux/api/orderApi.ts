import { indexApi } from "./indexApi";

const clientApi = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<orderTypes.getOrders, null>({
      query: () => ({
        method: "GET",
        url: "Order",
      }),
      providesTags: ["Order"],
    }),
    getOrderDashboard: builder.query({
      query: () => "order/Dashboard", // The endpoint in your backend controller
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrderDashboardQuery } = clientApi;
