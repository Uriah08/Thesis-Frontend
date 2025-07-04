import { View, Image, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function Index() {
  return (
    <View className='flex-1 px-10 items-center justify-center bg-white'>
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
        className='text-center text-sm mt-5 text-zinc-500'
        style={{
          fontFamily: 'PoppinsRegular'
        }}
      >A smart mobile app that uses AI to help sun-dried fish farmers identify which fish are fully dried and ready for harvest.
      </Text>
      <Pressable 
        className='mt-14 bg-primary w-full py-3 rounded-full'
        onPress={() => router.push('/(auth)/login')}
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
        className='bg-white w-full py-[10px] rounded-full border border-zinc-300'
        onPress={() => router.push('/(auth)/register')}
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
