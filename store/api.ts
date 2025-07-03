import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.43.157:8000/api/',
  }),
  tagTypes: [],
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials: { username: string; password: string }) => ({
        url: 'login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: build.mutation({
      query: (userData: { username: string; email: string; password: string; confirmPassword: string }) => ({
        url: 'login/',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useLoginMutation } = api;
