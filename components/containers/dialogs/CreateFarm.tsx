import { View, Text, TextInput, Pressable, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Dialogs from './Dialog'
import { Dialog } from 'react-native-paper';
import { Eye, EyeClosed, ImagePlusIcon, MapPlusIcon } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useCreateFarmMutation } from '@/store/api';
import { uploadImageToSupabase } from '@/utils/lib/supabase';
import Toast from 'react-native-toast-message';

type DialogsProps = {
  setVisible: (visible: boolean) => void;
  visible: boolean;
};

const CreateFarm = ({setVisible, visible}: DialogsProps) => {
    const [isFocused, setIsFocused] = useState('');
    const [createFarm, { isLoading }] = useCreateFarmMutation()

      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
      const [name, setName] = useState('')
      const [description, setDescription] = useState('')
      const [password, setPassword] = useState('')
      const [confirmPassword, setConfirmPassword] = useState('')

      const [image, setImage] = useState<string | null>(null);
      const [supabaseLoading, setSupabaseLoading] = useState(false)

      const [errors, setErrors] = useState<{ [key: string]: string }>({});

      const pickImage = async () => {
          const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (!permission.granted) {
            alert('Permission is required to access media library');
            return;
          }
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
          });
      
          if (!result.canceled) {
            setImage(result.assets[0].uri);
          }
        };

      const handleSubmit = async () => {
        if (!validate()) return;
        let imageURL = ''
        try {
          if (image) {
            const uploadedUrl = await uploadImageToSupabase(image, 'farm', setSupabaseLoading);
            if (uploadedUrl) imageURL = uploadedUrl;
          } 

          await createFarm({
            name,
            description,
            password,
            ...(imageURL && { image_url: imageURL })
          }).unwrap()

          setName('')
          setDescription('')
          setImage('')
          setPassword('')
          setConfirmPassword('')
          setVisible(false)

        }catch (error: any) {
          console.log(error);
      
          if (error?.data?.detail) {
            Toast.show({
              type: 'error',
              text1: error.data.detail,
            });
          }
          
          const serverErrors: { [key: string]: string } = {};
          if (error?.data) {
            for (const key in error.data) {
              serverErrors[key] = error.data[key][0];
            }
            setErrors((prev) => ({ ...prev, ...serverErrors }));
          } else {
            console.log('Unexpected error:', error);
          }  
        }finally {
          setSupabaseLoading(false);
        }
      }

      const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (!name.trim()) {
          newErrors.name = 'First name is required.';
        }

        if (!password) {
          newErrors.password = 'Password is required.';
        } else if (password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters.';
        }

        if (!confirmPassword) {
          newErrors.confirmPassword = 'Confirm your password.';
        } else if (confirmPassword !== password) {
          newErrors.confirmPassword = 'Passwords do not match.';
        }

        if (image) {
          const allowedExtensions = ['jpg', 'jpeg', 'png'];
          const extension = image.split('.').pop()?.toLowerCase();
          if (!extension || !allowedExtensions.includes(extension)) {
            newErrors.profilePicture = 'Only JPEG or PNG images are allowed.';
          }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

  return (
    <Dialogs onVisible={setVisible} visible={visible} title='Create Farm'>
        <Dialog.Content>
            <TextInput
              className={`rounded-md p-3 text-base text-black ${ 
                isFocused === 'name' ? 'border-[2px] border-black' : 'border border-zinc-300'
              }`}
              onFocus={() => setIsFocused('name')}
              onBlur={() => setIsFocused('')}
              placeholder="Farm Name"
              placeholderTextColor="#9ca3af"
              value={name}
              onChangeText={setName}
            />
            {errors.name && (
              <Text className="text-error mt-1 ml-1 text-sm">{errors.name}</Text>
            )}
            <TextInput
              className={`rounded-md mt-5 p-3 text-base text-black ${ 
                isFocused === 'description' ? 'border-[2px] border-black' : 'border border-zinc-300'
              }`}
              onFocus={() => setIsFocused('description')}
              onBlur={() => setIsFocused('')}
              placeholder="Decription"
              placeholderTextColor="#9ca3af"
              value={description}
              onChangeText={setDescription}
            />
            <Pressable onPress={pickImage}>
            <View className='w-full mt-5 flex items-center justify-center'
            style={{
              borderStyle: 'dashed',
              borderWidth: 2,
              borderColor: '#d4d4d8',
              borderRadius: 8,
            }}>
              {image ? (
                <Image 
                source={{ uri: image}}
                style={{ width: '100%', height: 100 }}
                resizeMode="cover"/>
              ) : (
                <>
                <ImagePlusIcon color={'#d4d4d8'} style={{ marginTop: 30}}/>
                <Text style={{
                  fontFamily: 'PoppinsBold',
                  color: '#d4d4d8',
                  marginBottom: 30
                }}>INSERT FARM COVER IMAGE</Text>
                </>
              )}
            </View>
            </Pressable>
            {errors.image && (
              <Text className="text-error mt-1 ml-1 text-sm">{errors.image}</Text>
            )}
            <Text className='text-sm mt-3' style={{
              fontFamily: 'PoppinsSemiBold'
            }}>Private Section</Text>
            <Text className='text-xs text-zinc-400 mb-1' style={{
              fontFamily: 'PoppinsMedium',
              fontSize: 10,
              marginBottom: 2
            }}>It is to avoid unauthorized users on your farm.</Text>
            <View style={{
              height: 1,
              width: '100%',
              backgroundColor: '#d4d4d8',
              marginBottom: 12
            }}/>
            <View className="relative">
              <TextInput
                secureTextEntry={!showPassword}
                className={`rounded-md p-3 pr-10 text-base text-black ${
                  isFocused === 'password'
                    ? 'border-[2px] border-black'
                    : 'border border-zinc-300'
                }`}
                onFocus={() => setIsFocused('password')}
                onBlur={() => setIsFocused('')}
                placeholder="Password"
                placeholderTextColor="#9ca3af"
                value={password}
                onChangeText={setPassword}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 14,
                }}
              >
                {showPassword ? <Eye size={20} color="#9ca3af" /> : <EyeClosed size={20} color="#9ca3af" />}
              </Pressable>
            </View>
            {errors.password && (
              <Text className="text-error mt-1 ml-1 text-sm">{errors.password}</Text>
            )}

            <View className="relative mt-5">
              <TextInput
                secureTextEntry={!showConfirmPassword}
                className={`rounded-md p-3 pr-10 text-base text-black ${
                  isFocused === 'confirmPassword'
                    ? 'border-[2px] border-black'
                    : 'border border-zinc-300'
                }`}
                onFocus={() => setIsFocused('confirmPassword')}
                onBlur={() => setIsFocused('')}
                placeholder="Confirm Password"
                placeholderTextColor="#9ca3af"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <Pressable
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 14,
                }}
              >
                {showConfirmPassword ? (
                  <Eye size={20} color="#9ca3af" />
                ) : (
                  <EyeClosed size={20} color="#9ca3af" />
                )}
              </Pressable>
            </View>
            {errors.confirmPassword && (
              <Text className="text-error mt-1 ml-1 text-sm">{errors.confirmPassword}</Text>
            )}
            <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 10,
            }}
            >
              <Pressable onPress={() => setVisible(false)} className='border border-zinc-300 p-2 rounded-lg'
                style={{
                  borderWidth: 1,
                  borderColor: '#d4d4d8',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 8,
                }}>
                <Text className='text-zinc-500' style={{
                fontFamily: 'PoppinsRegular'
              }}>Cancel</Text>
              </Pressable>
              <Pressable onPress={() => handleSubmit()}
                style={{
                  backgroundColor: '#155183',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 8,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}
                disabled={isLoading || supabaseLoading}
                >
                {isLoading || supabaseLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <MapPlusIcon color={'#ffffff'} size={15}/>
                )}
                <Text
                    className="text-white"
                    style={{
                      fontFamily: 'PoppinsRegular',
                    }}
                  >
                    Create
                  </Text>
              </Pressable>
            </View>
          </Dialog.Content>
      </Dialogs>
  )
}

export default CreateFarm