import { View, Text, Image } from 'react-native'
import React from 'react'
import { useGetFarmsQuery } from '@/store/api'
import { LinearGradient } from 'expo-linear-gradient';

const GetFarm = () => {
    const { data, isLoading } = useGetFarmsQuery()
    
  return (
    <View className='w-full h-full gap-5 px-5'>
        {data?.map((farm, index) => (
        <View
            key={index}
            className="p-3 border border-zinc-300 rounded-xl relative overflow-hidden"
            style={{
                height: 110,
            }}
        >
            <Text
            className="text-2xl"
            style={{
                fontFamily: 'PoppinsBold',
            }}
            >
            {farm.name[0].toUpperCase() + farm.name.slice(1)}
            </Text>

            <View
            style={{
                width: 120,
                height: 120,
                position: 'absolute',
                top: 0,
                right: 0,
                overflow: 'hidden',
            }}
            >
            <Image
                source={
                farm?.image_url
                    ? { uri: farm.image_url }
                    : require('@/assets/images/create-farm.png')
                }
                style={{
                width: 120,
                height: 120,
                }}
                resizeMode="cover"
            />
            <LinearGradient
                colors={['#ffffff60', 'white']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                }}
            />
            </View>
        </View>
        ))}
    </View>
  )
}

export default GetFarm