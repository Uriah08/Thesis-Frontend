import { View, Text, Pressable, Image, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Filter, MapPlus, Plus, Search } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import CreateFarm from '@/components/containers/dialogs/CreateFarm';
import JoinFarm from '@/components/containers/dialogs/JoinFarm';
import GetFarm from '@/components/containers/farm/GetFarm';
import { useGetFarmsQuery } from '@/store/api';
import useAuthRedirect from '@/components/hooks/useAuthRedirect';

const Farm = () => {
  const { user } = useAuthRedirect()

  const { data, isLoading } = useGetFarmsQuery();
  const farms = data ?? []
  const [active, setActive] = useState(false);
  const [filterActive, setFilterActive] = useState('newest')
  const [ownershipFilter, setOwnershipFilter] = useState<'all' | 'owned' | 'not_owned'>('all');
  const [search, setSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);

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

  const filteredFarms = farms
  .filter(farm => farm.name.toLowerCase().includes(search.toLowerCase()))
  .filter(farm => {
    if (ownershipFilter === 'owned') return farm.owner === Number(user?.id);
    if (ownershipFilter === 'not_owned') return farm.owner !== Number(user?.id);
    return true;
  })
  .sort((a, b) => {
    if (filterActive === 'az') return a.name.localeCompare(b.name);
    if (filterActive === 'za') return b.name.localeCompare(a.name);
    if (filterActive === 'newest') return new Date(b.create_at).getTime() - new Date(a.create_at).getTime();
    if (filterActive === 'latest') return new Date(a.create_at).getTime() - new Date(b.create_at).getTime();
    return 0;
  });

  return (
    <View className='flex-1 bg-white'>
      <View className='mt-10 pt-5 px-5 flex gap-5'>
        <Text className='text-3xl' style={{ fontFamily: 'PoppinsBold' }}>Farms</Text>
        <View className='flex-row gap-3 items-center w-full justify-between'>
          <View className='w-[85%] relative'>
            <TextInput
              className='rounded-full pl-12 text-base text-black border border-zinc-300'
              placeholder='Search'
              onChangeText={setSearch}
              value={search}
            />
            <Search
              style={{ position: 'absolute', top: 10, left: 12 }}
              color={'#d4d4d8'}
            />
          </View>
          <Pressable onPress={() => setShowFilter(prev => !prev)}>
            <Filter color={'#155183'} />
          </Pressable>
        </View>
      </View>

      {showFilter && (
  <View className="absolute right-5 top-44 z-50 bg-white border border-zinc-300 rounded-xl shadow-lg p-3 w-44">
    <Text className='text-zinc-800' style={{ fontFamily: 'PoppinsMedium' }}>Filter</Text>

    {/* Ownership filter */}
    <Pressable className={`w-full p-2 rounded-lg ${ownershipFilter === 'all' && 'bg-zinc-100'}`} onPress={() => setOwnershipFilter('all')}>
      <Text className="text-black text-base">All Farms</Text>
    </Pressable>
    <Pressable className={`w-full p-2 rounded-lg ${ownershipFilter === 'owned' && 'bg-zinc-100'}`} onPress={() => setOwnershipFilter('owned')}>
      <Text className="text-black text-base">Owned</Text>
    </Pressable>
    <Pressable className={`w-full p-2 rounded-lg ${ownershipFilter === 'not_owned' && 'bg-zinc-100'}`} onPress={() => setOwnershipFilter('not_owned')}>
      <Text className="text-black text-base">Not Owned</Text>
    </Pressable>

    <View className='bg-zinc-300 my-2' style={{ width: '100%', height: 1 }} />

    {/* Sort filters */}
    <Pressable className={`w-full p-2 rounded-lg ${filterActive === 'newest' && 'bg-zinc-100'}`} onPress={() => setFilterActive('newest')}>
      <Text className="text-black text-base">Newest</Text>
    </Pressable>
    <Pressable className={`w-full p-2 rounded-lg ${filterActive === 'latest' && 'bg-zinc-100'}`} onPress={() => setFilterActive('latest')}>
      <Text className="text-black text-base">Latest</Text>
    </Pressable>
    <Pressable className={`w-full p-2 rounded-lg ${filterActive === 'az' && 'bg-zinc-100'}`} onPress={() => setFilterActive('az')}>
      <Text className="text-black text-base">Sort A-Z</Text>
    </Pressable>
    <Pressable className={`w-full p-2 rounded-lg ${filterActive === 'za' && 'bg-zinc-100'}`} onPress={() => setFilterActive('za')}>
      <Text className="text-black text-base">Sort Z-A</Text>
    </Pressable>
  </View>
)}

      <ScrollView className='mt-5'>
        <GetFarm data={filteredFarms} isLoading={isLoading} />
      </ScrollView>

      <CreateFarm visible={createVisible} setVisible={setCreateVisible} />
      <JoinFarm visible={joinVisible} setVisible={setJoinVisible} />

      <View className="absolute bottom-5 right-5 items-end flex gap-3">
        <Animated.View style={animatedStyle2}>
          <Pressable onPress={() => setCreateVisible(true)} className="border relative border-zinc-300 px-5 py-3 gap-2 rounded-full flex-row items-center justify-center overflow-hidden">
            <Image
              source={require('@/assets/images/create-farm.png')}
              style={{ height: 100, width: '130%', opacity: 0.7 }}
              resizeMode="cover"
              className="absolute inset-0 rounded-xl"
            />
            <MapPlus color={'#ffffff'} />
            <Text className="text-xl" style={{ fontFamily: 'PoppinsSemiBold', color: '#ffffff' }}>
              Create Farm
            </Text>
          </Pressable>
        </Animated.View>

        <Animated.View style={animatedStyle1}>
          <Pressable onPress={() => setJoinVisible(true)} className="border relative border-zinc-300 px-5 py-3 gap-2 rounded-full flex-row items-center justify-center overflow-hidden">
            <Image
              source={require('@/assets/images/join-farm.png')}
              style={{ height: 50, width: '130%', opacity: 0.7 }}
              resizeMode="cover"
              className="absolute inset-0 rounded-xl"
            />
            <MapPlus color={'#ffffff'} />
            <Text className="text-xl" style={{ fontFamily: 'PoppinsSemiBold', color: '#ffffff' }}>
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

export default Farm;
