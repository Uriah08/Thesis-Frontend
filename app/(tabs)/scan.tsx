import { View, Text, Pressable, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setScanTabPressed } from '@/store';
import { CameraView, CameraType, useCameraPermissions, FlashMode, CameraCapturedPicture } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { Flashlight, FlashlightOff, RotateCcw } from 'lucide-react-native';

const ScanPage = () => {
  const dispatch = useDispatch();
  const scanTabPressed = useSelector((state: any) => state.global.scanTabPressed);

  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off')
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [torch, setTorch] = useState(false)
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);

const handleSubmit = React.useCallback(async () => {
  if (!cameraRef.current || !isCameraReady) return;
  setTorch(false)
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.7,
      base64: true,
      skipProcessing: false,
    });
    setPhoto(photo);

    console.log('Captured photo:', photo.uri);
  } catch (error) {
    if(flash === 'on') {
      setTorch(true)
    }
    console.error('Failed to capture photo:', error);
  } finally {
    setTorch(flash === 'on' ? true : false)
  }
}, [isCameraReady, flash]);

  const handleCameraReady = () => {
  setIsCameraReady(true);
};

  useEffect(() => {
    if (scanTabPressed) {
      handleSubmit();
      dispatch(setScanTabPressed(false));
    }
  }, [scanTabPressed, dispatch, handleSubmit]);

  const toggleCameraFacing = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlash((prev) => (prev === 'off' ? 'on' : 'off'))
    setTorch((prev) => (!prev ? true : false))
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-6">
        <Text className="text-center text-lg font-semibold text-gray-700 mb-4">
          We need your permission to show the camera
        </Text>
        <Pressable
          onPress={requestPermission}
          className="bg-primary px-6 py-3 rounded-lg"
        >
          <Text className="text-white text-base font-medium">Grant Permission</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className='flex-1 bg-white'>
      <CameraView ref={cameraRef} facing={facing} style={{ flex: 1}} flash={flash} active enableTorch={torch} onCameraReady={handleCameraReady}/>
      {photo && (
      <Image
        source={{ uri: photo.uri }}
        style={{ width: '100%', height: 400, position: 'absolute' }}
        />
      )}
      <TouchableOpacity onPress={toggleCameraFacing} className='absolute bottom-10 left-10 z-10 h-[50px] w-[50px] rounded-full bg-white flex items-center justify-center'>
        <RotateCcw/>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleFlash} className='absolute bottom-10 right-10 z-10 h-[50px] w-[50px] rounded-full bg-white flex items-center justify-center'>
        {flash === 'off' ? <Flashlight/> : <FlashlightOff/>}
      </TouchableOpacity>
      <LinearGradient
        colors={['transparent', '#ffffff40', '#ffffff95',  'white']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: 150,
          zIndex: 1
         }}
      />
    </View>
  )
}

export default ScanPage