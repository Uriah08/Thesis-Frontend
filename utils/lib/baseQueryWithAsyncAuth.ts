import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://192.168.43.157:8000/api/',
});

export const baseQueryWithAsyncAuth = async (args: any, api: any, extraOptions: any) => {
  const token = await AsyncStorage.getItem('authToken');

  const modifiedArgs =
    typeof args === 'string'
      ? { url: args }
      : {
          ...args,
          headers: {
            ...(args.headers || {}),
            Authorization: token ? `Token ${token}` : '',
          },
        };

  return baseQuery(modifiedArgs, api, extraOptions);
};
