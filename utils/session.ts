import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStoredUser = async () => {
  const user = await AsyncStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
