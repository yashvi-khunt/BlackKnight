import { indexApi } from "./indexApi";

const paperApi = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    addPaperType: builder.mutation<
      Global.apiResponse<object>,
      paperTypes.addPaperType
    >({
      query: (paperType) => ({
        url: "/Paper",
        method: "POST",
        body: paperType,
      }),
      invalidatesTags: ["Paper"],
    }),
    updatePaperType: builder.mutation<
      Global.apiResponse<string>,
      { id: number; data: paperTypes.updatePaperType }
    >({
      query: ({ id, data }) => ({
        url: `/Paper/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Paper"],
    }),
    getPaperTypeById: builder.query<paperTypes.getPaperType, number>({
      query: (id) => `/Paper/${id}`,
      providesTags: ["Paper"],
    }),
  }),
});
export const {
  useAddPaperTypeMutation,
  useUpdatePaperTypeMutation,
  useGetPaperTypeByIdQuery,
} = paperApi;
