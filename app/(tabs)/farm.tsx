import { View, Text, Pressable, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { MapPlus, Plus } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import CreateFarm from '@/components/containers/dialogs/CreateFarm';
import JoinFarm from '@/components/containers/dialogs/JoinFarm';
import GetFarm from '@/components/containers/farm/GetFarm';

const Farm = () => {
  const [active, setActive] = useState(false);
  const opacity1 = useSharedValue(0)
  const translateX1 = useSharedValue(30)

  const opacity2 = useSharedValue(0)
  const translateX2 = useSharedValue(30)

  const rotation = useSharedValue(0)

  const toggleButtons = () => {
    setActive(!active)
    rotation.value = withTiming(active ? 0 : -45)

    if (!active) {
      opacity1.value = withTiming(1)
      translateX1.value = withTiming(0)
      opacity2.value = withTiming(1, { duration: 200 })
      translateX2.value = withTiming(0, { duration: 500 })
    } else {
      opacity1.value = withTiming(0)
      translateX1.value = withTiming(30)
      opacity2.value = withTiming(0, { duration: 200 })
      translateX2.value = withTiming(30, { duration: 500 })
    }
  }

  const animatedStyle1 = useAnimatedStyle(() => ({
    opacity: opacity1.value,
    transform: [{ translateX: translateX1.value }],
  }))

  const animatedStyle2 = useAnimatedStyle(() => ({
    opacity: opacity2.value,
    transform: [{ translateX: translateX2.value }],
  }))

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${rotation.value}deg`,
      },
    ],
  }))

  const [createVisible, setCreateVisible] = useState(false)
  const [joinVisible, setJoinVisible] = useState(false)

  return (
    <View className='flex-1 bg-white'>
      <Text className='mt-10 text-3xl pt-5 px-5' style={{
        fontFamily: 'PoppinsBold'
      }}>Farms</Text>

      <ScrollView className='mt-5'>
        <GetFarm/>
      </ScrollView>

      <CreateFarm visible={createVisible} setVisible={setCreateVisible}/>
      <JoinFarm visible={joinVisible} setVisible={setJoinVisible}/>

      <View className="absolute bottom-5 right-5 items-end flex gap-3">
        <Animated.View style={animatedStyle2}>
          <Pressable onPress={() => setCreateVisible(true)} className="border relative border-zinc-300 px-5 py-3 gap-2 rounded-full flex-row items-center justify-center overflow-hidden">
            <Image
              source={require('@/assets/images/create-farm.png')}
              style={{ height: 100, width: '130%', opacity: 0.7}}
              resizeMode="cover"
              className="absolute inset-0 rounded-xl"
            />

            <MapPlus color={'#ffffff'} />
            <Text
              className="text-xl"
              style={{
                fontFamily: 'PoppinsSemiBold',
                color: '#ffffff'
              }}
            >
              Create Farm
            </Text>
          </Pressable>
        </Animated.View>

        <Animated.View style={animatedStyle1}>
          <Pressable onPress={() => setJoinVisible(true)} className="border relative border-zinc-300 px-5 py-3 gap-2 rounded-full flex-row items-center justify-center overflow-hidden">
            <Image
              source={require('@/assets/images/join-farm.png')}
              style={{ height: 50, width: '130%', opacity: 0.7}}
              resizeMode="cover"
              className="absolute inset-0 rounded-xl"
            />

            <MapPlus color={'#ffffff'} />
            <Text
              className="text-xl"
              style={{
                fontFamily: 'PoppinsSemiBold',
                color: '#ffffff'
              }}
            >
              Join Farm
            </Text>
          </Pressable>
        </Animated.View>

        <Pressable
          onPress={toggleButtons}
          className="h-[50px] w-[50px] bg-primary rounded-full flex items-center justify-center"
        >
          <Animated.View style={animatedIconStyle}>
            <Plus size={20} color="#ffffff" />
          </Animated.View>
        </Pressable>
      </View>
    </View>
  )
}

export default Farm