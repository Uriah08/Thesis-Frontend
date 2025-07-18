import { View, Text, Image, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import useAuthRedirect from '@/components/hooks/useAuthRedirect'
import { CircleUserIcon, ChevronRight, RotateCcwKey, CircleQuestionMark, HelpCircleIcon, FileTextIcon, InfoIcon, LogOutIcon } from 'lucide-react-native'
import { router } from 'expo-router'
import { useLogoutMutation } from '@/store/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const settingsMenu = [
    {
        icon: CircleUserIcon,
        label: 'User Profile',
        route: '/settings/profile'
    },
    {
        icon: RotateCcwKey,
        label: 'Change Password',
        route: '/settings/change-password'
    },
    {
        icon: CircleQuestionMark,
        label: 'FAQ',
        route: '/settings/FAQ'
    },
    { 
        icon: HelpCircleIcon, 
        label: 'Help Center', 
        route: '/settings/help-center' 
    },
    { 
        icon: FileTextIcon, 
        label: 'Terms of Service', 
        route: '/settings/terms' 
    },
    {
        icon: InfoIcon,
        label: 'About',
        route: '/settings/about'
    },
]

const Settings = () => {
    
    const { user } = useAuthRedirect()

    const [logout, {isLoading}] = useLogoutMutation()

    const handleLogout = async () => {
      try {
        await logout().unwrap()
        
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('authToken');
    
        router.replace('/login');
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

  return (
    <View className='flex-1 bg-[#fff]'>
      <Text className='mt-10 text-3xl p-5' style={{
        fontFamily: 'PoppinsBold'
      }}>Settings</Text>
      <ScrollView>
        <View style={{
            marginHorizontal: 20
        }}>
            <View className='flex flex-row gap-3' style={{
        marginVertical: 25
      }}>
        <Image
            source={
            user?.profile_picture
                ? { uri: user?.profile_picture }
                : require('@/assets/images/default-profile.png')
            }
            style={{ width: 50, height: 50, borderRadius: 999 }}
            resizeMode="cover"
        />
        <View>
            <Text className='text-lg text-zinc-600'
            style={{
                fontFamily: 'PoppinsMedium'
            }}>
                {user?.username
                ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
                : ''}
            </Text>
            <Text className='text-sm text-zinc-400'
            style={{
                fontFamily: 'PoppinsRegular'
            }}
            >{user?.email}</Text>
        </View>
      </View>
      {settingsMenu.map((item, i) => (
        <React.Fragment key={i}>
            {i === 0 && (
            <Text
                className="text-zinc-500 text-sm"
                style={{
                marginVertical: 10,
                fontFamily: 'PoppinsMedium',
                }}
            >
                Account Settings
            </Text>
            )}
            {i === 3 && (
            <Text
                className="text-zinc-500 text-sm mt-10"
                style={{
                marginVertical: 10,
                fontFamily: 'PoppinsMedium',
                }}
            >
                Legal & About
            </Text>
            )}
            <Pressable
            onPress={() => router.push(item.route as any)}
            className="flex flex-row items-center"
            style={{
                justifyContent: 'space-between',
                borderTopWidth: 1,
                borderBottomWidth: (item.label === 'FAQ' || item.label === 'About') ? 1 : 0,
                borderColor: '#e8e8e8',
                paddingVertical: 20,
                paddingLeft: 10,
            }}
            >
            <View className="flex flex-row items-center gap-5">
                <item.icon size={20} color={'#a1a1aa'} />
                <Text
                className="text-lg"
                style={{
                    fontFamily: 'PoppinsMedium',
                }}
                >
                {item.label}
                </Text>
            </View>
            <ChevronRight size={18} />
            </Pressable>
        </React.Fragment>
        ))}

        <Text
            className="text-zinc-500 text-sm mt-10"
            style={{
            marginVertical: 10,
            fontFamily: 'PoppinsMedium',
            }}
        >
            Other
        </Text>

        <Pressable
            disabled={isLoading}
            onPress={() => handleLogout()}
            className="flex flex-row items-center"
            style={{
                justifyContent: 'space-between',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: '#e8e8e8',
                paddingVertical: 20,
                paddingLeft: 10,
            }}
            >
            <View className="flex flex-row items-center gap-5">
                {isLoading ? (
                    <ActivityIndicator color={'#155183'}/>
                ) : (
                    <LogOutIcon size={20} color={'#a1a1aa'} />
                )}
                <Text
                className="text-lg"
                style={{
                    fontFamily: 'PoppinsMedium'
                }}
                >
                Logout
                </Text>
            </View>
            </Pressable>
        </View>
        </ScrollView>
    </View>
  )
}

export default Settings