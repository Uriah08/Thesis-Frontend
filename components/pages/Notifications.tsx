import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'

const Notifications = () => {
  return (
    <View className='flex bg-white gap-3'>
      <View
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#d4d4d8',
      }}
      className="w-full rounded-xl">
        <Pressable
        android_ripple={{ color: '#d3d3d3', borderless: false }}
        className='p-3 flex-row gap-3 relative'>
          <View style={{ height: 8, width: 8, borderRadius: 999, backgroundColor: '#0c5f1a', position: 'absolute', bottom: 15, right: 15}}></View>
          <Image source={require('@/assets/images/notification-icons/announcement.png')} style={{ width: 45, height: 45}} resizeMode='contain'/>
          <View className='flex-1'>
              <View className='flex-row justify-between'>
              <Text style={{ fontFamily: 'PoppinsSemiBold', fontSize: 14 }} className='text-[#626262]'>Announcement</Text>
              <Text style={{ fontFamily: 'PoppinsMedium', fontSize: 12, color: '#858585' }}>Today</Text>
          </View>
          <Text style={{ fontFamily: 'PoppinsRegular', fontSize: 12, color: '#858585'}}>Hello mga kabaranggay, meron k...</Text>
          </View>
        </Pressable>
      </View>
      
    </View>
  )
}

export default Notifications