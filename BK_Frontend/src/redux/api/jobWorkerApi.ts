import { indexApi } from "./indexApi";

const jobWorkerApi = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    addJobWorker: builder.mutation<
      Global.apiResponse<object>,
      jobWorkerTypes.addJobWorker
    >({
      query: (data) => ({
        method: "POST",
        url: "User/Add-jobWorker",
        body: data,
      }),
      invalidatesTags: ["JobWorker"],
    }),
    getJobWorkers: builder.query<jobWorkerTypes.getJobWorkers, object>({
      query: (queryParams) => ({
        method: "GET",
        url: "User/Get-all-jobWorkers",
        params: queryParams,
      }),
      providesTags: ["JobWorker"],
    }),
    updateJobWorker: builder.mutation<
      Global.apiResponse<string>,
      { data: jobWorkerTypes.updateJobWorker; id: string }
    >({
      query: ({ data, id }) => ({
        method: "PUT",
        url: `User/Update-jobWorker/${id}`,
        body: data,
      }),
      invalidatesTags: ["JobWorker"],
    }),
  }),
});

export const {
  useAddJobWorkerMutation,
  useGetJobWorkersQuery,
  useUpdateJobWorkerMutation,
} = jobWorkerApi;
