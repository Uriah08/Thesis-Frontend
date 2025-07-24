import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { X } from 'lucide-react-native'; // for close icon

type WeatherData = {
  pop?: number;
  wind_speed?: number;
  clouds?: number;
};

const WeatherAlert = ({ pop = 0, wind_speed = 0, clouds = 0 }: WeatherData) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const rain = pop * 100;
  const wind = wind_speed;
  const cloud = clouds;

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
  const windDesc = getWindDescription(wind);
  const cloudDesc = getCloudDescription(cloud);

  if (rain < 10 && wind < 10 && cloud < 30) {
    alertLabel = 'Excellent';
    alertColor = '#22c55e';
    message = `The weather is perfect for drying fish today. Expect ${cloudDesc}, ${windDesc}, and ${rainDesc}. Ideal for quick and safe drying.`;
  } else if (rain < 30 && wind < 15 && cloud < 50) {
    alertLabel = 'Good';
    alertColor = '#3b82f6';
    message = `You can dry fish today with confidence. There will be ${cloudDesc} and ${windDesc}, with ${rainDesc}. Still, consider a backup cover just in case.`;
  } else if ((rain >= 30 && rain < 50) || (cloud >= 50 && cloud < 70) || (wind >= 15 && wind < 20)) {
    alertLabel = 'Caution';
    alertColor = '#eab308';
    message = `Drying fish is possible, but not guaranteed. ${cloudDesc} and ${windDesc} may affect drying speed. Plus, there's ${rainDesc}. Stay prepared to react.`;
  } else if ((rain >= 50 && rain < 80) || wind >= 20 || cloud >= 70) {
    alertLabel = 'Warning';
    alertColor = '#f97316';
    message = `It’s not advisable to dry fish today. Expect ${cloudDesc}, ${windDesc}, and ${rainDesc}. Your batch could be compromised quickly.`;
  } else {
    alertLabel = 'Danger';
    alertColor = '#ef4444';
    message = `Avoid drying fish today due to ${cloudDesc}, ${windDesc}, and ${rainDesc}. These conditions are highly unfavorable and risky.`;
  }

  return (
    <View className="px-5 mt-5" style={{ zIndex: 0}}>
      <View className="border border-zinc-300 rounded-xl p-3 relative">
        {/* Close Button */}
        <Pressable
          onPress={() => setVisible(false)}
          style={{ position: 'absolute', top: 5, right: 5 }}
        >
          <X size={18} color="#6b7280" />
        </Pressable>

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
  );
};

export default WeatherAlert;
