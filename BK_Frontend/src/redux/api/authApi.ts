import { indexApi } from "./indexApi";

export const authApi = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      authTypes.apiResponse,
      authTypes.loginRegisterParams
    >({
      query: (data) => ({
        url: "/Auth/Login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin", "Client", "Jobworker"],
    }),
  }),
});

export const { useLoginMutation } = authApi;
