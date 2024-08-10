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
  }),
});

export const { useGetOrdersQuery } = clientApi;
