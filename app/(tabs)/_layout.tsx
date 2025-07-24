import { Tabs } from 'expo-router';
import React from 'react';
import {
  HomeIcon,
  FishSymbolIcon,
  BellIcon,
  SettingsIcon,
} from 'lucide-react-native';
import {
  Platform,
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import useAuthRedirect from '@/components/hooks/useAuthRedirect';

const CustomTabBarButton = (props: any) => {
  const { checking } = useAuthRedirect()
  
  const { children, onPress, ...rest } = props;
  if (Platform.OS === 'android') {
    return (
      <View style={{ flex: 1, borderRadius: 10 }}>
        <TouchableNativeFeedback
          onPress={onPress}
          background={TouchableNativeFeedback.Ripple('rgba(21, 81, 131, 0.2)', false)}
          useForeground={true}
          {...rest}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {children}
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }

  if (checking) return (
          <View className='flex h-full w-full items-center justify-center bg-white'>
            <ActivityIndicator size={50}/>
          </View>
        );

  return (
    <TouchableOpacity onPress={onPress} style={{ flex: 1 }} {...rest}>
      {children}
    </TouchableOpacity>
  );
};

const AppLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#155183',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
          backgroundColor: '#fff',
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="farm"
        options={{
          title: 'Farm',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <FishSymbolIcon color={color} size={size} />,
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: 'Notifications',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View style={{ position: 'relative' }}>
              <BellIcon color={color} size={size} />
              <View
                style={{
                  position: 'absolute',
                  top: -4,
                  right: -4,
                  backgroundColor: 'red',
                  borderRadius: 8,
                  minWidth: 16,
                  height: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 2,
                }}
              >
                <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                  3
                </Text>
              </View>
            </View>
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <SettingsIcon color={color} size={size} />,
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
    </Tabs>
  );
};

export default AppLayout;
