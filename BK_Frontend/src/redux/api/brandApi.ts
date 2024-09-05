import { indexApi } from "./indexApi";

const brandApi = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    addBrand: builder.mutation<Global.apiResponse<object>, brandTypes.addBrand>(
      {
        query: (brand) => ({
          url: "/Brand",
          method: "POST",
          body: brand,
        }),
        invalidatesTags: ["Brand"],
      }
    ),
    updateBrand: builder.mutation<
      Global.apiResponse<string>,
      { id: number; data: brandTypes.updateBrand }
    >({
      query: ({ id, data }) => ({
        url: `/Brand/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Brand"],
    }),
    getBrandById: builder.query<brandTypes.brandDetails, number>({
      query: (id) => `/Brand/${id}`,
      providesTags: ["Brand"],
    }),
  }),
});
export const {
  useAddBrandMutation,
  useGetBrandByIdQuery,
  useUpdateBrandMutation,
} = brandApi;
