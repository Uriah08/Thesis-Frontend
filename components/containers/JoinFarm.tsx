import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import Dialogs from './Dialog';
import { Dialog } from 'react-native-paper';
import { MapPlusIcon } from 'lucide-react-native';

type DialogsProps = {
  setVisible: (visible: boolean) => void;
  visible: boolean;
};

const JoinFarm = ({setVisible, visible}: DialogsProps) => {
  const [isFocused, setIsFocused] = useState('');
  const [ID, setID] = useState('')
  const [password, setPassword] = useState('')
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
        />
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
        />
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
              <Pressable
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
              }}>Join</Text>
              </Pressable>
            </View>
      </Dialog.Content>
    </Dialogs>
  )
}

export default JoinFarm