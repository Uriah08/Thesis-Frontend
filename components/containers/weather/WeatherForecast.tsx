import { View, Text, ScrollView, Pressable } from 'react-native';
import React, { useRef, useState } from 'react';
import WeatherIcon from './WeatherIcon';
import BottomDrawer, { BottomDrawerRef } from '@/components/containers/BottomDrawer';

type ForecastItem = {
  datetime: string;
  description: string;
  icon: string;
  temperature: number;
  pop: number;
  wind_speed: number;
  clouds: number;
};

type FutureForecast = {
  future_forecast: ForecastItem[];
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

  return (
    <>
      <View className="mt-5 gap-3">
        <Text className="text-lg px-5" style={{ fontFamily: 'PoppinsSemiBold' }}>
          Weather Forecast
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-3">
            {future_forecast.map((item, index) => (
              <Pressable key={index} onPress={() => handlePress(item)}>
                <View
                  style={{ borderRadius: 16, borderColor: '#d4d4d8' }}
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
          <View style={{ alignItems: 'center', padding: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              {new Date(selectedItem.datetime).toLocaleDateString('en-US', { weekday: 'long' })}
            </Text>
            <Text style={{ color: '#6b7280' }}>{formatToPHT(selectedItem.datetime)}</Text>
            <WeatherIcon iconCode={selectedItem.icon} style={{ width: 50, height: 50, marginVertical: 12 }} />
            <Text style={{ fontSize: 16, marginBottom: 4 }}>{selectedItem.description}</Text>
            <Text>🌡 Temperature: {Math.round(selectedItem.temperature)}°C</Text>
            <Text>💧 Chance of Rain: {Math.round(selectedItem.pop * 100)}%</Text>
            <Text>☁️ Cloudiness: {selectedItem.clouds}%</Text>
            <Text>💨 Wind Speed: {selectedItem.wind_speed} m/s</Text>
          </View>
        ) : (
          <Text>No selection</Text>
        )}
      </BottomDrawer>
    </>
  );
};

export default WeatherForecast;
