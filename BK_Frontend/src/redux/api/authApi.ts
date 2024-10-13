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
      invalidatesTags: ["Admin", "Client", "JobWorker"],
    }),
    forgotPassword: builder.mutation<
      authTypes.apiResponse,
      authTypes.forgotPasswordParams
    >({
      query: (data) => ({
        url: "Auth/ForgotPassword",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin", "Client", "JobWorker"],
    }),
    resetPassword: builder.mutation<
      authTypes.apiResponse,
      authTypes.resetPasswordParams
    >({
      query: (data) => ({
        url: `Auth/ResetPassword`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin", "Client", "JobWorker"],
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
