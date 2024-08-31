import { indexApi } from "./indexApi";

const otherApis = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaperTypes: builder.query<Global.dropDownOptions, void>({
      query: () => ({
        method: "GET",
        url: "Paper/Options",
      }),
      providesTags: ["Paper"],
    }),
    getBrands: builder.query<Global.dropDownOptions, { id: string }>({
      query: (id) => ({
        method: "GET",
        url: `Brands/Options/${id}`,
      }),
      providesTags: ["Brand"],
    }),
    getPrintTypes: builder.query<Global.dropDownOptions, void>({
      query: () => ({
        method: "GET",
        url: "Print/Options",
      }),
      providesTags: ["Print"],
    }),
    getClientOptions: builder.query<Global.dropDownOptions, void>({
      query: () => ({
        method: "GET",
        url: "User/Get-client-options",
      }),
      providesTags: ["Client"],
    }),
    getJobWorkerOptions: builder.query<Global.dropDownOptions, void>({
      query: () => ({
        method: "GET",
        url: "User/Get-jobWorker-options",
      }),
      providesTags: ["JobWorker"],
    }),
  }),
});

export const {
  useGetPaperTypesQuery,
  useGetBrandsQuery,
  useGetClientOptionsQuery,
  useGetJobWorkerOptionsQuery,
  useGetPrintTypesQuery,
} = otherApis;
