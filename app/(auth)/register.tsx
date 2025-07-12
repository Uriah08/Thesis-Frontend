import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { ChevronLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { useRegisterMutation } from '@/store/api';
import Toast from 'react-native-toast-message';
import useAuthRedirect from '@/components/hooks/useAuthRedirect';

const Register = () => {
  const { checking } = useAuthRedirect()
  const [isFocused, setIsFocused] = useState('');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [register, { isLoading }] = useRegisterMutation();
  const [isValidatingEmail, setIsValidatingEmail] = useState(false);

  const handleRegister = async () => {
    if (await validate()) {
        register({ 
          username: username.trim().toLowerCase(), 
          email: email.trim().toLowerCase(), 
          password, 
          confirm_password: confirmPassword 
        }).unwrap()
          .then((response) => {
            Toast.show({
              type: 'success',
              text1: 'User Registered Successfully!',
            });
            router.push('/(auth)/login')
                        setUsername('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
          })
          .catch((error) => {
            if (error?.data) {
          const serverErrors: { [key: string]: string } = {};
          for (const key in error.data) {
            serverErrors[key] = error.data[key][0];
          }
          setErrors(prev => ({ ...prev, ...serverErrors }));
        } else {
          console.log('Unexpected error:', error);
        }
          });
    }
  }

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = async () => {
    setIsValidatingEmail(true);
    const emailValidator = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=a270cfe23edc4084a9665add430b88c9&email=${email}`)
    const validatedEmail = await emailValidator.json();
    setIsValidatingEmail(false);
    const newErrors: { [key: string]: string } = {};

    if (!username.trim()) newErrors.username = 'Username is required.';
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (validatedEmail.deliverability !== 'DELIVERABLE') {
      newErrors.email = 'Email is not deliverable.';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Enter a valid email.';
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (checking) return (
      <View className='flex-1 items-center justify-center'>
        <ActivityIndicator size={50}/>
      </View>
    );

  return (
    <View className='bg-white flex-1'>
      <ChevronLeft onPress={() => router.push('/')} style={{ marginTop: 50, marginLeft: 30 }} color="black" size={32} />
        <Text className='mt-10 mx-7 text-3xl' style={{
          fontFamily: 'PoppinsSemiBold',
        }}><Text className='text-primary'>Hello!</Text> Register to get started.</Text>
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
          className={`rounded-md p-3 mt-5 text-base text-black ${ errors.email ? 'border-[2px] border-error/50':
            isFocused === 'email' ? 'border-[2px] border-black' : 'border border-zinc-300'
          }`}
          onFocus={() => setIsFocused('email')}
          onBlur={() => setIsFocused('')}
          placeholder="Email"
          textContentType='emailAddress'
          placeholderTextColor="#9ca3af"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && (
          <Text className="text-error mt-1 ml-1 text-sm">{errors.email.charAt(0).toUpperCase() + errors.email.slice(1)}</Text>
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
        <TextInput
          className={`rounded-md p-3 mt-5 text-base text-black ${ errors.confirmPassword ? 'border-[2px] border-error/50':
            isFocused === 'cpassword' ? 'border-[2px] border-black' : 'border border-zinc-300'
          }`}
          onFocus={() => setIsFocused('cpassword')}
          onBlur={() => setIsFocused('')}
          placeholder="Confirm Password"
          textContentType='password'
          secureTextEntry={true}
          placeholderTextColor="#9ca3af"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {errors.confirmPassword && (
          <Text className="text-error mt-1 ml-1 text-sm">{errors.confirmPassword}</Text>
        )}
        <Pressable
        className='mt-14 w-full bg-primary py-3 rounded-lg'
        onPress={() => handleRegister()}
        disabled={isLoading || isValidatingEmail}
        >
          {isLoading || isValidatingEmail ? (
              <ActivityIndicator className='text-white'/>
          ) : (
            <Text 
            className='text-white text-center'
            style={{
              fontFamily: 'PoppinsRegular',
            }}
          >Register</Text>
          )}
        </Pressable>
        <Text 
        onPress={() => router.push('/(auth)/login')} 
        className='text-center mt-2'>Don&apos;t have an account? <Text className='text-primary underline'>Sign in</Text></Text>
        </View>
    </View>
  )
}

export default Register