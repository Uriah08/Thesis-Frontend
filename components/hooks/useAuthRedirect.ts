import { useEffect, useState } from 'react';
import { router, usePathname } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from '@/utils/types';

const useAuthRedirect = () => {
  const [checking, setChecking] = useState(true);
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const publicPaths = ['/', '/login', '/register', '/complete-profile'];
    const checkUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user: User = JSON.parse(userData);
          setUser(user);

          if (user.is_complete && publicPaths.includes(pathname)) {
            router.replace('/home');
          } else if (!user.is_complete && pathname !== '/complete-profile') {
            router.replace('/complete-profile');
          }
        }
      } catch (error) {
        console.error('Failed to fetch user from AsyncStorage:', error);
      } finally {
        setChecking(false);
      }
    };

    checkUser();
  }, [pathname]);

  return { checking, user };
};

export default useAuthRedirect;
