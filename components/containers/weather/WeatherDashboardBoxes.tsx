import { CloudRain, Cloudy, Wind } from 'lucide-react-native'
import React from 'react'
import { View, Text } from 'react-native'

type WeatherData = {
    pop?: number;
    wind_speed?: number;
    clouds?: number;
}
const WeatherDashboardBoxes = ({ pop, wind_speed, clouds}: WeatherData) => {
  return (
        <View className='justify-between flex-row gap-3 px-5 mt-5'>
          <View className='p-3 flex bg-primary gap-2' style={{ width: '30%', borderRadius: 12 }}>
            <View className='flex-row items-center gap-1'>
            <CloudRain size={30} color={'#ffffff'}/>
            <Text className='text-sm text-white' style={{ fontFamily: 'PoppinsRegular'}}>Rain</Text>
            </View>
            <Text className='text-white' style={{ fontFamily: 'PoppinsBold', fontSize: 17 }}>{(pop !== undefined ? Math.round(pop * 100) : 0)}<Text className='text-sm' style={{ fontFamily: 'PoppinsRegular'}}>%</Text></Text>
          </View>
          <View className='p-3 flex bg-primary gap-2' style={{ width: '30%', borderRadius: 12 }}>
            <View className='flex-row items-center gap-1'>
            <Wind size={30} color={'#ffffff'}/>
            <Text className='text-sm text-white' style={{ fontFamily: 'PoppinsRegular'}}>Wind</Text>
            </View>
            <Text className='text-white' style={{ fontFamily: 'PoppinsBold', fontSize: 17 }}>{wind_speed}<Text className='text-sm' style={{ fontFamily: 'PoppinsRegular'}}>m/s</Text></Text>
          </View>
          <View className='p-3 flex bg-primary gap-2' style={{ width: '30%', borderRadius: 12 }}>
            <View className='flex-row items-center gap-1'>
            <Cloudy size={30} color={'#ffffff'}/>
            <Text className='text-sm text-white' style={{ fontFamily: 'PoppinsRegular'}}>Cloudy</Text>
            </View>
            <Text className='text-white' style={{ fontFamily: 'PoppinsBold', fontSize: 17 }}>{clouds}<Text className='text-sm' style={{ fontFamily: 'PoppinsRegular'}}>%</Text></Text>
          </View>
        </View>
  )
}

export default WeatherDashboardBoxes