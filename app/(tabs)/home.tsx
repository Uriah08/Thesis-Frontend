import { BackHandler, View, Text, ActivityIndicator, ScrollView } from 'react-native'
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useGetWeatherForecastQuery } from '@/store/api';
import WeatherIcon from '@/components/containers/weather/WeatherIcon';
import { MapPinCheckInsideIcon } from 'lucide-react-native';
import WeatherDashboardBoxes from '@/components/containers/weather/WeatherDashboardBoxes';
import WeatherForecast from '@/components/containers/weather/WeatherForecast';
import WeatherAlert from '@/components/containers/weather/WeatherAlert';

const Home = () => {
  const { data, isLoading } = useGetWeatherForecastQuery();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        backHandler.remove();
      };
    }, [])
  );

  if (isLoading) return (
    <View className='flex h-full w-full items-center justify-center bg-white'>
      <ActivityIndicator size={50}/>
    </View>
  );
  
  return (
    <View className='flex-1 bg-white'>
          <View className='flex-row justify-between items-center mt-14 p-5'>
          <Text className='text-5xl' style={{
          fontFamily: 'PoppinsSemiBold'
        }}>To<Text className='text-primary'>You</Text></Text>
        <View className='flex-col flex justify-center'>
          <WeatherIcon iconCode={data?.first_item.icon} style={{ width: 25, height: 25}}/>
          <Text style={{ fontFamily: 'PoppinsMedium' }} className='text-base text-primary'>{Math.round(data?.first_item.temperature ?? 0)}<Text className='text-xs' style={{ fontFamily: 'PoppinsRegular' }}>
          °C</Text></Text>
        </View>
        </View>
        <WeatherAlert pop={data?.first_item.pop} wind_speed={data?.first_item.wind_speed} clouds={data?.first_item.clouds}/>
        <WeatherDashboardBoxes pop={data?.first_item.pop} wind_speed={data?.first_item.wind_speed} clouds={data?.first_item.clouds}/>
        <View className='flex-row items-center justify-end px-5 mt-5'>
            <MapPinCheckInsideIcon size={15} color={'#6b7280'}/>
            <Text className='text-sm text-gray-500 ml-1' style={{ fontFamily: 'PoppinsRegular'}}>Lives in {data?.city.name}, {data?.city.country}</Text>
          </View>
        <WeatherForecast future_forecast={data?.future_forecast ?? []}/>
    </View>
  );
}

export default Home