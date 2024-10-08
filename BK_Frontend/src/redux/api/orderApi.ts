import { indexApi } from "./indexApi";

const clientApi = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<orderTypes.getOrders, object>({
      query: (queryParams) => ({
        method: "GET",
        url: "Order",
        params: queryParams,
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
    addOrder: builder.mutation<Global.apiResponse<object>, null>({
      query: () => ({
        method: "POST",
        url: `Order`,
      }),
      invalidatesTags: ["Order", "Wishlist"],
    }),
    deleteOrder: builder.mutation<Global.apiResponse<object>, { id: number }>({
      query: ({ id }) => ({
        method: "DELETE",
        url: `Order/${id}`,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderDashboardQuery,
  useGetOrderByIdQuery,
  useAddOrderMutation,
  useDeleteOrderMutation,
} = clientApi;
