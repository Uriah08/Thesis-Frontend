import { View, Text, Image } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import SkeletonShimmer from '../SkeletonPlaceholder';
import { Farm } from '@/utils/types';

type FarmProps = {
    data: Farm[]
    isLoading: boolean
}
const GetFarm = ({ data, isLoading }: FarmProps) => {

  return (
    <View className="w-full h-full gap-5 px-5">
      {isLoading ? (
        <View className="flex gap-5">
          <SkeletonShimmer height={110} borderRadius={16} />
          <SkeletonShimmer height={110} borderRadius={16} />
          <SkeletonShimmer height={110} borderRadius={16} />
        </View>
      ) : (
        data?.length === 0 ? (
            <View className='flex-1 items-center justify-center' style={{
                height: 500
            }}>
                <Image
                source={require('@/assets/images/hero-image.png')}
                style={{ width: 200, height: 200, opacity: 0.5}}
                resizeMode={'contain'}
                />
                <Text style={{
                    fontSize: 20,
                    fontFamily: 'PoppinsExtraBold',
                    color: '#15518330'
                }}>NO FARMS FOUND</Text>
            </View>
        ) : (
            data?.map((farm, index) => (
          <View
            key={index}
            className="p-3 border border-zinc-300 rounded-xl relative overflow-hidden flex-col justify-between"
            style={{
              height: 110,
            }}
          >
            <Text
              className="text-3xl text-zinc-600"
              style={{
                fontFamily: 'PoppinsSemiBold',
                zIndex: 2,
              }}
            >
              {farm.name.length > 10
                ? farm.name.slice(0, 10).charAt(0).toUpperCase() +
                  farm.name.slice(1, 12) +
                  '...'
                : farm.name.charAt(0).toUpperCase() + farm.name.slice(1)}
            </Text>

            <View className="flex gap-1">
              <Text
                className="text-sm text-zinc-500"
                style={{
                  fontFamily: 'PoppinsRegular',
                }}
              >
                Members: {farm.members.length}
              </Text>
            </View>

            <View
              style={{
                width: 150,
                height: 120,
                position: 'absolute',
                top: 0,
                right: 0,
                overflow: 'hidden',
                zIndex: 1,
              }}
            >
              <Image
                source={
                  farm?.image_url
                    ? { uri: farm.image_url }
                    : require('@/assets/images/create-farm.png')
                }
                style={{
                  width: 150,
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
        ))
        )
      )}
    </View>
  );
};

export default GetFarm;
