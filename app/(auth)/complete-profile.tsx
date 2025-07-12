import {
  View,
  Text,
  ActivityIndicator,
  BackHandler,
  Image,
  Pressable,
  TextInput,
  Platform
} from 'react-native';
import { useState, useCallback } from 'react';
import { router, useFocusEffect } from 'expo-router';
import { useCompleteProfileMutation } from '@/store/api';
import { Pencil } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs'
import { Checkbox } from 'expo-checkbox';
import Toast from 'react-native-toast-message';
import useAuthRedirect from '@/components/hooks/useAuthRedirect';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uploadImageToSupabase } from '@/utils/lib/supabase';

const CompleteProfile = () => {
  const { checking, user } = useAuthRedirect()

  const [isFocused, setIsFocused] = useState('')
  const [showPicker, setShowPicker] = useState(false);

  const [isChecked, setChecked] = useState(false);
  const [completeProfile, {isLoading}] = useCompleteProfileMutation()
  const [supabaseLoading, setSupabaseLoading] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address] = useState('Labac')
  const [date, setDate] = useState<Date | null>(null);
  const formattedDate = date ? new Date(date).toISOString().split('T')[0] : '';

  const [image, setImage] = useState<string | null>(null);


  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleComplete = async () => {
    if (!validate()) return;

    let imageURL = ''
    
    try {
      if (image) {
      const uploadedUrl = await uploadImageToSupabase(image, setSupabaseLoading);
      if (uploadedUrl) imageURL = uploadedUrl;
    }

      const response = await completeProfile({
        first_name: firstName,
        last_name: lastName,
        birthday: formattedDate,
        address,
        ...(imageURL && { profile_picture: imageURL }),
      }).unwrap();

      Toast.show({
        type: 'success',
        text1: 'User Updated Successfully!',
      });

      await AsyncStorage.setItem(
        'user',
        JSON.stringify({
          username: response.username,
          email: response.email || '', 
          id: response.id || '',
          first_name: response.first_name || '',
          last_name: response.last_name || '',
          birthday: response.birthday || '',
          address: response.address || '',
          is_complete: response.is_complete || false,
          profile_picture: response.profile_picture || '',
        })
      );

      router.replace('/(tabs)/home')
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
    } finally {
      setSupabaseLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true;
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );
      return () => backHandler.remove();
    }, [])
  );

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


  const handleChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    const nameRegex = /^[A-Za-z\s'-]+$/;

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    } else if (!nameRegex.test(firstName)) {
      newErrors.firstName = 'First name should not contain numbers or special characters.';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
    } else if (!nameRegex.test(lastName)) {
      newErrors.lastName = 'Last name should not contain numbers or special characters.';
    }

    if (!date) {
      newErrors.birthday = 'Birthday is required.';
    }

    if (!address.trim()) {
      newErrors.address = 'Address is required.';
    }

    if (!isChecked) {
      newErrors.agreement = 'You must agree to the terms.';
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

  if (checking) return (
      <View className='flex-1 items-center justify-center'>
        <ActivityIndicator size={50}/>
      </View>
    );

  return (
    <View className="bg-white flex-1">
      <Text className="mt-24 mx-7 text-3xl" style={{ fontFamily: 'PoppinsSemiBold' }}>
        Hello{' '}
        <Text className="text-primary">
          {user?.username
            ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
            : ''}
          !
        </Text>
      </Text>

      <Text className="mx-7" style={{ fontFamily: 'PoppinsSemiBold', fontSize: 18 }}>
        Finish your profile to proceed.
      </Text>

      <View className="mx-7 flex-1 items-center">
        <View className="border-[3px] border-primary mt-10 rounded-full p-1 relative">
          <Image
            source={
              image
                ? { uri: image }
                : require('@/assets/images/default-profile.png')
            }
            style={{ width: 80, height: 80, borderRadius: 999 }}
            resizeMode="cover"
          />
          <Pressable
            onPress={pickImage}
            className="absolute bg-zinc-200 justify-center items-center h-8 w-8 bottom-0 right-0 rounded-full"
          >
            <Pencil size={15} color={'#155183'} />
          </Pressable>
        </View>
        {errors.firstName && (
          <Text className="text-error mt-1 ml-1 text-sm">{errors.profilePicture}</Text>
        )}

        <TextInput
          className={`rounded-md p-3 mt-8 w-full text-base text-black ${
            isFocused === 'fName' ? 'border-[2px] border-black' : 'border border-zinc-300'
          }`}
          onFocus={() => setIsFocused('fName')}
          onBlur={() => setIsFocused('')}
          placeholder="First Name"
          placeholderTextColor="#9ca3af"
          value={firstName}
          onChangeText={setFirstName}
        />
        {errors.firstName && (
          <Text className="text-error mt-1 ml-1 text-sm w-full">{errors.firstName}</Text>
        )}
        <TextInput
          className={`rounded-md p-3 mt-5 w-full text-base text-black ${
            isFocused === 'lName' ? 'border-[2px] border-black' : 'border border-zinc-300'
          }`}
          onFocus={() => setIsFocused('lName')}
          onBlur={() => setIsFocused('')}
          placeholder="Last Name"
          placeholderTextColor="#9ca3af"
          value={lastName}
          onChangeText={setLastName}
        />
        {errors.lastName && (
          <Text className="text-error mt-1 ml-1 text-sm w-full">{errors.lastName}</Text>
        )}
        <Pressable
          onPress={() => setShowPicker(true)}
          className={`rounded-md p-3 mt-5 w-full text-base ${
            isFocused === 'birthday'
              ? 'border-[2px] border-black'
              : 'border border-zinc-300'
          } bg-white`}
          onFocus={() => setIsFocused('birthday')}
          onBlur={() => setIsFocused('')}
        >
          <Text className={`${date ? 'text-black' : 'text-zinc-400'}`}>
            {date ? dayjs(date).format('YYYY-MM-DD') : 'Select Birthday'}
          </Text>
        </Pressable>

        {showPicker && (
          <DateTimePicker
            value={date || new Date(2000, 0, 1)}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            maximumDate={new Date()}
            onChange={handleChange}
          />
        )}
        {errors.birthday && (
          <Text className="text-error mt-1 ml-1 text-sm w-full">{errors.birthday}</Text>
        )}
        <TextInput
          editable={false}
          selectTextOnFocus={false}
          className={`rounded-md p-3 mt-5 w-full text-base text-black ${
            isFocused === 'bgry' ? 'border-[2px] border-black' : 'border border-zinc-300'
          }`}
          onFocus={() => setIsFocused('brgy')}
          onBlur={() => setIsFocused('')}
          placeholder="Barangay"
          placeholderTextColor="#9ca3af"
          value={address}
        />
        {errors.address && (
          <Text className="text-error mt-1 ml-1 text-sm w-full">{errors.address}</Text>
        )}
        <View className="flex-row items-center space-x-2 mt-10">
        <Checkbox value={isChecked} onValueChange={setChecked} color={isChecked ? '#155183' : undefined} style={{
          borderColor: '#155183'
        }}/>
        <Text className="text-sm text-black">
          {'  '}I agree to the{' '}
          <Text className="text-primary underline">Terms of Service</Text>
        </Text>
      </View>
      <Pressable
        onPress={() => handleComplete()}
        className={`mt-3 w-full py-3 rounded-lg ${
          isChecked ? 'bg-primary' : 'bg-gray-400'
        }`}
        disabled={!isChecked || isLoading || supabaseLoading}
      >
        {isLoading || supabaseLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text
            className="text-white text-center"
            style={{
              fontFamily: 'PoppinsRegular',
            }}
          >
            Getting Started
          </Text>
        )}
      </Pressable>
      </View>
    </View>
  );
};

export default CompleteProfile;
