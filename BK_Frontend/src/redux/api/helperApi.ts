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
    getBrands: builder.query<Global.dropDownOptions, number>({
      query: (id) => ({
        method: "GET",
        url: `Brands/Option/${id}`,
      }),
      providesTags: ["Brand"],
    }),
    getClientOptions: builder.query<Global.dropDownOptions, void>({
      query: () => ({
        method: "GET",
        url: "User/Get-client-options",
      }),
      providesTags: ["Client"],
    }),
    getJobworkerOptions: builder.query<Global.dropDownOptions, void>({
      query: () => ({
        method: "GET",
        url: "User/Get-jobworker-options",
      }),
      providesTags: ["Jobworker"],
    }),
  }),
});

export const {
  useGetPaperTypesQuery,
  useGetBrandsQuery,
  useGetClientOptionsQuery,
  useGetJobworkerOptionsQuery,
} = otherApis;
