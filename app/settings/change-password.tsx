import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { ChevronLeft } from 'lucide-react-native'
import { router } from 'expo-router'
import { useChangePasswordMutation } from '@/store/api'
import Toast from 'react-native-toast-message'

const ChangePassword = () => {

  const [changePassword, {isLoading}] = useChangePasswordMutation()

  const [isFocused, setIsFocused] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!oldPassword.trim()) {
      newErrors.old = 'Old password is required.';
    } else if (oldPassword.length < 8) {
      newErrors.old = 'Password must be at least 8 characters.';
    }

    if (!newPassword.trim()) {
      newErrors.new = 'New password is required.';
    } else if (newPassword.length < 8) {
      newErrors.new = 'New password must be at least 8 characters.';
    }

    if (!confirmPassword.trim()) {
      newErrors.confirm = 'Confirm password is required.';
    } else if (confirmPassword !== newPassword) {
      newErrors.confirm = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return

    try {
      await changePassword({
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword
      }).unwrap();

      Toast.show({
        type: 'success',
        text1: 'Changed Password Successfully!',
      });

      router.push('/(tabs)/settings')

      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error: any) {
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
    }
  };
  
  return (
    <View className='flex-1 bg-white'>
      <ChevronLeft onPress={() => router.push('/settings')} style={{ marginTop: 50, marginLeft: 30 }} color="black" size={32} />
      <Text className='mt-10 mx-7 text-2xl' style={{
        fontFamily: 'PoppinsSemiBold',
      }}> Change your
      <Text className='text-primary'> password.</Text></Text>
      <View className='mx-7'>
        <Text className='mt-14 text-sm' style={{
          fontFamily: 'PoppinsMedium'
        }}>Old Password</Text>
        <TextInput
          className={`rounded-md mt-1 p-3 text-base text-black ${ errors.old ? 'border-[2px] border-error/50':
            isFocused === 'old' ? 'border-[2px] border-black' : 'border border-zinc-300'
          }`}
          onFocus={() => setIsFocused('old')}
          onBlur={() => setIsFocused('')}
          placeholder="Password"
          placeholderTextColor="#9ca3af"
          value={oldPassword}
          onChangeText={setOldPassword}
          secureTextEntry={true}
        />
        {errors.old && (
          <Text className="text-error mt-1 ml-1 text-sm">{errors.old}</Text>
        )}

        <Text className='mt-5 text-sm' style={{
          fontFamily: 'PoppinsMedium'
        }}>New Password</Text>
        <TextInput
          className={`rounded-md mt-1 p-3 text-base text-black ${ errors.new ? 'border-[2px] border-error/50':
            isFocused === 'new' ? 'border-[2px] border-black' : 'border border-zinc-300'
          }`}
          onFocus={() => setIsFocused('new')}
          onBlur={() => setIsFocused('')}
          placeholder="Password"
          placeholderTextColor="#9ca3af"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={true}
        />
        {errors.new && (
          <Text className="text-error mt-1 ml-1 text-sm">{errors.new}</Text>
        )}

        <Text className='mt-5 text-sm' style={{
          fontFamily: 'PoppinsMedium'
        }}>Confirm New Password</Text>
        <TextInput
          className={`rounded-md mt-1 p-3 text-base text-black ${ errors.confirm ? 'border-[2px] border-error/50':
            isFocused === 'confirm' ? 'border-[2px] border-black' : 'border border-zinc-300'
          }`}
          onFocus={() => setIsFocused('confirm')}
          onBlur={() => setIsFocused('')}
          placeholder="Password"
          placeholderTextColor="#9ca3af"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />
        {errors.confirm && (
          <Text className="text-error mt-1 ml-1 text-sm">{errors.confirm}</Text>
        )}

        <Pressable
          onPress={() => handleSubmit()}
          className='mt-14 w-full bg-primary py-3 rounded-lg'
        >
          {isLoading ? (
            <ActivityIndicator color={'#ffffff'}/>
          ) : (
            <Text 
              className='text-white text-center'
              style={{
                fontFamily: 'PoppinsRegular',
              }}
          >Change Password</Text>
          )}    
        </Pressable>
      </View>
    </View>
  )
}

export default ChangePassword