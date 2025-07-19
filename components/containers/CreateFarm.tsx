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
            <View className='w-full mt-5 flex items-center justify-center'
            style={{
              borderStyle: 'dashed',
              borderWidth: 2,
              borderColor: '#d4d4d8',
              borderRadius: 8,
              paddingVertical: 30
            }}>
              <ImagePlusIcon color={'#d4d4d8'}/>
              <Text style={{
                fontFamily: 'PoppinsBold',
                color: '#d4d4d8'
              }}>INSERT FARM IMAGE</Text>
            </View>
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
                >
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