import { indexApi } from "./indexApi";

const clientApi = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation<
      Global.apiResponse<object>,
      productTypes.addProduct
    >({
      query: (data) => ({
        method: "POST",
        url: "Product",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    getProducts: builder.query<productTypes.getProducts, null>({
      query: () => ({
        method: "GET",
        url: "Product",
      }),
      providesTags: ["Product"],
    }),
    updateProduct: builder.mutation<
      Global.apiResponse<string>,
      { data: productTypes.updateProduct; id: string }
    >({
      query: ({ data, id }) => ({
        method: "PUT",
        url: `Product/${id}`,
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    getProductDetails: builder.query<productTypes.getProduct, { id: string }>({
      query: ({ id }) => ({
        method: "GET",
        url: `Product/${id}`,
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductDetailsQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
  useAddProductMutation,
} = clientApi;
