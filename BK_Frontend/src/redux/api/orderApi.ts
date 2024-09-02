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
      query: () => "order/Dashboard",
      providesTags: ["Order"], // The endpoint in your backend controller
    }),
    getOrderById: builder.query<orderTypes.getOrderById, { id: number }>({
      query: ({ id }) => ({
        method: "GET",
        url: `Order/${id}`,
        providesTags: ["Order"],
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderDashboardQuery,
  useGetOrderByIdQuery,
} = clientApi;
