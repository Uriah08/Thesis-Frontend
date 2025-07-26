import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Dimensions, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SCREEN_WIDTH = Dimensions.get('window').width;

type SkeletonShimmerProps = {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
};

const SkeletonShimmer = ({
  width = '100%',
  height = 100,
  borderRadius = 8,
  style,
}: SkeletonShimmerProps) => {
  const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: SCREEN_WIDTH,
        duration: 1300,
        useNativeDriver: true,
      })
    ).start();
  }, [translateX]);

  return (
    <View style={[{ width: width as any, height: height as any, borderRadius, backgroundColor: '#f2f2f2', overflow: 'hidden' }, style]}>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.4)', 'transparent']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};

export default SkeletonShimmer;
