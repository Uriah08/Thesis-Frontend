import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Dialogs from './Dialog';
import { Dialog } from 'react-native-paper';
import { MapPlusIcon } from 'lucide-react-native';
import Toast from 'react-native-toast-message';
import { useJoinFarmMutation } from '@/store/api';

type DialogsProps = {
  setVisible: (visible: boolean) => void;
  visible: boolean;
};

const JoinFarm = ({setVisible, visible}: DialogsProps) => {
  const [joinFarm, { isLoading }] = useJoinFarmMutation()
  const [isFocused, setIsFocused] = useState('');
  const [ID, setID] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!ID.trim()) {
      newErrors.ID = 'ID is required.';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if(!validate()) return
    try {
      const response = await joinFarm({
        farm_id: Number(ID),
        password
      }).unwrap()
      Toast.show({
          type: 'success',
          text1: response.detail,
        });
      setVisible(false)
      setID('')
      setPassword('')
    } catch (error: any) {
      console.log(error?.data?.detail);
      
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
    }
  }
  
  return (
    <Dialogs onVisible={setVisible} visible={visible} title='Join Farm'>
      <Dialog.Content>
        <TextInput
          className={`rounded-md p-3 text-base text-black ${ 
            isFocused === 'name' ? 'border-[2px] border-black' : 'border border-zinc-300'
          }`}
          onFocus={() => setIsFocused('name')}
          onBlur={() => setIsFocused('')}
          placeholder="Farm ID"
          placeholderTextColor="#9ca3af"
          value={ID}
          onChangeText={setID}
          keyboardType="numeric"
          inputMode="numeric"
        />
        {errors.ID && (
          <Text className="text-error mt-1 ml-1 text-sm">{errors.ID}</Text>
        )}
        <TextInput
          className={`rounded-md p-3 mt-5 pr-10 text-base text-black ${
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
          secureTextEntry
        />
        {errors.password && (
          <Text className="text-error mt-1 ml-1 text-sm">{errors.password}</Text>
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
              disabled={isLoading}
              >
              {isLoading ? (
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
                  Join
                </Text>
            </Pressable>
            </View>
      </Dialog.Content>
    </Dialogs>
  )
}

export default JoinFarm