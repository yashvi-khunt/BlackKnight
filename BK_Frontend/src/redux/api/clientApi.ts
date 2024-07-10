import { indexApi } from "./indexApi";

const clientApi = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    addClient: builder.mutation<
      Global.apiResponse<object>,
      clientTypes.addClient
    >({
      query: (data) => ({
        method: "POST",
        url: "User/Add-Client",
        body: data,
      }),
      invalidatesTags: ["Client"],
    }),
    getClients: builder.query<clientTypes.getClients, null>({
      query: () => ({
        method: "GET",
        url: "User/Get-all-clients",
      }),
      providesTags: ["Client"],
    }),
  }),
});

export const { useAddClientMutation, useGetClientsQuery } = clientApi;
