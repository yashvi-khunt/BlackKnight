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
    getProducts: builder.query<productTypes.getProducts, object>({
      query: (queryParams) => ({
        method: "GET",
        url: "Product",
        params: queryParams,
      }),
      providesTags: ["Product"],
    }),
    updateProduct: builder.mutation<
      Global.apiResponse<string>,
      { data: productTypes.addProduct; id: string }
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
    deleteProduct: builder.mutation<Global.apiResponse<string>, { id: string }>(
      {
        query: ({ id }) => ({
          method: "DELETE",
          url: `Product/${id}`,
        }),
        invalidatesTags: ["Product"],
      }
    ),
  }),
});

export const {
  useGetProductDetailsQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
  useAddProductMutation,
  useDeleteProductMutation,
} = clientApi;
