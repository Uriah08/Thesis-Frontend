import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.43.157:8000/api/',
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
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
      query: (userData: { username: string; email: string; password: string; confirm_password: string }) => ({
        url: 'register/',
        method: 'POST',
        body: userData,
      }),
    }),
    logout: build.mutation<void, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const refreshToken = await AsyncStorage.getItem("refreshToken");

          const result = await fetchWithBQ({
            url: "logout/",
            method: "POST",
            body: { refresh: refreshToken },
          });

          await AsyncStorage.removeItem("accessToken");
          await AsyncStorage.removeItem("refreshToken");

          if (result.error) {
            return { error: result.error };
          }

          return { data: undefined };
        } catch {
          return {
            error: {
              status: 500,
              data: "Logout failed unexpectedly",
            },
          };
        }
      },
    }),
  }),
});

export const { 
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation
 } = api;
