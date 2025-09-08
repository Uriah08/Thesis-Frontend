import { View, Text } from 'react-native'
import React from 'react'
import Notifications from '@/components/pages/Notifications'
import { ScrollView } from 'react-native-gesture-handler'

const Notification = () => {
  return (
    <View className='flex-1 bg-white'>
      <Text className='mt-10 text-3xl p-5' style={{
              fontFamily: 'PoppinsBold'
            }}>Notifications</Text>
      
      <ScrollView className='p-5'>
        <Notifications/>
      </ScrollView>
    </View>
  )
}

export default Notification