import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import Dialogs from './Dialog'
import { Dialog } from 'react-native-paper';
import { Eye, EyeClosed, ImagePlusIcon, MapPlusIcon } from 'lucide-react-native';

type DialogsProps = {
  setVisible: (visible: boolean) => void;
  visible: boolean;
};

const CreateFarm = ({setVisible, visible}: DialogsProps) => {
    const [isFocused, setIsFocused] = useState('');
      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
      const [name, setName] = useState('')
      const [description, setDescription] = useState('')
      // const [image, setImage] = useState<string | null>(null);
      const [password, setPassword] = useState('')
      const [confirmPassword, setConfirmPassword] = useState('')

      const handleSubmit = () => {
        console.log(name, description, password, confirmPassword);
        
      }
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
            <View className='w-full mt-5 flex items-center justify-center py-10'
            style={{
              borderStyle: 'dashed',
              borderWidth: 2,
              borderColor: '#d4d4d8',
              borderRadius: 8,
            }}>
              <ImagePlusIcon color={'#d4d4d8'}/>
              <Text className='text-zinc-300' style={{
                fontFamily: 'PoppinsBold'
              }}>INSERT FARM IMAGE</Text>
            </View>
            <Text className='text-sm mt-3' style={{
              fontFamily: 'PoppinsMedium'
            }}>Private Section</Text>
            <Text className='text-xs text-zinc-400 mb-1' style={{
              fontFamily: 'PoppinsMedium'
            }}>It is to avoid unauthorized users on your farm.</Text>
            <View className='h-[1px] w-full bg-zinc-300 mb-3'/>
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
                className="absolute right-3 top-[14px]"
              >
                {showPassword ? <Eye size={20} color="#9ca3af" /> : <EyeClosed size={20} color="#9ca3af" />}
              </Pressable>
            </View>

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
                className="absolute right-3 top-[14px]"
              >
                {showConfirmPassword ? (
                  <Eye size={20} color="#9ca3af" />
                ) : (
                  <EyeClosed size={20} color="#9ca3af" />
                )}
              </Pressable>
            </View>
            <View className='flex-row mt-5 gap-5 w-full justify-end'>
              <Pressable onPress={() => setVisible(false)} className='border border-zinc-300 p-2 rounded-lg'>
                <Text className='text-zinc-500' style={{
                fontFamily: 'PoppinsRegular'
              }}>Cancel</Text>
              </Pressable>
              <Pressable onPress={() => handleSubmit()} className='bg-primary py-2 px-3 rounded-lg flex-row items-center gap-2'>
                <MapPlusIcon color={'#ffffff'} size={15}/>
                <Text className='text-white' style={{
                fontFamily: 'PoppinsRegular'
              }}>Create</Text>
              </Pressable>
            </View>
          </Dialog.Content>
      </Dialogs>
  )
}

export default CreateFarm