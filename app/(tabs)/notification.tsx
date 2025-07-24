import { View, Text, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import BottomDrawer, { BottomDrawerRef } from '@/components/containers/BottomDrawer';

const Notification = () => {
  const drawerRef = useRef<BottomDrawerRef>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      drawerRef.current?.close();
    } else {
      drawerRef.current?.open();
    }
  };
  return (
    <View className='flex-1 bg-white'>
      <Text className='mt-10 text-3xl p-5' style={{
              fontFamily: 'PoppinsBold'
            }}>Notifications</Text>
            <Pressable onPress={toggleDrawer}>
        <Text>{isDrawerOpen ? 'Close Bottom Drawer' : 'Open Bottom Drawer'}</Text>
      </Pressable>

      <BottomDrawer
        ref={drawerRef}
        onChange={(open) => setIsDrawerOpen(open)}
      >
        <Text>Hello WOrld</Text>
      </BottomDrawer>
    </View>
  )
}

export default Notification