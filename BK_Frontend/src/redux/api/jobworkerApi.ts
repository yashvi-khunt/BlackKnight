import { indexApi } from "./indexApi";

const jobworkerApi = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    addJobworker: builder.mutation<
      Global.apiResponse<object>,
      jobworkerTypes.addJobworker
    >({
      query: (data) => ({
        method: "POST",
        url: "User/Add-jobworker",
        body: data,
      }),
      invalidatesTags: ["Jobworker"],
    }),
    getJobworkers: builder.query<jobworkerTypes.getJobworkers, null>({
      query: () => ({
        method: "GET",
        url: "User/Get-all-jobworkers",
      }),
      providesTags: ["Jobworker"],
    }),
    updateJobworker: builder.mutation<
      Global.apiResponse<string>,
      { data: jobworkerTypes.updateJobworker; id: string }
    >({
      query: ({ data, id }) => ({
        method: "PUT",
        url: `User/Update-jobworker/${id}`,
        body: data,
      }),
      invalidatesTags: ["Jobworker"],
    }),
  }),
});

export const {
  useAddJobworkerMutation,
  useGetJobworkersQuery,
  useUpdateJobworkerMutation,
} = jobworkerApi;
