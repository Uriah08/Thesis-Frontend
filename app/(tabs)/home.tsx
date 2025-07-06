import { Text, Pressable, BackHandler } from 'react-native'
import { useLogoutMutation } from '@/store/api';
import { router } from 'expo-router';
import { getStoredUser } from '@/utils/session';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';

const Home = () => {
  const [logout] = useLogoutMutation();
  const [user, setUser] = useState<{ username: string; id?: number; email?: string } | null>(null);

  useFocusEffect(
  useCallback(() => {
    const onBackPress = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      backHandler.remove();
    };
  }, [])
);

  useEffect(() => {
    const loadUser = async () => {
      const data = await getStoredUser();
      setUser(data);
      if(!data) {
        await logout()
        router.replace("/(auth)/login");
      }
    };
    loadUser();
  }, [logout]);

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  return (
    <Pressable onPress={handleLogout} className='flex-1 justify-center items-center'>
      <ChevronLeft onPress={() => router.push('/')} style={{ marginTop: 50, marginLeft: 30 }} color="black" size={32} />
      <Text className='text-xl'>Welcome, {user?.username}!</Text>
      <Text className='text-xl'>Id, {user?.id} : {user?.email}!</Text>
      <Text className="text-red-500 font-semibold">Logout</Text>
    </Pressable>
  );
}

export default Home