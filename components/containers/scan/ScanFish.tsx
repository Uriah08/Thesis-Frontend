import { View, Text, Pressable, Button, TouchableOpacity } from 'react-native';
import { Camera, GalleryVerticalEnd } from 'lucide-react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';

const ScanFish = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraOpen, setIsCameraOpen] = useState(false); // NEW STATE

  if (!permission) return <View className='flex-1 bg-white'/>;

  if (!permission.granted) {
    return (
      <View className='flex-1 bg-white'>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <View className='border border-zinc-300 rounded-xl' style={{ padding: 15, margin: 18 }}>
      <Pressable onPress={() => setIsCameraOpen(true)}>
        <View className='flex-row items-center bg-primary p-3 rounded-xl gap-2 justify-center'>
          <Camera size={20} color={'#ffffff'} />
          <Text className='text-lg ml-2 text-white' style={{ fontFamily: 'PoppinsSemiBold' }}>Scan Fish</Text>
        </View>
      </Pressable>

      <Pressable>
        <View className='flex-row items-center bg-primary p-3 rounded-xl gap-2 justify-center mt-5'>
          <GalleryVerticalEnd size={20} color={'#ffffff'} />
          <Text className='text-lg ml-2 text-white' style={{ fontFamily: 'PoppinsSemiBold' }}>Gallery</Text>
        </View>
      </Pressable>

      {/* <View style={{
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#d4d4d8',
        borderRadius: 8,
        paddingVertical: 120,
        marginTop: 18
      }}>
        <Text className='text-center text-3xl' style={{
          fontFamily: 'PoppinsBold',
          color: '#d4d4d8'
        }}>Result</Text>

        {isCameraOpen && (
          <CameraView facing={facing} style={{ height: 300, marginTop: 10 }}>
            <View>
              <TouchableOpacity onPress={toggleCameraFacing}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        )}
      </View> */}
    </View>
  );
};

export default ScanFish;
