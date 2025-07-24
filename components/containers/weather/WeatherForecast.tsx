import { View, Text, ScrollView, Pressable } from 'react-native';
import React, { useRef, useState } from 'react';
import WeatherIcon from './WeatherIcon';
import BottomDrawer, { BottomDrawerRef } from '@/components/containers/BottomDrawer';
import { ForecastItem } from '@/utils/types';

type FutureForecast = {
  future_forecast: ForecastItem[];
  selectedItem?: ForecastItem | null;
};

const WeatherForecast = ({ future_forecast }: FutureForecast) => {
  const drawerRef = useRef<BottomDrawerRef>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ForecastItem | null>(null);

  const handlePress = (item: ForecastItem) => {
    setSelectedItem(item);
    if (isDrawerOpen) {
      drawerRef.current?.close();
    } else {
      drawerRef.current?.open();
    }
  };

  const formatToPHT = (utcDateString: string) => {
    const date = new Date(utcDateString);
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      hour12: true,
      timeZone: 'Asia/Manila',
    };
    return new Intl.DateTimeFormat('en-PH', options).format(date);
  };

  const rain = ((selectedItem?.pop ?? 0) * 100);
  const wind = selectedItem?.wind_speed;
  const cloud = selectedItem?.clouds;

  let message = '';
  let alertLabel = '';
  let alertColor = '';

  const getRainDescription = (rain: number) => {
    if (rain < 10) return 'no expected rain';
    if (rain < 30) return `a slight ${rain}% chance of rain`;
    if (rain < 50) return `a moderate ${rain}% chance of rain`;
    if (rain < 80) return `a high ${rain}% chance of rain`;
    return `a very high ${rain}% chance of rain`;
  };

  const getWindDescription = (wind: number) => {
    if (wind < 10) return 'calm winds';
    if (wind < 15) return 'a light breeze';
    if (wind < 20) return 'moderate wind';
    return 'strong gusty winds';
  };

  const getCloudDescription = (cloud: number) => {
    if (cloud < 30) return 'mostly clear skies';
    if (cloud < 50) return 'partly cloudy skies';
    if (cloud < 70) return 'noticeable cloud cover';
    return 'overcast skies';
  };

  const rainDesc = getRainDescription(rain);
  const windDesc = getWindDescription(wind ?? 0);
  const cloudDesc = getCloudDescription(cloud ?? 0);

  if (rain < 10 && (wind ?? 0) < 10 && (cloud ?? 0) < 30) {
    alertLabel = 'Excellent';
    alertColor = '#22c55e';
    message = `The weather is perfect for drying fish on that day. Expect ${cloudDesc}, ${windDesc}, and ${rainDesc}. Ideal for quick and safe drying.`;
  } else if (rain < 30 && (wind ?? 0) < 15 && (cloud ?? 0) < 50) {
    alertLabel = 'Good';
    alertColor = '#3b82f6';
    message = `You can dry fish on that day with confidence. There will be ${cloudDesc} and ${windDesc}, with ${rainDesc}. Still, consider a backup cover just in case.`;
  } else if ((rain >= 30 && rain < 50) || ((cloud ?? 0) >= 50 && (cloud ?? 0) < 70) || ((wind ?? 0) >= 15 && (wind ?? 0) < 20)) {
    alertLabel = 'Caution';
    alertColor = '#eab308';
    message = `Drying fish is possible, but not guaranteed. ${cloudDesc} and ${windDesc} may affect drying speed. Plus, there's ${rainDesc}. Stay prepared to react.`;
  } else if ((rain >= 50 && rain < 80) || (wind ?? 0) >= 20 || (cloud ?? 0) >= 70) {
    alertLabel = 'Warning';
    alertColor = '#f97316';
    message = `It’s not advisable to dry fish on that day. Expect ${cloudDesc}, ${windDesc}, and ${rainDesc}. Your batch could be compromised quickly.`;
  } else {
    alertLabel = 'Danger';
    alertColor = '#ef4444';
    message = `Avoid drying fish on that day due to ${cloudDesc}, ${windDesc}, and ${rainDesc}. These conditions are highly unfavorable and risky.`;
  }


  return (
    <>
      <View style={{ 
        marginBottom: 10, 
        // borderTopWidth: 1, 
        // borderTopColor: '#d4d4d8', 
        paddingTop: 8 
        }} className="gap-3 bg-white">
        <Text className="text-lg px-5" style={{ fontFamily: 'PoppinsSemiBold' }}>
          Weather Forecast
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-3">
            {future_forecast.map((item, index) => (
              <Pressable key={index} onPress={() => handlePress(item)}>
                <View
                  style={{ 
                    borderRadius: 16, 
                    borderColor: '#d4d4d8', 
                    width: 75, 
                    height:120, 
                    padding: 8,
                    marginLeft: index === 0 ? 18 : 0, 
                    marginRight: index === future_forecast.length - 1 ? 18 : 0 }}
                  className={`p-1 border border-zinc-300 flex items-center w-20 h-32 ${
                    index === 0 ? 'ml-5' : ''
                  } ${index === future_forecast.length - 1 ? 'mr-5' : ''}`}
                >
                  <Text className="text-black text-xs">
                    {new Date(item.datetime).toLocaleDateString('en-US', {
                      weekday: 'long',
                    })}
                  </Text>
                  <Text
                    className="text-xs text-zinc-500"
                    style={{ fontFamily: 'PoppinsMedium' }}
                  >
                    {formatToPHT(item.datetime)}
                  </Text>
                  <WeatherIcon iconCode={item.icon} style={{ width: 35, height: 35, marginTop: 8 }} />
                  <Text style={{ fontFamily: 'PoppinsMedium' }} className="mt-3 text-base text-primary">
                    {Math.round(item.temperature ?? 0)}
                    <Text className="text-xs" style={{ fontFamily: 'PoppinsRegular' }}>
                      °C
                    </Text>
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>

      <BottomDrawer ref={drawerRef} onChange={(open) => setIsDrawerOpen(open)}>
        {selectedItem ? (
          <View style={{ alignItems: 'center', padding: 16, zIndex: 99999 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              {new Date(selectedItem.datetime).toLocaleDateString('en-US', { weekday: 'long' })}
            </Text>
            <Text style={{ color: '#6b7280' }}>{formatToPHT(selectedItem.datetime)}</Text>
            <WeatherIcon iconCode={selectedItem.icon} style={{ width: 50, height: 50, marginVertical: 12 }} />
            <View>
      <View className=" rounded-xl relative">
        <View style={{ gap: 5 }} className="flex-row justify-center items-center">
          <Text
            style={{
              fontFamily: 'PoppinsSemiBold',
              color: alertColor,
              fontSize: 16,
            }}
          >
            {alertLabel}
          </Text>
        </View>

        <Text
          style={{ fontFamily: 'PoppinsRegular' }}
          className="text-zinc-500 mt-2 text-center text-sm"
        >
          {message}
        </Text>
      </View>
    </View>
          </View>
        ) : (
          <Text>No selection</Text>
        )}
      </BottomDrawer>
    </>
  );
};

export default WeatherForecast;
