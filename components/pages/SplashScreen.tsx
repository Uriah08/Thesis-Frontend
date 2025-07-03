import { View, Image } from 'react-native'
import React from 'react'

const SplashScreens = () => {

  return (
    <View className="flex-1 items-center justify-center bg-white">
        <Image
            source={require('@/assets/images/main-icon.png')}
            style={{width: 200, height: 200}}
            resizeMode="contain"
        />
    </View>
  )
}

export default SplashScreens