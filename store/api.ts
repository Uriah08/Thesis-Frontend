import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAsyncAuth } from "@/utils/lib/baseQueryWithAsyncAuth";

export type WeatherData = {
  city: {
    country: string;
    name: string;
  };
  first_item: {
    datetime: string;
    description: string;
    icon: string;
    temperature: number;
    pop: number;
    wind_speed: number;
    clouds: number;
  };
  future_forecast: {
    datetime: string;
    description: string;
    icon: string;
    temperature: number;
    pop: number;
    wind_speed: number;
    clouds: number;
  }[];
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.43.157:8000/api/users/',
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
  baseQuery: baseQueryWithAsyncAuth('users'),
  endpoints: (build) => ({
    completeProfile: build.mutation({
      query: (profileData) => ({
        url: 'complete-profile/',
        method: 'PUT',
        body: profileData,
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: 'logout/',
        method: 'POST',
      }),
    }),
    changePassword: build.mutation({
      query: (passwordData) => ({
        url: 'change-password/',
        method: 'PUT',
        body: passwordData
      })
    })
  }),
});

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: baseQueryWithAsyncAuth('weather'),
  endpoints: (build) => ({
    getWeatherForecast: build.query<WeatherData, void>({
      query: () => ({
        url: 'forecast/',
        method: 'GET',
      })
    }),
  }),
})

export const {
  useGetWeatherForecastQuery
} = weatherApi;

export const {
  useLoginMutation,
  useRegisterMutation
} = authApi;

export const {
  useCompleteProfileMutation,
  useLogoutMutation,
  useChangePasswordMutation
} = api;
