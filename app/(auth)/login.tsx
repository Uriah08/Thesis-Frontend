import { View } from 'react-native'
import React from 'react'
import { ChevronLeft } from 'lucide-react-native';
import { router } from 'expo-router';

const Login = () => {
  return (
    <View className='bg-white flex-1'>
      <ChevronLeft onPress={() => router.push('/')} style={{ marginTop: 40, marginLeft: 10 }} color="black" size={32} />
    </View>
  )
}

export default Login