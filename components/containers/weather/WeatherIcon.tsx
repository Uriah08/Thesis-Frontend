import React from 'react';
import { Image, ImageSourcePropType, StyleProp, ImageStyle } from 'react-native';

type Props = {
  iconCode?: string;
  style?: StyleProp<ImageStyle>;
};

const getIconSource = (iconCode: string): ImageSourcePropType => {
  switch (iconCode) {
    case '01d':
    case '01n':
      return require('@/assets/images/weather-icons/1.png');
    case '02d':
    case '02n':
      return require('@/assets/images/weather-icons/2.png');
    case '03d':
    case '03n':
      return require('@/assets/images/weather-icons/3.png');
    case '04d':
    case '04n':
      return require('@/assets/images/weather-icons/4.png');
    case '09d':
    case '09n':
      return require('@/assets/images/weather-icons/5.png');
    case '10d':
    case '10n':
      return require('@/assets/images/weather-icons/6.png');
    default:
      return require('@/assets/images/weather-icons/7.png');
  }
};

const WeatherIcon = ({ iconCode, style }: Props) => {
  const source = getIconSource(iconCode ?? '');
  return <Image source={source} style={style} resizeMode="contain" />;
};

export default WeatherIcon;
