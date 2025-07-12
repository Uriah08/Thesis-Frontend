import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.43.157:8000/api/',
  }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials: { username: string; password: string }) => ({
        url: 'login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: build.mutation({
      query: (userData: { username: string; email: string; password: string; confirm_password: string }) => ({
        url: 'register/',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const api = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.43.157:8000/api/',
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        headers.set('Authorization', `Token ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    completeProfile: build.mutation({
      query: (profileData) => ({
        url: 'complete-profile/',
        method: 'PUT',
        body: profileData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation
} = authApi;

export const {
  useCompleteProfileMutation
} = api;
