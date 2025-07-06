import { Tabs } from 'expo-router';
import React from 'react';
import {
  HomeIcon,
  FishSymbolIcon,
  BellIcon,
  UserIcon,
} from 'lucide-react-native';
import {
  Platform,
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

const CustomTabBarButton = (props: any) => {
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
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <UserIcon color={color} size={size} />,
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
    </Tabs>
  );
};

export default AppLayout;
