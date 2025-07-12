import { Text, Pressable, BackHandler, View, ActivityIndicator, Image } from 'react-native'
import { router } from 'expo-router';
import { useCallback } from 'react';
import { ChevronLeft } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import useAuthRedirect from '@/components/hooks/useAuthRedirect';

const Home = () => {

  const { checking, user } = useAuthRedirect()

  const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('authToken');

    Toast.show({
      type: 'success',
      text1: 'Logged out successfully!',
    });

    router.replace('/login');
  } catch (error) {
    console.error('Logout error:', error);
    Toast.show({
      type: 'error',
      text1: 'Failed to log out.',
    });
  }
};

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

  if (checking) return (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator size={50}/>
        </View>
      );
  
  return (
    <Pressable className='flex-1 justify-center items-center'>
      <ChevronLeft onPress={() => router.push('/')} style={{ marginTop: 50, marginLeft: 30 }} color="black" size={32} />
      <Text className='text-xl'>Welcome, {user?.first_name}!</Text>
      <Text className='text-xl'>Id, {user?.id} : {user?.email}!</Text>
      <View className="border-[3px] border-primary mt-10 rounded-full p-1 relative">
                <Image
                  source={
                    user?.profile_picture
                      ? { uri: user?.profile_picture }
                      : require('@/assets/images/default-profile.png')
                  }
                  style={{ width: 80, height: 80, borderRadius: 999 }}
                  resizeMode="cover"
                />
              </View>
      <Text onPress={() => handleLogout()} className="text-red-500 font-semibold">Logout</Text>
    </Pressable>
  );
}

export default Home