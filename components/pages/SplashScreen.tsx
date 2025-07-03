import { View, Image } from 'react-native'
import React, { useEffect } from 'react'

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {

    useEffect(() => {
        const timeout = setTimeout(() => {
          onFinish();
        }, 3000);
    
        return () => clearTimeout(timeout);
      }, [onFinish]);

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

export default SplashScreen