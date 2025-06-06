import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Canvas, Circle } from '@shopify/react-native-skia';
import {
  useSharedValue,
  useDerivedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const centerX = width / 2;
const centerY = height / 2;

const electronOrbitRadius = 60;

const Helio = () => {
  const baseRotation = useSharedValue(0);

  useEffect(() => {
    baseRotation.value = withRepeat(
      withTiming(360, {
        duration: 4000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [baseRotation]);

  const angle1 = useDerivedValue(() => (baseRotation.value * Math.PI) / 180);

  const angle2 = useDerivedValue(() => (baseRotation.value * Math.PI) / 180 + Math.PI);

  const electron1X = useDerivedValue(() =>
    centerX + electronOrbitRadius * Math.cos(angle1.value)
  );
  const electron1Y = useDerivedValue(() =>
    centerY + electronOrbitRadius * Math.sin(angle1.value)
  );

  const electron2X = useDerivedValue(() =>
    centerX + electronOrbitRadius * Math.cos(angle2.value)
  );
  const electron2Y = useDerivedValue(() =>
    centerY + electronOrbitRadius * Math.sin(angle2.value)
  );

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        <Circle cx={centerX} cy={centerY} r={20} color="orange" />

        <Circle cx={electron1X} cy={electron1Y} r={5} color="cyan" />
        <Circle cx={electron2X} cy={electron2Y} r={5} color="cyan" />
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  canvas: {
    flex: 1,
  },
});

export default Helio;
