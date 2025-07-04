import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { ChevronLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { useLoginMutation } from '@/store/api';

const Login = () => {
  const [isFocused, setIsFocused] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, isError }] = useLoginMutation();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
    const validate = () => {
      const newErrors: { [key: string]: string } = {};
  
      if (!username.trim()) newErrors.username = 'Username is required.';
  
      if (!password) {
        newErrors.password = 'Password is required.';
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters.';
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
    if (validate()) {
      try {
        const response = await login({ username, password }).unwrap();
        console.log('Login successful:', response);
      } catch (error) {
        console.log(error);
      }
    }}

  return (
    <View className='bg-white flex-1'>
      <ChevronLeft onPress={() => router.push('/')} style={{ marginTop: 50, marginLeft: 30 }} color="black" size={32} />
        <Text className='mt-10 mx-7 text-3xl' style={{
          fontFamily: 'PoppinsSemiBold',
        }}>
        <Text className='text-primary'>Welcome back!</Text> Glad to see you, Again!</Text>
        <View className='mx-7'>
          <TextInput
            className={`rounded-md p-3 mt-20 text-base text-black ${ errors.username ? 'border-[2px] border-error/50':
              isFocused === 'username' ? 'border-[2px] border-black' : 'border border-zinc-300'
            }`}
            onFocus={() => setIsFocused('username')}
            onBlur={() => setIsFocused('')}
            placeholder="Username"
            placeholderTextColor="#9ca3af"
            value={username}
            onChangeText={setUsername}
          />
          {errors.username && (
            <Text className="text-error mt-1 ml-1 text-sm">{errors.username}</Text>
          )}
        <TextInput
          className={`rounded-md p-3 mt-5 text-base text-black ${ errors.password ? 'border-[2px] border-error/50':
            isFocused === 'password' ? 'border-[2px] border-black' : 'border border-zinc-300'
          }`}
          onFocus={() => setIsFocused('password')}
          onBlur={() => setIsFocused('')}
          placeholder="Password"
          textContentType='password'
          secureTextEntry={true}
          placeholderTextColor="#9ca3af"
          value={password}
            onChangeText={setPassword}
        />
        {errors.password && (
          <Text className="text-error mt-1 ml-1 text-sm">{errors.password}</Text>
        )}
        <Pressable
        className='mt-14 w-full bg-primary py-3 rounded-lg'
        onPress={() => handleRegister()}
        >
          <Text 
            className='text-white text-center'
            style={{
              fontFamily: 'PoppinsRegular',
            }}
          >Login</Text>
        </Pressable>
        <Text 
        onPress={() => router.push('/(auth)/register')} 
        className='text-center mt-2'>Already have an account? <Text className='text-primary underline'>Sign Up</Text></Text>
        </View>
    </View>
  )
}

export default Login