import { Text, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import SplashScreen from '@/components/pages/SplashScreen';
import { useFonts } from 'expo-font';
import { useSelector, useDispatch } from 'react-redux';
import { setHasShownSplash } from '@/store';
import NetInfo from '@react-native-community/netinfo';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#155183', backgroundColor: '#ffffff' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
      }}
      text2Style={{
        fontSize: 14,
        color: '#000000',
      }}
    />
  ),
error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#155183', backgroundColor: '#ffffff' }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
      }}
      text2Style={{
        fontSize: 14,
        color: '#000000',
      }}
    />
  ),}

const Network = ({ children }: { children: React.ReactNode }) => {
  const [loaded] = useFonts({
    PoppinsBold: require('@/assets/fonts/Poppins-Bold.ttf'),
    PoppinsSemiBold: require('@/assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsMedium: require('@/assets/fonts/Poppins-Medium.ttf'),
    PoppinsRegular: require('@/assets/fonts/Poppins-Regular.ttf'),
    PoppinsLight: require('@/assets/fonts/Poppins-Light.ttf'),
    PoppinsExtraLight: require('@/assets/fonts/Poppins-ExtraLight.ttf'),
    PoppinsThin: require('@/assets/fonts/Poppins-Thin.ttf'),
    PoppinsExtraBold: require('@/assets/fonts/Poppins-ExtraBold.ttf'),
  });

  const dispatch = useDispatch();
  const hasShownSplash = useSelector((state: any) => state.global.hasShownSplash);
  const [isLoading, setIsLoading] = useState(!hasShownSplash);
  const [isConnected, setIsConnected] = useState(true);
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected = Boolean(state.isConnected) && state.isInternetReachable !== false;
      setIsConnected(connected);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loaded && !hasShownSplash) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        dispatch(setHasShownSplash(true));
      }, 5000);

      return () => clearTimeout(timer);
    } else if (hasShownSplash && loaded) {
      setIsLoading(false);
    }
  }, [loaded, hasShownSplash, dispatch]);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isConnected ? -100 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isConnected, slideAnim]);

                                                          const printUser = async () => {
                                                            try {
                                                              const storedUser = await AsyncStorage.getItem('user');
                                                              const token = await AsyncStorage.getItem('authToken')
                                                              if (storedUser !== null && token !== null) {
                                                                const parsedUser = JSON.parse(storedUser);
                                                                console.log('User:', parsedUser);
                                                                console.log('Token:', token);
                                                                
                                                              } else {
                                                                console.log('No user found in AsyncStorage.');
                                                              }
                                                            } catch (error) {
                                                              console.error('Error reading user from AsyncStorage:', error);
                                                            }
                                                          };

                                                          useEffect(() => {
                                                            printUser();
                                                          }, []);

  
  if (isLoading) {
    return <SplashScreen />;
  }
  
  return (
    <>
      {children}

      <Animated.View
        style={{
          transform: [{ translateY: slideAnim }],
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: '#dc2626',
          zIndex: 9999,
          height: 45,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Text
        className='text-white text-center absolute text-sm'
          style={{
            fontFamily: 'PoppinsRegular',
          }}
        >
          No Internet Connection
        </Text>
      </Animated.View>
      <Toast config={toastConfig}/>
    </>
  );
};

export default Network;
