import React, { useState } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import SplashScreen from '@/components/pages/SplashScreen';
import { useFonts } from 'expo-font';

export default function Index() {
  
  const [ loaded ] = useFonts({
    PoppinsBold: require('@/assets/fonts/Poppins-Bold.ttf'),
    PoppinsSemiBold: require('@/assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsMedium: require('@/assets/fonts/Poppins-Medium.ttf'),
    PoppinsRegular: require('@/assets/fonts/Poppins-Regular.ttf'),
    PoppinsLight: require('@/assets/fonts/Poppins-Light.ttf'),
    PoppinsExtraLight: require('@/assets/fonts/Poppins-ExtraLight.ttf'),
    PoppinsThin: require('@/assets/fonts/Poppins-Thin.ttf'),
    PoppinsExtraBold: require('@/assets/fonts/Poppins-ExtraBold.ttf'),
  })

  const [isLoading, setIsLoading] = useState(true);

  if (isLoading || !loaded) {
    return <SplashScreen onFinish={() => setIsLoading(false)} />;
  }
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  // const [ hello ] = useHelloMutation();

  // const handleRegister = async () => {
  //   try {
  //     console.log('Registering with:', { username, password });
  //     const response = await hello({ username, password }).unwrap();
  //     console.log('Register success:', response);
  //   } catch (err) {
  //     console.error('Register error:', err);
  //   }
  // };

  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Image
        source={require('@/assets/images/hero-image.png')}
        style={{ width: 300, height: 300 }}
        resizeMode="contain"
      />
      <Text 
        className='text-[24px] mt-5' 
        style={{
          fontFamily: 'PoppinsSemiBold'
        }}
        >Welcome to
      </Text>
      <Text 
        className='text-[24px]' 
        style={{
          fontFamily: 'PoppinsSemiBold'
        }}
        >To
          <Text className='text-primary'>
            You
          </Text>
      </Text>
      <Text 
        className='text-center text-sm px-12 mt-5 text-zinc-500'
        style={{
          fontFamily: 'PoppinsRegular'
        }}
      >A smart mobile app that uses AI to help sun-dried fish farmers identify which fish are fully dried and ready for harvest.
      </Text>
      <Pressable 
        className='mt-14 bg-primary w-[260px] py-3 rounded-full'
        onPress={() => console.log('Login Pressed')}
        >
        <Text 
          className='text-white text-center'
          style={{
            fontFamily: 'PoppinsRegular',
          }}
        >Login</Text>
      </Pressable>
      <View className="relative my-4 items-center">
        <View className="h-px w-32 bg-zinc-500" />
        <Text 
        className="absolute text-sm bg-white px-2 text-zinc-500 -top-[8px]"
        style={{
          fontFamily: 'PoppinsRegular',
        }}
        >Or</Text>
      </View>
      <Pressable 
        className='bg-white w-[258px] py-[10px] rounded-full border border-zinc-300'
        onPress={() => console.log('Register Pressed')}
        >
        <Text 
          className='text-black text-center'
          style={{
            fontFamily: 'PoppinsRegular',
          }}
        >Register</Text>
      </Pressable>
    </View>
  );
}
